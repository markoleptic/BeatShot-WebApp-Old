import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { DateTime } from "luxon";

//import { draw, generate } from "patternomaly";
import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TimeScale,
  TimeSeriesScale,
  Legend,
  Filler,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = (props, canvas) => {
  var chartRef = useRef();
  var [gradient, setGradient] = useState();

  const { title, xAxisTitle, yAxisTitle, category } =
    props.myOptions;

  const labels = props.labels.map((element) =>
    DateTime.fromISO(element.substring(0, 23), { zone: "utc" })
  );

  let chartData = [];

  for (let datapoint in props.data) {
    chartData.push({ label: labels[datapoint], data: props.data[datapoint] });
  }
  const data = {
    labels: labels,
    datasets: [
      {
        labels: labels,
        data: props.data,
        borderColor: "white",
        backgroundColor: gradient,
        //generate(["#3dc5ebB3"]),
        fill: "origin",
        pointStyle: "circle",
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: "#fff",
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;
    //console.log(props.labels);
    if (chart) {
      console.log(chart.scales);
      //chart.ctx.rect(0, 0, 0, chart.canvas.height);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.canvas.height);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
      gradient.addColorStop(0, "hsl(193, 81%, 58%, 0.8)");
      chart.ctxfillStyle = gradient;
      chart.ctx.fill();
      setGradient(gradient);
      console.log("CanvasRenderingContext2D", chart.ctx);
      console.log("HTMLCanvasElement", chart.canvas.height);

    }
  }, [chartRef]);

  const options = {
    tension: 0.3,
    layout: {
      padding: {
        right: category === "score" ? 0: 0,
        bottom: 0,
        left:0,
        top:0,
      }
    },
    maintainAspectRatio: true,
    font: {
      size: 12,
      family: "Montserrat",
      weight: "bold",
      color: "white",
    },
    plugins: {
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: true,
      title: {
        display: true,
        align: 'center',
        text: title,
        color: "white",
        font: {
          size: 20,
          family: "Montserrat",
          weight: 800,
          color: "hsl(193, 81%, 58%)",
        },
      },
      tooltip: {
        padding: "8",
        displayColors: false,
        titleFont: {
          weight: "bold",
          family: "Montserrat",
          size: "14",
        },
        bodyFont: {
          weight: 800,
          family: "Montserrat",
          size: "14",
        },
        callbacks: {
          label: function (tooltipItem) {
            if (category === "score") {
              return (tooltipItem.raw.toFixed(1));
            } else if (category === "avgTimeOffset") {
              console.log(tooltipItem.raw * 1000)
              return (tooltipItem.raw * 1000 + "ms");
            } else if (category === "accuracy" || category === "completion") {
              return (tooltipItem.raw * 100).toFixed(2) + "%";
            }
          },
          labelTextColor: function () {
            return "hsl(193, 81%, 58%)";
          },
        },
      },
    },
    scales: {
      x: {
        type: "timeseries",
        offset: true,
        //bounds: 'ticks',
        //source: 'auto',
        //grace: 0,
        time: {
          unit: 'day'
        },
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          beginAtZero: true,
          color: "hsl(227, 15%, 70%,0.4)",
        },
        ticks: {
          //major : {
          //  enabled: true,
          //},
          callback: function (value) {
            return value;
          },
          autoSkip: true,
          maxTicksLimit: 20,
          source: "data",
          color: "white",
          font: {
            size: 10,
            weight: "100",
            family: "Montserrat",
          },
        },
        title: {
          color: "white",
          font: {
            size: 16,
            family: "Montserrat",
            weight: 1000,
            color: "white",
          },
          display: true,
          position: 'bottom',
          align: 'center',
          text: xAxisTitle,
          lineWidth: 1,
        },
      },
      y: {
        offset: true,
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: false,
          beginAtZero: false,
          color: "hsl(227, 15%, 70%,0.4)",
        },
        ticks: {
          callback: function (value) {
            if (category === "accuracy" || category === "completion") {
              return this.getLabelForValue(value * 100) + " %";
            } else if (category === "score") {
              return this.getLabelForValue(value/ 1000);
            } else if (category === "avgTimeOffset") {
              return this.getLabelForValue(value*1000);
            }
          },
          color: "white",
          font: {
            family: "Montserrat",
            size: 10,
            weight: "100",
            color: "white",
          },
        },
        title: {
          color: "white",
          font: {
            size: 16,
            family: "Montserrat",
            weight: 1000,
            color: "white",
          },
          alight: 'center',
          display: true,
          text: yAxisTitle,
        },
      },
      // percentage: {
      //   display: bDisplayPercentage,
      //   beginatZero: true,
      //   position: "right",
      //   title: {
      //     color: "white",
      //     font: {
      //       size: 16,
      //       family: "Montserrat",
      //       weight: 1000,
      //       color: "white",
      //     },
      //     display: false,
      //     text: "%",
      //   },
      //   ticks: {
      //     callback: function (value) {
      //       return this.getLabelForValue(value * 100) + "%";
      //     },
      //     color: "white",
      //     font: {
      //       family: "Montserrat",
      //       size: 10,
      //       weight: "100",
      //       color: "white",
      //     },
      //   },
      // },
    },
  };

  return (
    <>
      <div className="chart">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;