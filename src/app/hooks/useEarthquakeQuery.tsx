import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type UseEarthquakeQueryProps = {
  query: string;
};

export function useEarthquakeQuery({ query }: UseEarthquakeQueryProps) {
  return useQuery({
    queryKey: ["earthquakeData"],
    queryFn: async () => {
      const response = await axios.get(
        `https://earthquake.usgs.gov/fdsnws/event/1/query${query}`
      );

      const data = response.data;

      return data;
    },
  });
}
