import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "../client";

export function useGetRecipe(id: string) {
  return useQuery({
    queryKey: ["recipes", id],
    queryFn: () => getRecipe(id),
  });
}
