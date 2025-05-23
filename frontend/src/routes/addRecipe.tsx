import { createFileRoute } from "@tanstack/react-router";
import { useCreateRecipe } from "../hooks/useCreateRecipe";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

export const Route = createFileRoute("/addRecipe")({
  component: AddRecipePage,
});

function AddRecipePage() {
  const mutation = useCreateRecipe();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!title || !ingredients || !instructions || !image) {
      const msg = "Please fill in all fields";
      setValidationError(msg);
      return;
    }

    mutation.mutate(
      { title, ingredients, instructions, image },
      {
        onSuccess: () => {
          toast.success("Recipe added successfully!");
          setTitle("");
          setIngredients("");
          setInstructions("");
          setImage("");
        },
      }
    );
  };

  return (
    <div className="px-4">
      <h3 className="text-5xl text-[#252422] text-center mt-10 font-semibold mb-10">
        Add new recipe
      </h3>
      <form
        className="text-black px-4 py-6 bg-white rounded-lg max-w-md mx-auto mb-10"
        onSubmit={handleSubmit}
      >
        <fieldset disabled={mutation.isPending} className="space-y-6">
          <label className="flex flex-col text-gray-700 font-medium">
            Title
            <input
              type="text"
              id="title"
              className="mt-1 border border-gray-300 rounded-md p-3 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className="flex flex-col text-gray-700 font-medium">
            Ingredients
            <textarea
              id="ingredients"
              className="mt-1 border border-gray-300 rounded-md p-3 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              placeholder="Ingredients"
              value={ingredients}
              rows={4}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </label>

          <label className="flex flex-col text-gray-700 font-medium">
            Instructions
            <textarea
              id="instructions"
              className="mt-1 border border-gray-300 rounded-md p-3 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              placeholder="Instructions"
              value={instructions}
              rows={6}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </label>

          <label className="flex flex-col text-gray-700 font-medium">
            Image URL
            <input
              type="text"
              id="image"
              className="mt-1 border border-gray-300 rounded-md p-3 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>

          {mutation.isPending && (
            <div className="flex flex-col items-center space-y-2 text-gray-600">
              <p>Loading...</p>
              <div className="w-6 h-6 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {(validationError || mutation.error) && (
            <p className="font-bold text-red-500">
              {validationError
                ? validationError
                : mutation.error?.message === "Failed to fetch"
                ? "Failed to create recipe"
                : mutation.error?.message}
            </p>
          )}

          <div className="flex justify-end">
            <input
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              value="Add recipe"
              disabled={mutation.isPending}
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
