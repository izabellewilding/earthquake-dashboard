import { convertEpochToMonthYear } from "./ConvertEpochToYearMonth";
import { Earthquake } from "../types/types";

interface GroupedChartData {
  label: string;
  value: number;
}

export function groupMonthData(
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

export function groupCountryData(
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
