import { useEarthquakeQuery } from "../hooks/useEarthquakeQuery";

export function getLatestEarthquake(): any {
  const { data, isLoading, isError } = useEarthquakeQuery({
    query: "?format=geojson",
  });

  const latestEarthquake = data?.features[0];

  return latestEarthquake;
}
