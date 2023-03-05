import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
ChartJS.register(MatrixController, MatrixElement, ...registerables);

const green = [0, 255, 0, 1];
const red = [255, 0, 0, 1];
const yellow = [255, 255, 0, 1];

function titleCallback(context) {
  if (context[0].raw.v === -1) {
    return "No target has spawned here";
  }
  let title = (context[0].raw.v * 100).toFixed(0) + "%";
  return title;
}

function getAvgValue(data, currentIndex) {
  if (data === null || data.length === 0) return null;
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i][currentIndex] === -1.0) {
      continue;
    }
    sum += data[i][currentIndex] || 0;
  }
  if (sum === 0) {
    return -1;
  }
  return sum / data.length;
}

function getAveragedLocAcc(data) {
  if (data === null || data.length === 0) {
    return null;
  }
  if (data.length === 1) {
    return data[0];
  }
  let accuracyValues = data.map((x) => x.map((y) => y.v));
  let averagedValues = [];
  for (let point in data[0]) {
    averagedValues.push({
      x: data[0][point].x,
      y: data[0][point].y,
      v: getAvgValue(accuracyValues, point),
    });
  }
  return averagedValues;
}

function getWidth(data) {
  if (data === null) {
    return null;
  }
  const x = data.map((x) => parseInt(x.x));
  return Math.max(...x);
}

function getHeight(data) {
  if (data === null) {
    return null;
  }
  const y = data.map((x) => parseInt(x.y));
  return Math.max(...y);
}

const lerp = (x, y, a) => x * (1 - a) + y * a;

function getColor(alpha) {
  if (alpha < 0) {
    return `rgba(255, 255, 255, 0.2)`;
  } else if (alpha === 0.5) {
    return `rgba(255, 255, 0, 0.75)`;
  } else if (alpha < 0.5) {
    const r = lerp(red[0], yellow[0], alpha);
    const g = lerp(red[1], yellow[1], alpha);
    const b = lerp(red[2], yellow[2], alpha);
    return `rgba(${r}, ${g}, ${b}, 0.75)`;
  } else if (alpha > 0.5) {
    const r = lerp(yellow[0], green[0], alpha);
    const g = lerp(yellow[1], green[1], alpha);
    const b = lerp(yellow[2], green[2], alpha);
    return `rgba(${r}, ${g}, ${b},0.75)`;
  }
}

function getHoverColor(alpha) {
  if (alpha < 0) {
    return `rgba(255, 255, 255, 0.5)`;
  } else if (alpha === 0.5) {
    return `rgba(255, 255, 0, 1)`;
  } else if (alpha < 0.5) {
    const r = lerp(red[0], yellow[0], alpha);
    const g = lerp(red[1], yellow[1], alpha);
    const b = lerp(red[2], yellow[2], alpha);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  } else if (alpha > 0.5) {
    const r = lerp(yellow[0], green[0], alpha);
    const g = lerp(yellow[1], green[1], alpha);
    const b = lerp(yellow[2], green[2], alpha);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }
}

const LocationAccuracyHeatmap = (props, canvas) => {
  const { title } = props.myOptions;
  const avgData = getAveragedLocAcc(props.data);
  const data = {
    datasets: [
      {
        type: "matrix",
        data: avgData,
        borderColor: "white",
        borderWidth: 0,
        hoverBorderColor: "grey",
        width: ({ chart }) =>
          (chart.chartArea || {}).width / getWidth(avgData) - 5,
        height: ({ chart }) =>
          (chart.chartArea || {}).height / getHeight(avgData) - 6,
        backgroundColor: function (context) {
          if (!context.raw) {
            return null;
          }
          return getColor(context.raw.v);
        },
        hoverBackgroundColor: function (context) {
          if (!context.raw) {
            return null;
          }
          return getHoverColor(context.raw.v);
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
            return null;
          },
          //   labelTextColor: function () {
          //     return "hsl(193, 81%, 58%)";
          //   },
        },
      },
    },
    scales: {
      y: {
        type: "category",
        bounds: data,
        display: false,
        offset: true,
        reverse: true,
        ticks: {
          autoSkip: true,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      x: {
        type: "category",
        bounds: data,
        display: false,
        offset: true,
        ticks: {
          autoSkip: true,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };
  return (
    <div className="locAcc-chart">
      <Chart type="matrix" data={data} options={options} />
    </div>
  );
};

export default LocationAccuracyHeatmap;
