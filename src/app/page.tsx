"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Charts from "./components/Charts";
import { SideNavbar } from "./components/SideNavbar";
import { groupByMonthMagnitude } from "./utils/groupByMonthMagnitude";
import ClipLoader from "react-spinners/ClipLoader";
import { groupBy } from "./utils/GroupChartData";
import { getCurrentDateTime } from "./utils/getCurrentDataTime";
import { getDateOneMonthAgo } from "./utils/getDateOneMonthAgo";
import { Earthquake } from "./types/types";
import { getDataOneYearAgo } from "./utils/getDateOneYearAgo";

async function queryEarthquakeAPI(query: string) {
  const response = await axios.get(
    `https://earthquake.usgs.gov/fdsnws/event/1/query${query}`
  );

  const data = response.data;

  return data;
}

export default function Home() {
  const currentDate = getCurrentDateTime();
  const dateOneMonthAgo = getDateOneMonthAgo();
  const oneYearAgo = getDataOneYearAgo();

  const monthMagnitudeQuery =
    "?format=geojson&starttime=2023-01-01&endtime=2023-12-31&minmagnitude=6.0";

  const earthquakesByMonthMagnitude = useQuery({
    queryKey: ["earthquakes by month and magnitude", monthMagnitudeQuery],
    queryFn: async () => {
      const data = await queryEarthquakeAPI(monthMagnitudeQuery);
      return groupByMonthMagnitude(data);
    },
  });

  const oneYearAgoQuery = `?format=geojson`;

  const earthquakesPerCountry = useQuery({
    queryKey: ["earthquakes per country", oneYearAgoQuery],
    queryFn: async () => {
      const data = await queryEarthquakeAPI(oneYearAgoQuery);
      const groupedData = groupBy(data.features, "place");
      return groupedData;
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

  const last10Earthquakes =
    allEarthquakesInLastMonth?.data?.features.slice(-10);

  const isLoading =
    earthquakesByMonthMagnitude.isLoading ||
    allEarthquakesInLastMonth.isLoading ||
    earthquakesPerCountry.isLoading;

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

  return (
    <main>
      <h1 className="">Dashboard</h1>
      <SideNavbar>
        <Charts
          earthquakesPerCountry={earthquakesPerCountry}
          earthquakesByMonthMagnitude={earthquakesByMonthMagnitude}
          latestEarthquake={latestEarthquake}
          largestEarthquakeInLastMonth={largestEarthquakeInLastMonth}
          last10Earthquakes={last10Earthquakes}
        />
      </SideNavbar>
    </main>
  );
}
