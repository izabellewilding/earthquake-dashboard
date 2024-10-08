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
  const combinedClassName = `rounded-xl button min-w-60 w-full h-full md:max-w-64 p-6 shadow-xl text-text bg-slate-800 relative px-6 py-3 rounded-[13px] bg-white/30 backdrop-blur-lg text-gray-800 font-manrope text-base flex flex-col justify-center items-center shadow-inner transition-transform duration-200 ease-linear hover:scale-105 ${
    className || ""
  }`;

  return (
    <div className={combinedClassName}>
      <p className="text-xs font-semibold mb-3 text-slate-400 b">
        {latest ? "Latest earthquake" : "Largest earthquake in the last month"}
      </p>

      <p className=" text-xl font-bold mb-3">
        {getWordsAfterLastComma(data?.place)}
        <span className="text-xl font-semibold">{` (M${data?.mag})`}</span>
      </p>
      <span className="absolute w-24 h-16 bg-fuchsia-500 rounded-full blur-[20px] bottom-[-50%] opacity-40 transition-opacity duration-200 ease-linear hover:opacity-60" />
    </div>
  );
}
