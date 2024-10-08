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
  const date = new Date(epochTime);

  const options = { year: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options as any).format(
    date
  );

  return formattedDate;
}

export function Card({ data, className, latest }: CardProps) {
  const combinedClassName = `rounded-xl min-w-60 w-full h-full md:max-w-64 p-6 shadow-xl text-text ${
    className || ""
  }`;

  return (
    <div className={combinedClassName}>
      <p className="text-xs font-semibold mb-3 text-slate-400">
        {latest ? "Latest earthquake" : "Largest earthquake in the last month"}
      </p>
      <p className=" text-2xl font-bold mb-3">
        {getWordsAfterLastComma(data?.place)}
        <span className="text-xl font-semibold">{` (M${data?.mag})`}</span>
      </p>
    </div>
  );
}
