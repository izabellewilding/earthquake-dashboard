import { convertEpochToMonthYear } from "./ConvertEpochToYearMonth";
import { Earthquake } from "../types/types";
interface GroupedChartData {
  label: string;
  value: number;
}

function groupMonthData(
  data: Earthquake[],
  labels: string[]
): GroupedChartData[] {
  return data?.reduce((result: GroupedChartData[], item: Earthquake) => {
    const label = convertEpochToMonthYear(item.properties.time);
    const existingGroup = result.find((group) => group.label === label);

    if (existingGroup) {
      existingGroup.value += 1; // Adjust this based on how you want to aggregate the data
    } else {
      result.push({ label, value: 1 });
    }

    return result;
  }, []);
}

export function groupByMonthMagnitude(data: any): any {
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
