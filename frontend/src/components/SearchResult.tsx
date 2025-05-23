import { type Key } from "react";
import RecipeCard from "./RecipeCard";
import { useGetQuery } from "../hooks/useGetQuery";

type SearchResultProps = {
  query: string;
};

export default function SearchResult({ query }: SearchResultProps) {
  const { data, isPending, error } = useGetQuery(query);

  if (isPending)
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen text-lg text-gray-500 px-4">
        Loading recipes...
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-center text-lg text-red-500 px-4">
        No recipes found for "{query}".
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-center text-lg text-gray-600 px-4">
        No recipes found for "{query}".
      </div>
    );

  return (
    <div className="py-8">
      <h1 className="text-5xl text-[#252422] text-center font-semibold mb-20">
        Search results for "{query}"
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
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
  );
}
