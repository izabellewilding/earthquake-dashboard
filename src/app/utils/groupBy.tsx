import { getWordsAfterLastComma } from "./getWordsAfterLastComma";

export function groupBy(arr: []) {
  return arr.reduce((result: any, obj: any) => {
    const label = getWordsAfterLastComma(obj.properties.place);
    if (!result[label]) {
      result[label] = [];
    }

    // Push the current object into the array corresponding to the key
    result[label].push(obj);

    return result;
  }, {});
}
