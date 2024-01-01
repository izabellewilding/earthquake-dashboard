import { useEarthquakeQuery } from "../hooks/useEarthquakeQuery";
import { ErrorBoundary } from "./ErrorBoundary";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { convertEpochToMonthYear } from "../lib/ConvertEpochToYearMonth";
import { Earthquake } from "../types/types";
import { groupChartData } from "../lib/GroupChartData";
import { BarChart } from "./BarChart";
import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function Chart() {
  const { data, error, isLoading } = useEarthquakeQuery();

  const filteredByMagnitude = data?.features
    .map((feature: any) => feature)
    .sort((a: any, b: any) => a.properties.time - b.properties.time)
    .filter((item: any) => item.properties.mag > 6.0);

  //   const dateOrdered = data?.sort((a: any, b: any) => console.warn(a, b));

  const labels = filteredByMagnitude?.map(
    (data: Earthquake) => data?.properties.time
  );

  const convertedLabels = labels?.map((label: any) =>
    convertEpochToMonthYear(label)
  );

  const filteredLabels = convertedLabels?.filter(
    (value: any, index: any, self: any) => {
      return self.indexOf(value) === index;
    }
  );

  const groupedChartData = groupChartData(filteredByMagnitude, filteredLabels);

  console.warn(groupedChartData, "GPD");

  const chartData = {
    labels: groupedChartData?.map((data) => data.label),
    datasets: [
      {
        data: groupedChartData?.map((data) => data.value),
        backgroundColor: [
          "#3498db", // Dodger Blue
          "#2ecc71", // Emerald Green
          "#9b59b6", // Amethyst Purple
          "#1abc9c", // Turquoise
          "#2980b9", // Belize Hole Blue
          "#e74c3c", // Alizarin Red
          "#d35400", // Pumpkin Orange (replaced)
          "#e67e22", // Carrot Orange
          "#c56cf0", // Soft Purple
          "#fd79a8", // Light Pink
        ],
        hoverBackgroundColor: [
          "#2980b9", // Shadow for Dodger Blue
          "#27ae60", // Shadow for Emerald Green
          "#8e44ad", // Shadow for Amethyst Purple
          "#16a085", // Shadow for Turquoise
          "#1f618d", // Shadow for Belize Hole Blue
          "#c0392b", // Shadow for Alizarin Red
          "#d35400", // Shadow for Carrot Orange
          "#e67e22", // Shadow for Carrot Orange (replaced)
          "#af7ac5", // Shadow for Soft Purple
          "#e84393", // Shadow for Light Pink
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: true, // To ensure the chart is a perfect circle
    radius: 300,
    legend: {
      display: true,
      position: "right",
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    throw error;
  }

  return (
    <div>
      <Doughnut data={chartData} options={options} />
      <BarChart data={chartData} options={options} />
    </div>
  );
}

export default function Charts() {
  return (
    <ErrorBoundary>
      <Chart />
    </ErrorBoundary>
  );
}
