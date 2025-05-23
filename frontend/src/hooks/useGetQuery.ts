import { useQuery } from "@tanstack/react-query";
import { getQuery } from "../client";

export function useGetQuery(query: string) {
  return useQuery({
    queryKey: ["recipes", query],
    queryFn: () => getQuery(query),
  });
}
