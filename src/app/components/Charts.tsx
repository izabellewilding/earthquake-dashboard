"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
  Chart as ChartJS,
} from "chart.js";
import { ErrorBoundary } from "./ErrorBoundary";
import { BarChart } from "./BarChart";
import { Card } from "./Card";
import { DoughnutChart } from "./DoughnutChart";
import { List } from "./List";
import { Earthquake } from "../types/types";
import { groupByMonthMagnitude } from "../utils/groupByMonthMagnitude";
import { getCurrentDateTime } from "../utils/getCurrentDataTime";
import { getDateOneMonthAgo } from "../utils/getDateOneMonthAgo";
import { groupBy } from "../utils/groupBy";
import ClipLoader from "react-spinners/ClipLoader";

//chart configuration

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
  maintainAspectRatio: false,

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
      color: "white",
      display: true,
      text: "Number of earthquakes with magnitude > 6.0 by month (2023)",
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
    // @ts-ignore
    title: {
      display: true,
      text: "All earthquakes this week (by country)",
      align: "center", // Align title to the start (left)
    },
  },
};

//api query function
async function queryEarthquakeAPI(query: string) {
  const response = await axios.get(
    `https://earthquake.usgs.gov/fdsnws/event/1/query${query}`
  );

  const data = response.data;

  return data;
}

const chartColors = [
  "#3498db",
  "#2ecc71",
  "#9b59b6",
  "#1abc9c",
  "#2980b9",
  "#e74c3c",
  "#d35400",
  "#e67e22",
  "#c56cf0",
  "#fd79a8",
];

function ChartsComponent() {
  const currentDate = getCurrentDateTime();
  const dateOneMonthAgo = getDateOneMonthAgo();

  const monthMagnitudeQuery =
    "?format=geojson&starttime=2023-01-01&endtime=2023-12-31&minmagnitude=6.0";

  const earthquakesByMonthMagnitude = useQuery({
    queryKey: ["earthquakes by month and magnitude", monthMagnitudeQuery],
    queryFn: async () => {
      const data = await queryEarthquakeAPI(monthMagnitudeQuery);
      return groupByMonthMagnitude(data);
    },
  });

  const lastWeek = "?format=geojson&starttime=2024-01-07&endtime=2024-01-08";

  const earthquakesPerCountry = useQuery({
    queryKey: ["earthquakes per country", lastWeek],
    queryFn: async () => {
      const data = await queryEarthquakeAPI(lastWeek);

      return groupBy(data.features);
    },
  });

  const earthquakesInLastMonthQuery = `?format=geojson&starttime=${dateOneMonthAgo}&endtime=${currentDate}`;

  const allEarthquakesInLastMonth = useQuery({
    queryKey: ["allEarthquakesInLastMonth", earthquakesInLastMonthQuery],
    queryFn: async () => {
      const data = await queryEarthquakeAPI(earthquakesInLastMonthQuery);
      return data;
    },
  });

  const largestEarthquakeInLastMonth =
    allEarthquakesInLastMonth?.data?.features.reduce(
      (a: Earthquake, b: Earthquake) =>
        a.properties.mag > b.properties.mag ? a : b
    );

  const latestEarthquake = allEarthquakesInLastMonth?.data?.features[0];

  const last10Earthquakes = allEarthquakesInLastMonth?.data?.features.slice(
    0,
    10
  );

  const isLoading =
    earthquakesByMonthMagnitude.isLoading ||
    allEarthquakesInLastMonth.isLoading ||
    earthquakesPerCountry.isLoading;

  const error =
    earthquakesByMonthMagnitude.error ||
    allEarthquakesInLastMonth.error ||
    earthquakesPerCountry.error;

  if (isLoading) {
    return (
      <ClipLoader
        color={"blue"}
        loading={isLoading}
        cssOverride={{}}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  if (error) {
    return "An error occured, please try refreshing the page...";
  }

  const barChartData = {
    labels: earthquakesByMonthMagnitude.data.map((item: any) => item.label),
    datasets: [
      {
        label: "USGS Earthquakes",
        data: earthquakesByMonthMagnitude.data.map((item: any) => item.value),
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors.map((color) => `${color}80`), // Add alpha for hover effect
      },
    ],
  };

  const doughnutChartData = {
    labels: Object.keys(earthquakesPerCountry.data || {}),
    datasets: [
      {
        label: "USGS Earthquakes",
        data: Object.values(earthquakesPerCountry.data || {}).map(
          (earthquakes: any) => earthquakes.length
        ),
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors.map((color) => `${color}80`), // Add alpha for hover effect
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 bg-slate-900">
      <div className=" col-span-2 flex flex-center flex-col md:m-6 ">
        <h1 className="text-2xl mb-7 p-5 text-text">
          USGS Earthquake Data Dashboard
        </h1>
        <div className="flex flex-col gap-6 items-center md:flex-row mb-4 md:pl-4">
          <h1>Statistics</h1>
          <div className="flex flex-row">
            <Card
              className="bg-gradient-to-r"
              data={latestEarthquake.properties}
              latest
            />
            <Card
              className="bg-gradient-to-r"
              data={largestEarthquakeInLastMonth?.properties}
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <div className="pb-4 h-80 md:h-96 bg-slate-800 rounded-md p-5 shadow-2xl">
            <BarChart data={barChartData} options={barOptions} />
          </div>
          <div
            className="flex justify-evenly sm:ml-4  bg-slate-900 rounded-md mb-5 ml-0 "
            style={{ height: 425 }}
          >
            <DoughnutChart data={doughnutChartData} options={doughnutOptions} />
          </div>
        </div>
      </div>
      <List data={last10Earthquakes} />
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
