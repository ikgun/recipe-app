import type { Key } from "react";
import { useGetAll } from "../hooks/useGetAll";
import { createFileRoute } from "@tanstack/react-router";
import RecipeCard from "../components/RecipeCard";

export const Route = createFileRoute("/recipes")({
  component: AllRecipesPage,
});

function AllRecipesPage() {
  const { data, isPending, error } = useGetAll();

  return (
    <>
      <h1 className="text-5xl text-[#252422] text-center mt-10 mb-8 font-semibold px-4">
        All Recipes
      </h1>

      {isPending && (
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-300 px-4">
          <p className="text-lg mb-4">Loading recipes...</p>
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-300 px-4 text-center">
          <p className="text-lg mb-4">
            {error.message === "Failed to fetch"
              ? "Failed to fetch recipes"
              : error.message}
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 place-items-center">
          {data?.map(
            (
              recipe: {
                id: string;
                title: string;
                ingredients: string;
                instructions: string;
                image: string;
              },
              index: Key
            ) =>
              recipe?.id ? (
                <RecipeCard
                  key={index}
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                />
              ) : null
          )}
        </div>
      </div>
    </>
  );
}
