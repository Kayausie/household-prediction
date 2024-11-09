import React from 'react';
import Plot from 'react-plotly.js';

const ScatterPlot = ({ data }) => {

  const plotData = [
    {
      x: data.squareFootages,   
      y: data.predictions,   
      mode: 'markers',  
      type: 'scatter',
      marker: { size: 8 },
    },
  ];

  const layout = {
    title: 'Scatter Plot - Land Size vs Predicted Price',
    xaxis: { title: 'Land Size (m²)' },
    yaxis: { title: 'Predicted Price ($)' },
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <Plot
        data={plotData}
        layout={layout}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
};

export default ScatterPlot;
