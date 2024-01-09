import { useEarthquakeQuery } from "../hooks/useEarthquakeQuery";
import { convertEpochToMonthYear } from "../utils/ConvertEpochToYearMonth";
import { Earthquake } from "../types/types";
import { groupBy } from "../utils/GroupChartData";
import { getLastWord } from "../utils/getLastWord";

export function getEarthquakesPerCountry(): any {
  const { data, isLoading, isError } = useEarthquakeQuery({
    query: "?format=geojson&starttime=2013-01-01&endtime=2023-12-31",
  });

  const groupedChartData = data && groupBy(data.features, "place");

  console.warn(groupedChartData);

  return groupedChartData;
}
