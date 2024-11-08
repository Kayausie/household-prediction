import React from 'react';
import Plot from 'react-plotly.js';

const BoxPlot = ({ data }) => {
    const { predictions } = data;

    const plotData = [{
        type: 'box',
        y: predictions,
        boxpoints: 'outliers',
        jitter: 0.5,
        pointpos: 0,
        name: 'Prediction',
        marker: {
            color: '#032B5D',
        },
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
