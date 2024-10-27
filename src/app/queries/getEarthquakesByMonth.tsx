import { useQuery } from "react-query";
import { getEarthquakeData } from "./getEarthquakeData";
import { getDateOneMonthAgo } from "../utils/getDateOneMonthAgo";
import { getCurrentDateTime } from "../utils/getCurrentDataTime";

const dateOneMonthAgo = getDateOneMonthAgo();
const currentDate = getCurrentDateTime();

export const earthquakesInLastMonthQuery = `?format=geojson&starttime=${dateOneMonthAgo}&endtime=${currentDate}`;
