import { createFileRoute, useParams } from "@tanstack/react-router";
import { useGetRecipe } from "../hooks/useGetRecipe";
import { useState, type Key } from "react";
import EditRecipeModal from "../components/EditRecipeModal";

export const Route = createFileRoute("/$id")({
  component: RecipePage,
});

function RecipePage() {
  const { id } = useParams({ from: "/$id" });
  const { data, isLoading, error } = useGetRecipe(id);
  const [showEditRecipe, setShowEditRecipe] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <p className="text-lg text-gray-600 text-center">Loading recipe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <p className="text-lg text-red-500 text-center">
          Error: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-56 object-cover rounded-xl mb-6"
      />

      <h1 className="text-2xl font-bold text-[#252422] mb-4">
        {data.title}
      </h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Ingredients
        </h2>
        <ul className="list-disc list-inside text-gray-600 text-sm">
          {data.ingredients.split(",").map((item: string, index: Key) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Instructions
        </h2>
        <p className="text-gray-600 text-sm ">
          {data.instructions}
        </p>
      </section>

      <button
        className="mt-6 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded-lg transition"
        onClick={() => setShowEditRecipe(true)}
        type="button"
      >
        Edit Recipe
      </button>

      {showEditRecipe && (
        <EditRecipeModal
          id={id}
          oldTitle={data.title}
          oldIngredients={data.ingredients}
          oldInstructions={data.instructions}
          oldImage={data.image}
          onClose={() => setShowEditRecipe(false)}
        />
      )}
    </div>
  );
}
