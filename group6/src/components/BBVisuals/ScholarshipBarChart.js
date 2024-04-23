import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const MediaBarChart = () => {
  const ref = useRef();
  const [scholarships, setScholarships] = useState([]);
  const [awardAmountCounts, setAwardAmountCounts] = useState([]);

  useEffect(() => {
    const fetchScholarships = async () => {
        try {
            const response = await axios.get('https://api.brighterbeginnings.me/scholarships', {
            });
            console.log(response);
            const scholarships_data = response.data.Scholarships;
            // console.log(country_data.length)
            const awardCounts = {};
            scholarships_data.forEach(scholarship => {
                const award_amount = scholarship.award_amount;
                if (awardCounts[award_amount]) {
                    awardCounts[award_amount] += 1;
                } else {
                    awardCounts[award_amount] = 1;
                }
              });

              const awardsDataForChart = Object.keys(awardCounts).map(award_amount => ({
                award_amount: award_amount,
                count: awardCounts[award_amount] 
              }));
            //   console.log(regionDataForChart);
            setScholarships(scholarships_data);
            setAwardAmountCounts(awardsDataForChart);
        } catch (error) {
            console.error('Error fetching scholarship data:', error);
        }
    };

    fetchScholarships();

}, []);

  useEffect(() => {
    if (awardAmountCounts && awardAmountCounts.length > 0) {
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
        .domain([0, d3.max(awardAmountCounts, d => d.count)])
        .range([0, width]);
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end");

      // Create Y axis
      const y = d3.scaleBand()
        .range([0, height])
        .domain(awardAmountCounts.map(d => `Amount: $${d.award_amount}`))
        .padding(0.1);
        svg.append("g")
        .call(d3.axisLeft(y))
        


      // Create Bars
      svg.selectAll("myRect")
        .data(awardAmountCounts)
        .join("rect")
        .attr("x", x(0))
        .attr("y", d => y(`Amount: $${d.award_amount}`))
        .attr("width", d => x(d.count))
        .attr("height", y.bandwidth())
        .attr("fill", "#202c34");

        // Assuming this follows immediately after your bar creation code

        // Create or update text labels for the bars
        svg.selectAll("text.label")
        .data(awardAmountCounts) // Bind to the same data as the bars
        .join("text") // Enter + update
        .attr("class", "label") // Assign a class for potential styling via CSS
        .attr("x", d => {
            // Check if the bar is wide enough to fit the text inside
            const barWidth = x(d.count);
            const padding = 3; // Space inside the bar
            const textWidthEstimate = 13.5 * (`${d.award_amount}: ${d.count}%`.length); // Estimate text width
            return (barWidth > textWidthEstimate + padding) ? barWidth - textWidthEstimate : barWidth + padding;
        }) // Position slightly inside the right end of each bar
        .attr("y", d => y(`Amount: $${d.award_amount}`) + y.bandwidth() / 2) // Center vertically in each bar
        .attr("dy", "0.35em") // Slight vertical adjustment to align text better
        .style("text-anchor", "auto") // Start the text right at the specified 'x' position
        .style("fill", "white") // Choose a fill color that stands out; change as needed
        .style("font-size", "13px") // Set font size
        .text(d => {return d.count == 1 ? `${d.count} scholarship` : `${d.count} scholarships`}); // Set the text content

    
    }
  }, [awardAmountCounts]); // Redraw chart if data changes

  return (
    <svg ref={ref} />
  );
};

export default MediaBarChart;
