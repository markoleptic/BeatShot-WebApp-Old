import { Line } from "react-chartjs-2";
import { draw, generate } from "patternomaly";
import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = (props, canvas) => {
  var chartRef = useRef();
  var [gradient, SetGradient] = useState();

  // const labels = [
  //   "2022-1-23", 
  //   "2022-1-23",
  //   "2022-1-24",
  //   "2022-1-25",
  //   "2022-1-26",
  //   "2022-1-27",
  //   "2022-1-28",
  //   "2022-2-01",
  //   "2022-2-08",
  //   "2022-2-16",
  // ]

  // const data2 = [
  //   60000,
  //   50000,
  //   60000,
  //   80000, 
  //   40000,
  //   75000,
  //   40000, 
  //   70000,
  //   81000,
  //   82000
  // ]

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "",
        data: props.data,
        borderColor: "white",
        backgroundColor: gradient,
        //generate(["#3dc5ebB3"]),
        fill: "origin",
        pointStyle: "circle",
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: "#fff"
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;
    console.log(props.labels);
    if (chart) {
      //chart.ctx.rect(0, 0, 0, chart.canvas.height);
      gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.canvas.height);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
      gradient.addColorStop(0, "hsl(193, 81%, 58%, 0.8)");
      chart.ctxfillStyle = gradient;
      chart.ctx.fill();
      SetGradient(gradient);
      console.log("CanvasRenderingContext2D", chart.ctx);
      console.log("HTMLCanvasElement", chart.canvas.height);
    }
  }, [chartRef]);

  const options = {
    tension: 0.3,
    maintainAspectRatio: true,
    font: {
      size: 12,
      family: "Montserrat",
      weight: "bold",
      color: "white",
    },
    plugins: {
      legend: {
        display:false
      },
      responsive: true,
      maintainAspectRatio: true,
      title: {
        display: true,
        text: props.title,
        color: "white",
        font: {
          size: 20,
          family: "Montserrat",
          weight: 1000,
          color: "white",
        },
      },
      tooltip: {
        mode: "point",
        backgroundColor: "#3dc5eb",
        bodyColor: "white",
        bodyFont: {
          weight: 500,
          family: "Montserrat",
          color: "white",
        },
        borderColor: "black",
        borderWidth: 1,
        cornerRadius: 0,
        padding: {
          top: 4,
          bottom: 4,
          left: 8,
          right: 8,
        },
        displayColors: false,
      },
    },
    scales: {
      x: {
        title: {
          color: "white",
          font: {
            size: 16,
            family: "Montserrat",
            weight: 1000,
            color: "white",
          },
          display: true,
          text: "Date",
          lineWidth: 1,
        },
        align: "center",
        grid: {
          display: false,
        },
        ticks: {
          callback: function(value) {
            return this.getLabelForValue(value).substr(0,10);
          },
          color: "white",
          font: {
            size: 10,
            weight: "100",
            family: "Montserrat",
            color: "white",
          },
          padding: 5,
          grace: 5,
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          callback: function(value) {
            return this.getLabelForValue(value).substr(0,2);
          },
          color: "white",
          font: {
            family: "Montserrat",
            size: 10,
            weight: "100",
            color: "white",
          },
          padding: 5,
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
          text: "Score (in thousands)",
        },
      },
      percentage: {
        beginatZero: true,
        position: "right",
        title: {
          color: "white",
          font: {
            size: 16,
            family: "Montserrat",
            weight: 1000,
            color: "white",
          },
          display: true,
          text: "%",
        },
        ticks: {
          color: "white",
          font: {
            family: "Montserrat",
            size: 10,
            weight: "100",
            color: "white",
          },
          padding: 5,
        },
      },
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
