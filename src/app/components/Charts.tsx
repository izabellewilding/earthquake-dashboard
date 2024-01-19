import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ErrorBoundary } from "./ErrorBoundary";
import { DoughnutChart } from "./DoughnutChart";
import { BarChart } from "./BarChart";
import { Card } from "./Card";
import { List } from "./List";
import { getDataOneYearAgo } from "../utils/getDateOneYearAgo";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const barOptions = {
  responsive: true,
  // maintainAspectRatio: false,

  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    title: {
      display: true,
      text: "Number of Earthquakes with magnitude > 6.0 by month (2023)",
      color: "#d7e6ffad",
      font: {
        weight: "regular",
      },
    },
  },
};

const doughnutOptions = {
  maintainAspectRatio: false,
  radius: 150,
  cutout: "80%",
};

ChartJS.overrides.doughnut = {
  plugins: {
    title: {
      display: true,
      text: "Countries with highest number of earthquakes",
      align: "start", // Align title to the start (left)
      color: "#d7e6ffad",
      font: {
        weight: "regular",
      },
    },
  },
};

function ChartsComponent({
  earthquakesPerCountry,
  earthquakesByMonthMagnitude,
  latestEarthquake,
  largestEarthquakeInLastMonth,
  last10Earthquakes,
}: any) {
  const barChartData = {
    labels: earthquakesByMonthMagnitude.data?.map((item: any) => item.label),
    datasets: [
      {
        label: "USGS DATA",
        data: earthquakesByMonthMagnitude.data?.map((item: any) => item.value),
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

  const filteredEarthquakesPerCountry = earthquakesPerCountry
    ? Object.fromEntries(
        Object.entries(earthquakesPerCountry.data).filter((item) =>
          item ? item[1].length > 100 : {}
        )
      )
    : {};

  const doughnutChartData = {
    labels: Object.keys(filteredEarthquakesPerCountry),
    datasets: [
      {
        data: Object.values(filteredEarthquakesPerCountry || {}).map(
          (earthquakes) => earthquakes.length
        ),
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className=" col-span-2 flex flex-center flex-col ml-8">
        <h1 className="text-3xl font-bold mb-7">
          USGS Earthquake Data Dashboard
        </h1>
        <div className="flex flex-row space-x-9 mb-4">
          <Card
            className="bg-gradient-to-r from-purple-600 to-blue-500"
            data={latestEarthquake.properties}
            latest
          />
          <Card
            className="bg-gradient-to-r from-purple-600 to-blue-500"
            data={largestEarthquakeInLastMonth?.properties}
          />
        </div>
        <div className="flex flex-col mt-4">
          <div className="pb-4 min-h-72">
            <BarChart data={barChartData} options={barOptions} />
          </div>
          <div
            className="flex justify-evenly bg-gray-900 rounded-md"
            style={{ height: 425 }}
          >
            <DoughnutChart data={doughnutChartData} options={doughnutOptions} />
            {/* <DoughnutChart data={chartData} options={doughnutOptions} /> */}
          </div>
        </div>
      </div>
      <List data={last10Earthquakes} />
    </div>
  );
}

export default function Charts({
  earthquakesPerCountry,
  earthquakesByMonthMagnitude,
  latestEarthquake,
  largestEarthquakeInLastMonth,
  last10Earthquakes,
}: any) {
  return (
    <ErrorBoundary>
      <ChartsComponent
        earthquakesPerCountry={earthquakesPerCountry}
        earthquakesByMonthMagnitude={earthquakesByMonthMagnitude}
        latestEarthquake={latestEarthquake}
        largestEarthquakeInLastMonth={largestEarthquakeInLastMonth}
        last10Earthquakes={last10Earthquakes}
      />
    </ErrorBoundary>
  );
}
