import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
ChartJS.register(MatrixController, MatrixElement, ...registerables);

function titleCallback(context) {
  let title = (context[0].raw.v * 100).toFixed(0) + "%";
  return title;
}

function labelCallback(tooltipItem) {
  return (tooltipItem.raw.v * 100).toFixed(0) + "%";
}

function getAvgValue(data, currentIndex) {
    if (data === null || data.length === 0) {
        return null;
    }
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i][currentIndex] || 0;
    }
    return sum / data.length;
}

function getAveragedLocAcc(data) {
  if (data === null || data.length === 0) {
    return null;
  }
  if (data[1] === undefined) {
    return data;
  }
  console.log(data)
  let accuracyValues = data.map((x) => x.map((y) => y.v));
  let outData = [];
  for (let i = 0; i < data[1].length; i++) {
    outData.push({
      x: data[1][i].x,
      y: data[1][i].y,
      v: getAvgValue(accuracyValues, i)
    });
  }
  return outData;
}

function getWidth(data) {
  if (data === null) {
    return null;
  }
  const x = data.map((x) => parseInt(x.x));
  return Math.max(...x) + 1;
}

function getHeight(data) {
  if (data === null) {
    return null;
  }
  const y = data.map((x) => parseInt(x.y));
  return Math.max(...y) + 1;
}

const LocationAccuracyHeatmap = (props, canvas) => {
  const { title } = props.myOptions;

  const avgData = getAveragedLocAcc(props.data);

  // for (let array in props.data) {
  //   for (let element in props.data[array]) {
  //    // console.log(element)
  //    //console.log(props.data[array][element])
  //     newData[element] += (props.data[array][element].v);
  //   }
  // }
  //console.log(newData)
  // let b = newData.reduce((acc, cur) => {
  //     cur.forEach((e, i) => acc[i] = acc[i] ? acc[i] + e : e);
  //     return acc;
  // }, []).map(e => e / newData.length);
  // console.log(b);

  const data = {
    datasets: [
      {
        type: "matrix",
        data: avgData,
        borderColor: "white",
        borderWidth: 0.5,
        hoverBackgroundColor: "yellow",
        hoverBorderColor: "yellowgreen",
        width: ({ chart }) =>
          (chart.chartArea || {}).width /
          getWidth(avgData),
        height: ({ chart }) =>
          (chart.chartArea || {}).height /
          getHeight(avgData),
        backgroundColor: function (context) {
          if (!context.raw) {
            return 0;
          }
          return `hsl(193, 81%, 58%, ${context.raw.v})`;
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
            return null
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
    <>
      <div className="locAcc-chart">
        <Chart type="matrix" data={data} options={options} />
      </div>
    </>
  );
};

export default LocationAccuracyHeatmap;
