import { useEarthquakeQuery } from "../hooks/useEarthquakeQuery";
import { convertEpochToMonthYear } from "../utils/ConvertEpochToYearMonth";
import { Earthquake } from "../types/types";
import { groupChartData } from "../utils/GroupChartData";

export function groupedDataMonthMagnitude(): any {
  const { data, isLoading, isError } = useEarthquakeQuery();

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

  const groupedChartData = groupChartData(filteredByMagnitude, filteredLabels);

  return groupedChartData;
}
