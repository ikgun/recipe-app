import { useQuery } from "@tanstack/react-query";
import { getAll } from "../client";

export function useGetAll() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getAll,
  });
}
