import { useEarthquakeQuery } from "../hooks/useEarthquakeQuery";
import { ErrorBoundary } from "./ErrorBoundary";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { convertEpochToMonthYear } from "../lib/ConvertEpochToYearMonth";
import { Earthquake } from "../types/types";
import { groupChartData } from "../lib/GroupChartData";

ChartJS.register(ArcElement, Tooltip, Legend);

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
          "#af0026",
          "#af1700",
          "#eb7b36",
          "#FFCE56",
          "#00af17",
          "#00600b",
          "#002faf",
          "#006faf",
          "#57c1ff",
          "#8b36eb",
          "#9f9cfb",
          "#ff56d8",
        ],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // To ensure the chart is a perfect circle
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
