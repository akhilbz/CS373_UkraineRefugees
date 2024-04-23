import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const OrganizationPieChart = () => {
    const ref = useRef(null);
    const [organizations, setOrganizations] = useState([]);
    const [organizationTypeCounts, setOrganizationTypeCounts] = useState([]);
    const [sortOption, setSortOption] = useState('default');
    const [orderBy, setOrderBy] = useState('default');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                // setLoading(true);
                const response = await axios.get('https://api.brighterbeginnings.me/organizations', {
                    // params: {
                    //     sort_by: sortOption,
                    //     order: orderBy,
                    //     organization_type: selectedTypes.join(',')
                    // }
                });
                
                const organizations_data = response.data.Organizations;
                console.log(organizations_data)

                const typeCounts = {};
                organizations_data.forEach(organization => {
                    const type = organization.organization_type;
                    if (typeCounts[type]) {
                        typeCounts[type] += 1;
                    } else {
                        typeCounts[type] = 1;
                    }
                  });
                
                  const typeDataForChart = Object.keys(typeCounts).map(type => ({
                    type: type,
                    count: Math.floor(typeCounts[type] / organizations_data.length * 100)
                  }));
                  console.log(typeDataForChart);
                setOrganizations(organizations_data);
                setOrganizationTypeCounts(typeDataForChart);
                // setLoading(false);
            } catch (error) {
                console.error('Error fetching organization data:', error);
                // setLoading(false);
            }
        };

        fetchOrganizations();

    }, []);



    useEffect(() => {
        if (organizationTypeCounts && organizationTypeCounts.length > 0) {
          console.log("Here");
          // Clear SVG before redrawing
          d3.select(ref.current).selectAll("*").remove();
      
          // Set dimensions and margins for the graph
          const margin = { top: 25, right: 20, bottom: 30, left: 40 };
          const width = 650 - margin.left - margin.right;
          const height = 500 - margin.top - margin.bottom;
      
          // Append SVG object to the ref element
          const svg = d3.select(ref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
      
          // Create X axis
          const x = d3.scaleBand()
            .range([0, width])
            .domain(organizationTypeCounts.map(d => d.type))
            .padding(0.1);
          svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));
      
          // Create Y axis
          const y = d3.scaleLinear()
            .domain([0, d3.max(organizationTypeCounts, d => d.count)])
            .range([height, 0]);
          svg.append("g")
            .call(d3.axisLeft(y));
      
          // Create Bars
          svg.selectAll("myRect")
            .data(organizationTypeCounts)
            .join("rect")
            .attr("x", d => x(d.type))
            .attr("y", d => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.count))
            .attr("fill", "#E6C300");
      
          // Create or update text labels for the bars
          svg.selectAll("text.label")
            .data(organizationTypeCounts) // Bind to the same data as the bars
            .join("text") // Enter + update
            .attr("class", "label") // Assign a class for potential styling via CSS
            .attr("x", d => x(d.type) + x.bandwidth() / 2) // Center text within each bar
            .attr("y", d => y(d.count) - 5) // Position above the top of each bar
            .attr("dy", "0.35em") // Slight vertical adjustment to align text better
            .style("text-anchor", "middle") // Center the text horizontally
            .style("fill", "white") // Choose a fill color that stands out; change as needed
            .style("font-size", "10px") // Set font size
            .text(d => `${d.count}%`); // Set the text content
      
        }
      }, [organizationTypeCounts]); // Redraw chart if data changes
      

    return <svg ref={ref}></svg>;
    };

export default OrganizationPieChart;
