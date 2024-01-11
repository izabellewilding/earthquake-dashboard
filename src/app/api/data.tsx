import { useEarthquakeQuery } from "../hooks/useEarthquakeQuery";
import { groupBy } from "../utils/GroupChartData";
import { convertEpochToMonthYear } from "../utils/ConvertEpochToYearMonth";
import { Earthquake } from "../types/types";
import { groupMonthData } from "../utils/GroupChartData";
import axios from "axios";

async function queryEarthquakeAPI() {
  try {
    const response = await axios.get(
      "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2013-01-01&endtime=2023-12-31"
    );

    const data = response.data;

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch earthquake data.");
  }
}

export async function fetchEarthquakesPerCountry(): Promise<any> {
  try {
    const data = await queryEarthquakeAPI();
    console.warn("EPC", data);

    //   const groupedChartData = data && groupBy(data?.features, "place");

    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw new Error("Failed to fetch earthquakes per country.");
  }
}

export function fetchLatestEarthquake(): any {
  const { data, isLoading, isError } = useEarthquakeQuery({
    query: "?format=geojson",
  });

  const latestEarthquake = data?.features[0];

  return latestEarthquake;
}

export function fetchEarthquakesByMagnitude(data: any): any {
  const filteredByMagnitude = data?.features
    .map((feature: any) => feature)
    .sort((a: any, b: any) => a.properties.time - b.properties.time)
    .filter((item: any) => item.properties.mag > 6.0);

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

  const groupedChartData = groupMonthData(filteredByMagnitude, filteredLabels);

  return groupedChartData;
}
