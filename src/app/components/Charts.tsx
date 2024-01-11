"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { groupBy } from "../utils/GroupChartData";
import { ErrorBoundary } from "./ErrorBoundary";
import { DoughnutChart } from "./DoughnutChart";
import { BarChart } from "./BarChart";
import { Card } from "./Card";
import { groupByMonthMagnitude } from "../utils/groupByMonthMagnitude";
import ClipLoader from "react-spinners/ClipLoader";

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
    },
  },
};

const doughnutOptions = {
  maintainAspectRatio: true,
  radius: 200,
};

ChartJS.overrides.doughnut = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

async function queryEarthquakeAPI(query: string) {
  const response = await axios.get(
    `https://earthquake.usgs.gov/fdsnws/event/1/query${query}`
  );

  const data = response.data;

  return data;
}

function ChartsComponent() {
  const monthMagnitudeQuery =
    "?format=geojson&starttime=2023-01-01&endtime=2023-12-31&minmagnitude=6.0";

  const earthquakesByMonthMagnitude = useQuery({
    queryKey: ["earthquakes by month and magnitude", monthMagnitudeQuery],
    queryFn: async () => {
      const data = await queryEarthquakeAPI(monthMagnitudeQuery);
      return groupByMonthMagnitude(data);
    },
  });

  const earthquakesPerCountryQuery = "?format=geojson";

  const earthquakesPerCountry = useQuery({
    queryKey: ["earthquakes per country", earthquakesPerCountryQuery],
    queryFn: async () => {
      const data = await queryEarthquakeAPI(earthquakesPerCountryQuery);
      return groupBy(data.features, "place");
    },
  });

  const latestEarthquake = useQuery({
    queryKey: ["latest earthquake", earthquakesPerCountryQuery],
    queryFn: async () => {
      const data = await queryEarthquakeAPI(earthquakesPerCountryQuery);
      return data?.features[0];
    },
  });

  const loading =
    earthquakesByMonthMagnitude.isLoading ||
    latestEarthquake.isLoading ||
    earthquakesPerCountry.isLoading;

  if (loading) {
    return (
      <ClipLoader
        color={"blue"}
        loading={true}
        cssOverride={{}}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  const barChartData = {
    labels: earthquakesByMonthMagnitude.data?.map((item: any) => item.label),
    datasets: [
      {
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

  const chartData = {
    labels: Object.keys(earthquakesPerCountry.data || {}),
    datasets: [
      {
        data: Object.values(earthquakesPerCountry.data || {}).map(
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

  console.warn(latestEarthquake.data);

  return (
    <div className="flex-1 ml-5">
      <h1 className="text-3xl font-bold mb-7">
        USGS Earthquake Data Dashboard
      </h1>
      <div className="flex flex-row space-x-9">
        <Card
          className="bg-purple-500"
          latestEarthquake={latestEarthquake.data?.properties}
        />
        <Card
          className="bg-cyan-400"
          latestEarthquake={latestEarthquake.data?.properties}
        />
      </div>
      <BarChart data={barChartData} options={barOptions} />
      <DoughnutChart data={chartData} options={doughnutOptions} />
    </div>
  );
}

export default function Charts() {
  return (
    <ErrorBoundary>
      <ChartsComponent />
    </ErrorBoundary>
  );
}
