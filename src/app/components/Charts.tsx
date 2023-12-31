import { useEarthquakeQuery } from "../hooks/useEarthquakeQuery";
import { ErrorBoundary } from "./ErrorBoundary";

function Chart() {
  const { data, error, isLoading } = useEarthquakeQuery();

  console.log(
    data && data.features.map((feature: any) => console.log(feature))
  );

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
