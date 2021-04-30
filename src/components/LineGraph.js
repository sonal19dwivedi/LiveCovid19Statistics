import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import '../styling/LineGraph.css';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const generateChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = generateChartData(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div className="line_graph">
    <h3>Daily change {casesType}</h3> <br/>
    <div className="graph">
      {data?.length > 0 && ( //check if data exists if it doesn't do nothing
        <Line
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: "#aecbfa",
                borderColor: "#4285f4",
              },
            ],
          }}
          options={options}
        />
      )}
      </div>
    </div>
  );
}

export default LineGraph;