import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe } from "../client";

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    retry: 3,
  });
}
