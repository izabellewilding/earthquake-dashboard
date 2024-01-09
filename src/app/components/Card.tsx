interface CardProps {
  latestEarthquake: {
    mag: number;
    place: string;
    time: string;
  };
}

export function convertEpochToDate(epochTime: number) {
  const date = new Date(epochTime); // Multiply by 1000 to convert seconds to milliseconds

  const options = { year: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options as any).format(
    date
  );

  return formattedDate;
}

export function Card({ latestEarthquake }: CardProps) {
  console.warn(latestEarthquake);
  return (
    <div className="rounded-md bg-purple-500 align-middle max-w-64 p-6 ">
      <p className="text-xs">Latest Earthquake</p>

      <p className="text-sm">{latestEarthquake?.place}</p>
      <p className="text-3xl">{latestEarthquake?.mag}</p>
      <p className="text-md">{latestEarthquake?.time}</p>
    </div>
  );
}
