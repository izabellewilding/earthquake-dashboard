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

      return groupBy(data.features, "place");
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

  console.warn(last10Earthquakes);

  return (
    <main>
      <SideNavbar>
        <Charts
          earthquakesPerCountry={earthquakesPerCountry.data}
          earthquakesByMonthMagnitude={earthquakesByMonthMagnitude.data || {}}
          latestEarthquake={latestEarthquake}
          largestEarthquakeInLastMonth={largestEarthquakeInLastMonth}
          last10Earthquakes={last10Earthquakes}
        />
      </SideNavbar>
    </main>
  );
}
