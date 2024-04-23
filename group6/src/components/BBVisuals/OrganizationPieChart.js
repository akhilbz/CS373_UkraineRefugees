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
      // Clear SVG before redrawing, in case data changes
      d3.select(ref.current).selectAll("*").remove();

      // Setup SVG and group element
      const svg = d3.select(ref.current)
      .attr('width', 600)
      .attr('height', 600)
      .append('g')
      .attr('transform', 'translate(300, 300)'); // Center the pie chart

      // Create a color scale
      const colorScale = d3.scaleOrdinal()
      .domain(organizationTypeCounts.map(d => d.type))
      .range(d3.schemeCategory10);

      // Create the pie generator function and specify value accessor
      const pie = d3.pie()
      .value(d => d.count)(organizationTypeCounts);

      // Define the arc generator
      const arc = d3.arc()
      .innerRadius(0) // This would be greater than 0 for a donut chart
      .outerRadius(225); // Size of the pie chart

      // Append arcs to the SVG group
      svg.selectAll('path')
      .data(pie)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => colorScale(d.data.type));

      const text = d3.arc()
      .outerRadius(300)
      .innerRadius(250);
  
  svg.selectAll('text')
      .data(pie)
      .enter()
      .append('text')
      .attr('transform', d => `translate(${text.centroid(d)})`)
      .attr('dy', '-0.35em') // Adjust this for better vertical alignment
      .style('text-anchor', 'middle') // Change to 'middle' for centered alignment
      .style('font-size', 14)
      .style('fill', 'white')
      .each(function(d) { // Use the function to append multiple tspan elements
          const el = d3.select(this);
          el.append('tspan')
            .attr('x', 5) // Align horizontally
            .attr('dy', '1.5em') // Offset for the first line
            .text(d.data.type.charAt(0));
          el.append('tspan')
            .attr('x', 5) // Align horizontally
            .attr('dy', '1.5em') // Offset for the second line
            .text(`${d.data.count}%`);
      });
  
  }, [organizationTypeCounts]);

  return (<div className='flex-col'>
      <svg ref={ref}></svg>
      <div className="flex justify-center">
        <div className='flex-col flex justify-center bg-white w-full rounded-xl'>
          <h1 className='text-black font-bold underline flex justify-center'>LEGEND</h1>
          {organizationTypeCounts.map(organization => {return (
              <div className='flex justify-center mx-2 '>
                <h1 className='font-bold text-black'>{`${organization.type.charAt(0)} - ${organization.type} : ${organization.count}%`}</h1>
              </div>
          );})}
        </div>
      </div>
  </div>);
  };


export default OrganizationPieChart;
