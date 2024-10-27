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
import { GridGraphic } from "./GridGraphic";
import { getEarthquakeData } from "../queries/getEarthquakeData";
import { earthquakesInLastMonthQuery } from "../queries/getEarthquakesByMonth";
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
      ticks: {
        color: "#f4c7d7", // X-axis label color
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#f4c7d", // X-axis label color
      },
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
  "#bf99cf",
  "#58eacd",
  "#6bacd8",
  "#e0a069",
  "#c56cf0",
  "#f494b5",
];

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

  const lastWeek = "?format=geojson&starttime=2024-01-07&endtime=2024-01-08";

  const earthquakesPerCountry = useQuery({
    queryKey: ["earthquakes per country", lastWeek],
    queryFn: async () => {
      const data = await queryEarthquakeAPI(lastWeek);

      return groupBy(data.features);
    },
  });

  const getEarthquakesByMonth = useQuery({
    queryKey: ["earthquakesByMonth", earthquakesInLastMonthQuery],
    queryFn: async () => {
      const data = await getEarthquakeData(earthquakesInLastMonthQuery);
      return data;
    },
  });

  const largestEarthquakeInLastMonth =
    getEarthquakesByMonth?.data?.features.reduce(
      (a: Earthquake, b: Earthquake) =>
        a.properties.mag > b.properties.mag ? a : b
    );

  const latestEarthquake = getEarthquakesByMonth?.data?.features[0];

  const last10Earthquakes = getEarthquakesByMonth?.data?.features.slice(0, 10);

  const isLoading =
    earthquakesByMonthMagnitude.isLoading ||
    getEarthquakesByMonth.isLoading ||
    earthquakesPerCountry.isLoading;

  const error =
    earthquakesByMonthMagnitude.error ||
    getEarthquakesByMonth.error ||
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
        barThickness: 30, // Set the bar width to 30 pixels
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
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="relative col-span-4 flex flex-center flex-col md:m-6 max-h-screen ">
        <h1 className="text-2xl mb-3 text-white font-bold">
          USGS <span className="text-[#a0bfa3]">Earthquake Data Dashboard</span>
        </h1>
        <h1 className="text-md mb-12 text-slate-300 ">
          This is a data dashboard displaying live global earthquake data using
          the USGS API.
        </h1>
        <div className="flex flex-row">
          <Card
            className="bg-gradient-to-r text-[#6bacd8]"
            data={latestEarthquake.properties}
            title="Latest Earthquake"
          />
          <Card
            className="bg-gradient-to-r text-[#bf99cf]"
            data={largestEarthquakeInLastMonth?.properties}
            title="Biggest in the last month"
          />
        </div>
        <div className="grid grid-cols-2 mt-4 h-full">
          <div className="pb-4 p-5  ">
            <BarChart data={barChartData} options={barOptions} />
          </div>
          <div
            className="flex justify-evenly sm:ml-4  mb-5 ml-0 "
            style={{ height: 425 }}
          >
            <DoughnutChart data={doughnutChartData} options={doughnutOptions} />
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <List data={last10Earthquakes} />
      </div>
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
