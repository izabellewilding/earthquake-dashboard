import { useEarthquakeQuery } from "../hooks/useEarthquakeQuery";
import { ErrorBoundary } from "./ErrorBoundary";

function Chart() {
  const { data, error, isLoading } = useEarthquakeQuery();

  const earthquakesFilteredByMagnitude = data?.features
    .map((feature: any) => feature)
    .filter((item: any) => item.properties.mag > 6.0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    throw error;
  }

  return <div></div>;
}

export default function Charts() {
  return (
    <ErrorBoundary>
      <Chart />
    </ErrorBoundary>
  );
}
