import { Bar } from "react-chartjs-2";
import "chartjs-adapter-luxon";

//import { draw, generate } from "patternomaly";
import React, { useRef, useEffect, useState } from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const BarChart = (props, canvas) => {
  var chartRef = useRef();
  var [gradient, setGradient] = useState();

  const { title, xAxisTitle, yAxisTitle, category } =
    props.myOptions;

  const data = {
    labels: props.labels,
    datasets: [
      {
        labels: props.labels,
        data: props.data,
        borderColor: "white",
        backgroundColor: "hsl(193, 81%, 58%, 0.8)",
        //generate(["#3dc5ebB3"]),
        fill: "origin",
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;
    //console.log(props.labels);
    if (chart) {
      //console.log(chart.scales);
      //chart.ctx.rect(0, 0, 0, chart.canvas.height);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.canvas.height);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
      gradient.addColorStop(0, "hsl(193, 81%, 58%, 0.8)");
      chart.ctxfillStyle = gradient;
      chart.ctx.fill();
      setGradient(gradient);
      //console.log("CanvasRenderingContext2D", chart.ctx);
      //console.log("HTMLCanvasElement", chart.canvas.height);

    }
  }, [chartRef]);

  const options = {
    type: 'bar',
    layout: {
      padding: {
        right: category === "score" ? 0: 0,
        bottom: 0,
        left:0,
        top:0,
      }
    },
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
            if (category === "timePlayed") {
              return (Math.round(tooltipItem.raw / 60 / 60 * 100) / 100) + " hours";
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
        //offset: true,
        //bounds: 'ticks',
        //source: 'auto',
        //grace: 0,
        //time: {
        //  unit: 'day'
        //},
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
          //callback: function (value) {
          //  return value;
          //},
          //autoSkip: true,
          //maxTicksLimit: 20,
          //source: "data",
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
            weight: 500,
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
            if (category === "timePlayed") {
              return (Math.round(value / 60 / 60 * 10) / 10);
            } else return this.value;
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
            weight: 500,
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
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </>
  );
};

export default BarChart;
