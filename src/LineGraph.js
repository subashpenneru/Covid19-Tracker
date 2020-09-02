import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

import axios from './axios';
import { casesTypeColors } from './util';

const options = {
  legend: {
    display: true,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: true,
  responsive: true,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

const LineGraph = ({ country, casesType }) => {
  const [data, setData] = useState({
    labels: [],
    values: [],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    const fetchData = async () => {
      let url = 'historical/all?lastdays=120';

      if (country !== 'worldwide') {
        url = `historical/${country}?lastdays=120`;
      }

      try {
        const res = await axios.get(url);

        const chartData = buildChartData(
          res.data.timeline || res.data,
          casesType
        );

        setData({
          labels: chartData.map((ele) => ele.x),
          values: chartData.map((ele) => ele.y),
        });
      } catch (err) {
        console.error(err.message);
        setError("Country doesn't have any historical data");
      }
    };

    fetchData();
  }, [casesType, country]);

  const buildChartData = (data, casesType = 'cases') => {
    const chartData = [];
    let lastDataPoint;

    Object.keys(data[casesType]).forEach((date) => {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    });

    return chartData;
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {error && <p style={{ marginTop: '20px' }}>{error}</p>}
      {!error && data && (
        <Line
          options={options}
          data={{
            labels: data.labels,
            datasets: [
              {
                label: `${casesType}`,
                backgroundColor: `${casesTypeColors[casesType].half_op}`,
                borderColor: `${casesTypeColors[casesType].hex}`,
                data: data.values,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default LineGraph;
