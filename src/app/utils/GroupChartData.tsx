import { convertEpochToMonthYear } from "./ConvertEpochToYearMonth";
import { Earthquake } from "../types/types";
import { getLastWord } from "./getLastWord";
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

export function groupBy(arr: any, key: any) {
  return arr.reduce((result: any, obj: any) => {
    const label = obj.properties.place;

    // If the key doesn't exist in the result, initialize an empty array
    if (!result[label]) {
      result[label] = [];
    }

    // Push the current object into the array corresponding to the key
    result[label].push(obj);

    return result;
  }, {});
}
