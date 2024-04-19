import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const MediaBarChart = () => {
  const ref = useRef();
  const [newsMedia, setNewsMedia] = useState([]);
  const [newsSourceCounts, setNewsSourceCounts] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const [orderBy, setOrderBy] = useState('default');
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/news', {
                params: {
                    sort_by: sortOption,
                    order: orderBy,
                    sources: selectedSources.join(','), 
                    authors: selectedAuthors.join(',')
                }
            });
            
            const news_data = response.data;
            // console.log(country_data.length)
            const sourceCounts = {};
            news_data.forEach(article => {
                const source = article.name;
                if (sourceCounts[source]) {
                    sourceCounts[source] += 1;
                } else {
                    sourceCounts[source] = 1;
                }
              });

              const sourceDataForChart = Object.keys(sourceCounts).map(source => ({
                source: source,
                count: sourceCounts[source] 
              }));
            //   console.log(regionDataForChart);
            setNewsMedia(news_data);
            setNewsSourceCounts(sourceDataForChart);
        } catch (error) {
            console.error('Error fetching news data:', error);
        }
    };

    fetchNews();

}, [sortOption, orderBy, selectedSources, selectedAuthors]);

  useEffect(() => {
    console.log(newsSourceCounts);
    if (newsSourceCounts && newsSourceCounts.length > 0) {
        console.log("Here");
      // Clear SVG before redrawing
      d3.select(ref.current).selectAll("*").remove();

      // Set dimensions and margins for the graph
      const margin = { top: 25, right: 20, bottom: 20, left: 130 };
      const width = 750 - margin.left - margin.right;
      const height = 800 - margin.top - margin.bottom;

      // Append SVG object to the ref element
      const svg = d3.select(ref.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Create X axis
      const x = d3.scaleLinear()
        .domain([0, d3.max(newsSourceCounts, d => d.count)])
        .range([0, width]);
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end");

      // Create Y axis
      const y = d3.scaleBand()
        .range([0, height])
        .domain(newsSourceCounts.map(d => d.source))
        .padding(0.1);
        svg.append("g")
        .call(d3.axisLeft(y))
        


      // Create Bars
      svg.selectAll("myRect")
        .data(newsSourceCounts)
        .join("rect")
        .attr("x", x(0))
        .attr("y", d => y(d.source))
        .attr("width", d => x(d.count))
        .attr("height", y.bandwidth())
        .attr("fill", "#E6C300");

        // Assuming this follows immediately after your bar creation code

        // Create or update text labels for the bars
        svg.selectAll("text.label")
        .data(newsSourceCounts) // Bind to the same data as the bars
        .join("text") // Enter + update
        .attr("class", "label") // Assign a class for potential styling via CSS
        .attr("x", d => {
            // Check if the bar is wide enough to fit the text inside
            const barWidth = x(d.count);
            const padding = 3; // Space inside the bar
            const textWidthEstimate = 8 * (`${d.source}: ${d.count}%`.length); // Estimate text width
            return (barWidth > textWidthEstimate + padding) ? barWidth - textWidthEstimate : barWidth + padding;
        }) // Position slightly inside the right end of each bar
        .attr("y", d => y(d.source) + y.bandwidth() / 2) // Center vertically in each bar
        .attr("dy", "0.35em") // Slight vertical adjustment to align text better
        .style("text-anchor", "auto") // Start the text right at the specified 'x' position
        .style("fill", "white") // Choose a fill color that stands out; change as needed
        .style("font-size", "13px") // Set font size
        .text(d => `${d.count}%`); // Set the text content

    
    }
  }, [newsSourceCounts]); // Redraw chart if data changes

  return (
    <svg ref={ref} />
  );
};

export default MediaBarChart;
