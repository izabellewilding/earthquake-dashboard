import { useQuery } from "react-query";
import axios from "axios";

export function useEarthquakeQuery() {
  return useQuery({
    queryKey: ["earthquakeData"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2023-01-02&minmagnitude=6.0"
        );

        const data = response.data;

        return data;
      } catch (error) {
        throw error;
      }
    },
  });
}
