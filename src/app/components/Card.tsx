import { getWordsAfterLastComma } from "../utils/getWordsAfterLastComma";

interface CardProps {
  data: {
    mag: number;
    place: string;
    time: string;
  };
  className?: string;
  latest?: boolean;
}

export function convertEpochToDate(epochTime: number) {
  const date = new Date(epochTime); // Multiply by 1000 to convert seconds to milliseconds

  const options = { year: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options as any).format(
    date
  );

  return formattedDate;
}

export function Card({ data, className, latest }: CardProps) {
  const combinedClassName = `rounded-xl min-w-60 align-middle max-w-64 p-6 ${
    className || ""
  }`;

  return (
    <div className={combinedClassName}>
      <p className="text-xs font-semibold mb-3">
        {latest ? "Latest Earthquake" : "Largest Earthquake in past Month"}
      </p>
      <p className=" text-2xl font-bold mb-3">
        {getWordsAfterLastComma(data?.place)}
        <span className="text-xl font-semibold">{` (M${data?.mag})`}</span>
      </p>
      {/* <p className="text-md">{data?.time}</p> */}
    </div>
  );
}
