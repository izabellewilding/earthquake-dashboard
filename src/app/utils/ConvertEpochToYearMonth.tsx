export function convertEpochToMonthYear(epochTime: number) {
  const date = new Date(epochTime); // Multiply by 1000 to convert seconds to milliseconds

  const options = { year: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options as any).format(
    date
  );

  return formattedDate;
}
