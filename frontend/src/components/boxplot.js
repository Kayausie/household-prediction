import React from 'react';
import Plot from 'react-plotly.js';

const BoxPlot = ({ data }) => {
    const { predictions } = data;

    const plotData = [{
        type: 'box',
        name: 'Prediction',
        marker: {
          color: 'rgb(8,81,156)',
      },
        boxpoints: 'outliers',
        y: predictions,
        jitter: 0.5,
        pointpos: 0,
    }];

    const layout = {
        title: 'Distribution - Prices',
        yaxis: {
          title: 'Predicted Prices',
        },
        boxmode: 'group',
      };
    
      return (
        <Plot
          data={plotData}
          layout={layout}
          style={{ width: '100%', height: '100%' }}
        />
      );
    };
    
export default BoxPlot;
