import { useEarthquakeQuery } from "../hooks/useEarthquakeQuery";
import { ErrorBoundary } from "./ErrorBoundary";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { convertEpochToMonthYear } from "../lib/ConvertEpochToYearMonth";
import { Earthquake } from "../types/types";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart() {
  const { data, error, isLoading } = useEarthquakeQuery();

  const filteredByMagnitude = data?.features
    .map((feature: any) => feature)
    .sort((a: any, b: any) => a.properties.time - b.properties.time)
    .filter((item: any) => item.properties.mag > 4.0);

  //   const dateOrdered = data?.sort((a: any, b: any) => console.warn(a, b));
  console.warn(filteredByMagnitude);

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

  console.warn(filteredLabels, "LABELS");

  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        data: filteredByMagnitude,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
