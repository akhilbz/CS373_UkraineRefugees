import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const CitiesHistogram = () => {
    const d3Container = useRef(null);
    const [cities, setCities] = useState([]);
    const [cityPopulationCounts, setCityPopulationCounts] = useState([]);


    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('https://api.brighterbeginnings.me/cities', {
                });

                const cities_data = response.data.Cities;
                
                // Find min and max ratings to determine range
                var min_population = 1000000;
                var max_population = 0;
                cities_data.forEach((city) => {
                    let population = city.population;
                    if (population < min_population) min_population = population;
                    if (population > max_population) max_population = population;
                });

                min_population = Math.floor(min_population / 100000) * 100000; // rounding down to nearest multiple of 100000 for range
                max_population = Math.floor(max_population / 100000) * 100000; // rounding down to nearest multiple of 100000 for range
                console.log(`${min_population} -\n${max_population}`);

                // Get counts of support groups in a range of ratings
                const cityPopulationCounts = {};
                for (var i = min_population; i <= max_population; i += 100000) {
                    const range_end = i + 90000;
                    cities_data.forEach((city) => {
                        let population = city.population;
                        if (population >= i && population <= range_end) {
                            var range = `${i / 1000}K - ${range_end / 1000}K`;
                            console.log(range);
                            if (cityPopulationCounts[range]) {
                                cityPopulationCounts[range] += 1;
                            } else {
                                cityPopulationCounts[range] = 1;
                            }
                        }
                    });
                }

                // generate object of ranges and their corresponding count values.
                const cityPopulationDataForChart = Object.keys(cityPopulationCounts).map(city => ({
                    range: city,
                    count: cityPopulationCounts[city]
                  }));
                console.log(cityPopulationDataForChart);
                setCities(response.data.Cities);
                setCityPopulationCounts(cityPopulationDataForChart);
            } catch (error) {
                console.error('Error fetching city data:', error);
            }
        };

        fetchCities();
    }, []);

    useEffect(() => {
        if (cityPopulationCounts && d3Container.current) {
          const margin = { top: 10, right: 30, bottom: 30, left: 100 }; // Adjust left margin to fit labels
          const width = 600 - margin.left - margin.right;
          const height = 400 - margin.top - margin.bottom;
      
          // Clear the previous histogram
          d3.select(d3Container.current).selectAll('*').remove();
      
          const svg = d3.select(d3Container.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
      
          // X axis: scale and draw
          const x = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(cityPopulationCounts, d => d.count)]);
          svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));
      
          // Y axis: scale and draw
          const y = d3.scaleBand()
            .range([height, 0])
            .domain(cityPopulationCounts.map(d => d.range))
            .padding(0.1);
          svg.append('g')
            .call(d3.axisLeft(y));
      
          // Bars
          svg.selectAll('mybar')
            .data(cityPopulationCounts)
            .enter()
            .append('rect')
            .attr('y', d => y(d.range))
            .attr('x', 0)
            .attr('height', y.bandwidth())
            .attr('width', d => x(d.count))
            .attr('fill', '#202c34');

             // Create or update text labels for the bars
            svg.selectAll("text.label")
            .data(cityPopulationCounts) // Bind to the same data as the bars
            .join("text") // Enter + update
            .attr("class", "label") // Assign a class for potential styling via CSS
            .attr("x", d => {
                // Check if the bar is wide enough to fit the text inside
                const barWidth = x(d.count);
                const padding = 3; // Space inside the bar
                const textWidthEstimate = 13.5 * (`${d.range}: ${d.count}%`.length); // Estimate text width
                return (barWidth > textWidthEstimate + padding) ? barWidth - textWidthEstimate : barWidth + padding;
            }) // Position slightly inside the right end of each bar
            .attr("y", d => y(d.range) + y.bandwidth() / 2) // Center vertically in each bar
            .attr("dy", "0.35em") // Slight vertical adjustment to align text better
            .style("text-anchor", "auto") // Start the text right at the specified 'x' position
            .style("fill", "white") // Choose a fill color that stands out; change as needed
            .style("font-size", "13px") // Set font size
            .text(d => {return d.count == 1 ? `${d.count} city` : `${d.count} cities`}); // Set the text content
        }
      }, [cityPopulationCounts]); // Redraw the histogram every time the data changes
      

    return (
        <div ref={d3Container} />
    );
};

export default CitiesHistogram;
