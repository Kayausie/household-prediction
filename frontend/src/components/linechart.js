import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { Button } from '@mui/material';

const LineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return; // Wait until data is available

    const { squareFootages, predictions, predictedprice, distances } = data;

    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear existing content in SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // Create the main SVG canvas
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    // Create a 'g' group element for applying transformations
    const mainGroup = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define scales
    const x = d3.scaleLinear()
      .domain(d3.extent(squareFootages))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(predictions)])
      .range([height, 0]);

    // Define and add the axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).tickFormat(d3.format(","));

    // Append x and y axes groups
    const xAxisGroup = mainGroup.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    const yAxisGroup = mainGroup.append('g')
      .call(yAxis);

    // Define line generator
    const line = d3.line()
      .x((d, i) => x(squareFootages[i]))
      .y(d => y(d));

    // Draw the line path
    const linePath = mainGroup.append('path')
      .datum(predictions)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Add the user's predicted point
    const userPoint = mainGroup.append('circle')
      .attr('cx', x(distances))
      .attr('cy', y(predictedprice))
      .attr('r', 6)
      .attr('fill', 'red')
      .attr('stroke', 'black')
      .attr('stroke-width', 1);

    // Add label for the user prediction point
    const userPointLabel = mainGroup.append('text')
      .attr('x', x(distances))
      .attr('y', y(predictedprice) - 8)
      .attr('fill', 'white')
      .text(`User Prediction: $${predictedprice.toFixed(2)}`);

    // Zoom functionality
    const zoom = d3.zoom()
      .scaleExtent([1, 5]) // Min and max zoom scale
      .translateExtent([[0, 0], [width, height]]) // Limit panning
      .on('zoom', (event) => {
        const transform = event.transform;
        const newX = transform.rescaleX(x);
        const newY = transform.rescaleY(y);

        // Update axes with the transformed scales
        xAxisGroup.call(d3.axisBottom(newX));
        yAxisGroup.call(d3.axisLeft(newY));

        // Update the line path with the transformed scales
        linePath.attr('d', d3.line()
          .x((d, i) => newX(squareFootages[i]))
          .y(d => newY(d))
        );

        // Update user point position
        userPoint
          .attr('cx', newX(distances))
          .attr('cy', newY(predictedprice));

        // Update user point label position
        userPointLabel
          .attr('x', newX(distances))
          .attr('y', newY(predictedprice) - 8);
      });

    // Apply zoom to the parent group (mainGroup)
    svg.call(zoom);
  }, [data]);

  // Export function to convert SVG to PNG image
  const exportToImage = () => {
    const svgElement = svgRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const image = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      const imgUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imgUrl;
      link.download = "chart.png";
      link.click();
    };

    image.src = url;
  };

  return (
    <div>
      <svg ref={svgRef}></svg>
      <Button sx={{
                  backgroundColor: '#043873',
                  color: 'white',
                  '&:hover': { backgroundColor: 'white', color: '#043873' },
                }} onClick={exportToImage} variant="contained">Download Chart as Image</Button>
    </div>
  );
};

export default LineChart;
