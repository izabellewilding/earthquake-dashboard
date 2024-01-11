import { getWordsAfterLastComma } from "../utils/getWordsAfterLastComma";

interface CardProps {
  latestEarthquake: {
    mag: number;
    place: string;
    time: string;
  };
  className?: string;
}

export function convertEpochToDate(epochTime: number) {
  const date = new Date(epochTime); // Multiply by 1000 to convert seconds to milliseconds

  const options = { year: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options as any).format(
    date
  );

  return formattedDate;
}

export function Card({ latestEarthquake, className }: CardProps) {
  const combinedClassName = `rounded-xl min-w-60 align-middle max-w-64 p-6 ${
    className || ""
  }`;

  return (
    <div className={combinedClassName}>
      <p className="text-xs mb-3">Latest Earthquake</p>
      <p className=" text-2xl font-bold mb-3">
        {getWordsAfterLastComma(latestEarthquake?.place)}{" "}
        <span className="text-xl font-semibold">{`(M${latestEarthquake?.mag})`}</span>
      </p>
      {/* <p className="text-md">{latestEarthquake?.time}</p> */}
    </div>
  );
}
