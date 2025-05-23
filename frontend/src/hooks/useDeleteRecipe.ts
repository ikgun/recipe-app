import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe } from "../client";

export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    retry: 3,
  });
}
