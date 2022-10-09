import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = (props) => {
  const options = {
    plugins: {
      responsive: true,
      title: {
        display: true,
        text: "Chartjs chart",
      },
    },
  };

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Dataset 1",
        data: props.data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <div className="chart">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;
