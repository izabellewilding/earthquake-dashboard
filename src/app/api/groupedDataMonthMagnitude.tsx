import { useEarthquakeQuery } from "../hooks/useEarthquakeQuery";
import { convertEpochToMonthYear } from "../utils/ConvertEpochToYearMonth";
import { Earthquake } from "../types/types";
import { groupMonthData } from "../utils/GroupChartData";

export function groupedDataMonthMagnitude(): any {
  const { data, isLoading, isError } = useEarthquakeQuery({
    query:
      "?format=geojson&starttime=2023-01-01&endtime=2023-12-31&minmagnitude=6.0",
  });

  const filteredByMagnitude = data?.features
    .map((feature: any) => feature)
    .sort((a: any, b: any) => a.properties.time - b.properties.time)
    .filter((item: any) => item.properties.mag > 6.0);

  const labels = filteredByMagnitude?.map(
    (data: Earthquake) => data?.properties.time
  );

  const convertedLabels = labels?.map((label: any) =>
    convertEpochToMonthYear(label)
  );

  const filteredLabels = convertedLabels?.filter(
    (value: any, index: any, self: any) => {
      return self.indexOf(value) === index;
    }
  );

  const groupedChartData = groupMonthData(filteredByMagnitude, filteredLabels);

  return groupedChartData;
}
