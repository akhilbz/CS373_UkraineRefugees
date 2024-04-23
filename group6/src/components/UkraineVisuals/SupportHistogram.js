import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const SupportHistogram = () => {
    const d3Container = useRef(null);
    const [supportGroups, setSupportGroups] = useState([]);
    const [supportGroupsCounts, setSupportGroupsCounts] = useState([]);
    const [sortOption, setSortOption] = useState('default');
    const [orderBy, setOrderBy] = useState('default');
    const [selectedRating, setSelectedRating] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);

    const ratingData = [
        { ratingRange: '1.0-1.5', count: 3 },
        { ratingRange: '1.5-2.0', count: 7 },
      ];

    useEffect(() => {
        const fetchSupportGroups = async () => {
            try {
                const response = await axios.get('https://cs373-backend.ukrainecrisis.me/api/support-groups', {
                    params: {
                        sort_by: sortOption,
                        order: orderBy,
                        location: selectedLocation.join(';'),
                        ratings: selectedRating.join(',')
                    }
                });

                const support_groups_data = response.data;
                
                // Find min and max ratings to determine range
                var min_rating = 100;
                var max_rating = 0;
                support_groups_data.forEach((supportGroup) => {
                    let rating = supportGroup.rating;
                    if (rating < min_rating) min_rating = rating;
                    if (rating > max_rating) max_rating = rating;
                });

                min_rating = Math.floor(min_rating / 10) * 10 + 1; // rounding down to nearest multiple of 10 for range
                max_rating = Math.floor(max_rating / 10) * 10 + 1; // rounding down to nearest multiple of 10 for range
                console.log(`${min_rating} - ${max_rating}`);

                // Get counts of support groups in a range of ratings
                const supportGroupCounts = {};
                for (var i = min_rating; i <= max_rating; i += 10) {
                    const range_end = i + 9;
                    support_groups_data.forEach((supportGroup) => {
                        let rating = supportGroup.rating;
                        if (rating >= i && rating <= range_end) {
                            var range = `${i} - ${range_end}`;
                            if (supportGroupCounts[range]) {
                                supportGroupCounts[range] += 1;
                            } else {
                                supportGroupCounts[range] = 1;
                            }
                        }
                    });
                }

                // generate object of ranges and their corresponding count values.
                const supportGroupsDataForChart = Object.keys(supportGroupCounts).map(supportGroup => ({
                    range: supportGroup,
                    count: supportGroupCounts[supportGroup]
                  }));
                console.log(supportGroupsDataForChart);
                setSupportGroups(response.data);
                setSupportGroupsCounts(supportGroupsDataForChart);
            } catch (error) {
                console.error('Error fetching support group data:', error);
            }
        };

        fetchSupportGroups();
    }, [sortOption, orderBy, selectedLocation, selectedRating ]);

    useEffect(() => {
        if (supportGroupsCounts && d3Container.current) {
        const margin = { top: 10, right: 30, bottom: 30, left: 40 };
        const width = 460 - margin.left - margin.right;
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
        const x = d3.scaleBand()
            .range([0, width])
            .domain(supportGroupsCounts.map(d => d.range))
            .padding(0.1);
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // Y axis: scale and draw
        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(supportGroupsCounts, d => d.count)]);
        svg.append('g')
            .call(d3.axisLeft(y));

        // Bars
        svg.selectAll('mybar')
            .data(supportGroupsCounts)
            .enter()
            .append('rect')
            .attr('x', d => x(d.range))
            .attr('y', d => y(d.count))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d.count))
            .attr('fill', '#202c34');
        }
    }, [supportGroupsCounts]); // Redraw the histogram every time the data changes

    return (
        <div ref={d3Container} />
    );
};

export default SupportHistogram;
