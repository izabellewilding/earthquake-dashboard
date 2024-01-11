"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Charts from "./components/Charts";
import { SideNavbar } from "./components/SideNavbar";
import { groupByMonthMagnitude } from "./utils/groupByMonthMagnitude";
import ClipLoader from "react-spinners/ClipLoader";
import { groupBy } from "./utils/GroupChartData";

async function queryEarthquakeAPI(query: string) {
  const response = await axios.get(
    `https://earthquake.usgs.gov/fdsnws/event/1/query${query}`
  );

  const data = response.data;

  return data;
}

export default function Home() {
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

  return (
    <main>
      <h1 className="">Dashboard</h1>
      <SideNavbar>
        <Charts
          earthquakesPerCountry={earthquakesPerCountry}
          earthquakesByMonthMagnitude={earthquakesByMonthMagnitude}
          latestEarthquake={latestEarthquake}
        />
      </SideNavbar>
    </main>
  );
}
