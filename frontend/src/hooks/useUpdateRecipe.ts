import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipe } from "../client";

export function useUpdateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    retry: 3,
  });
}
