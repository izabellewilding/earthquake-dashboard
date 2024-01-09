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

  function getLastWord(inputString: string) {
    // Trim the string to remove leading and trailing whitespaces
    const trimmedString = inputString?.trim();

    // Split the string into an array of words
    const words = trimmedString?.split(/\s+/);

    // Get the last word (if any)
    const lastWord = words?.length > 0 ? words[words.length - 1] : "";

    return lastWord;
  }

  return (
    <div className={combinedClassName}>
      <p className="text-xs mb-3">Latest Earthquake</p>
      <p className=" text-2xl font-bold mb-3">
        {getLastWord(latestEarthquake?.place)}{" "}
        <span className="text-xl font-semibold">{`(M${latestEarthquake?.mag})`}</span>
      </p>
      {/* <p className="text-md">{latestEarthquake?.time}</p> */}
    </div>
  );
}
