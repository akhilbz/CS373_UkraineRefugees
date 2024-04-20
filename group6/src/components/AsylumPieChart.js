import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const AsylumPieChart = () => {
    const ref = useRef(null);
    const [asylumCountries, setAsylumCountries] = useState([]);
    const [asylumRegionCounts, setAsylumRegionCounts] = useState([]);
    const [sortOption, setSortOption] = useState('default');
    const [orderBy, setOrderBy] = useState('default');
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    useEffect(() => {
        const fetchAsylumCountries = async () => {
            try {
                // setLoading(true);
                const response = await axios.get('https://cs373-backend.ukrainecrisis.me/api/asylum-countries', {
                    params: {
                        sort_by: sortOption,
                        order: orderBy,
                        languages: selectedLanguages.join(','),
                        regions: selectedRegions.join(',')
                    }
                });
                
                const country_data = response.data;
                // console.log(country_data.length)
                const regionCounts = {};
                country_data.forEach(country => {
                    const region = country.region;
                    if (regionCounts[region]) {
                      regionCounts[region] += 1;
                    } else {
                      regionCounts[region] = 1;
                    }
                  });

                  const regionDataForChart = Object.keys(regionCounts).map(region => ({
                    region: region,
                    count: regionCounts[region] / country_data.length * 100
                  }));
                //   console.log(regionDataForChart);
                  setAsylumCountries(country_data);
                  setAsylumRegionCounts(regionDataForChart);
                // setLoading(false);
            } catch (error) {
                console.error('Error fetching asylum countries data:', error);
                // setLoading(false);
            }
        };

        fetchAsylumCountries();

    }, [sortOption, orderBy, selectedLanguages, selectedRegions]);



    useEffect(() => {  
        // Clear SVG before redrawing, in case data changes
        d3.select(ref.current).selectAll("*").remove();

        // Setup SVG and group element
        const svg = d3.select(ref.current)
        .attr('width', 450)
        .attr('height', 450)
        .append('g')
        .attr('transform', 'translate(225, 225)'); // Center the pie chart

        // Create a color scale
        const colorScale = d3.scaleOrdinal()
        .domain(asylumRegionCounts.map(d => d.region))
        .range(d3.schemeCategory10);

        // Create the pie generator function and specify value accessor
        const pie = d3.pie()
        .value(d => d.count)(asylumRegionCounts);

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
        .attr('fill', d => colorScale(d.data.region));

        // Optional: Add labels to the pie pieces
        const text = d3.arc()
        .outerRadius(225)
        .innerRadius(100);

        svg.selectAll('text')
        .data(pie)
        .enter()
        .append('text')
        .attr('transform', d => `translate(${text.centroid(d)})`)
        .attr('dy', '0.35em')
        .style('text-anchor', 'middle')
        .style('font-size', 14)
        .style('fill', 'white')
        .text(d => `${d.data.region} ${d.data.count}%`);
    }, [asylumRegionCounts]);

    return <svg ref={ref}></svg>;
    };

export default AsylumPieChart;
