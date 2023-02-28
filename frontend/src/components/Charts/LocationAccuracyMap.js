import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
ChartJS.register(MatrixController, MatrixElement, ...registerables);

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function titleCallback(context) {
  let title = (context[0].raw.v * 100).toFixed(0) + "%";
  return title;
}

function labelCallback(tooltipItem) {
    console.log(tooltipItem.raw)
  return (tooltipItem.raw.v * 100).toFixed(0) + "%";
}

const LocationAccuracyHeatmap = (props, canvas) => {
  const { title } = props.myOptions;
  const x = props.data.map((x) => parseInt(x.x));
  const y = props.data.map((x) => parseInt(x.y));
  const data = {
    labels: props.labels,
    datasets: [
      {
        type: "matrix",
        labels: props.labels,
        data: props.data,
        borderColor: "green",
        borderWidth: 0.2,
        hoverBackgroundColor: "yellow",
        hoverBorderColor: "yellowgreen",
        width: ({ chart }) =>
          (chart.chartArea || {}).width / (Math.max(...x) + 2),
        height: ({ chart }) =>
          (chart.chartArea || {}).height / (Math.max(...y) + 2),
        backgroundColor: function (context) {
          if (!context.raw) {
            return 0;
          }
          return `hsl(227, 15%, 70%, ${context.raw.v})`;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        align: "center",
        text: title,
        color: "hsl(193, 81%, 58%)",
        font: {
          size: 20,
          family: "Montserrat",
          weight: 700,
          color: "hsl(193, 81%, 58%)",
        },
      },
      tooltip: {
        padding: "8",
        displayColors: false,
        titleFont: {
          size: 14,
          family: "Montserrat",
          weight: 700,
          color: "hsl(193, 81%, 58%)",
        },
        color: "hsl(193, 81%, 58%)",
        bodyFont: {
          weight: 500,
          family: "Montserrat",
          size: "14",
        },
        callbacks: {
          title: function (context) {
            return titleCallback(context);
          },
          label: function (tooltipItem) {
            return labelCallback(tooltipItem);
          },
          labelTextColor: function () {
            return "hsl(193, 81%, 58%)";
          },
        },
      },
    },
    scales: {
      y: {
        display: false,
        reverse: true,
        grid: {
          display: false,
          drawBorder: false,
          tickLength: 0,
        },
      },
      x: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
          tickLength: 0,
        },
      },
    },
  };
  return (
    <>
      <div className="heatmap-chart">
        <Chart type="matrix" data={data} options={options} />
      </div>
    </>
  );
};

export default LocationAccuracyHeatmap;
