import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import { toast } from "react-toastify";
import { useUpdateRecipe } from "../hooks/useUpdateRecipe";

interface EditRecipeModalProps {
  id: string;
  oldTitle: string;
  oldIngredients: string;
  oldInstructions: string;
  oldImage: string;
  onClose: () => void;
}

export default function EditRecipeModal({
  id,
  oldTitle,
  oldIngredients,
  oldInstructions,
  oldImage,
  onClose,
}: EditRecipeModalProps) {
  const [newTitle, setNewTitle] = useState(oldTitle);
  const [newIngredients, setNewIngredients] = useState(oldIngredients);
  const [newInstructions, setNewInstructions] = useState(oldInstructions);
  const [newImage, setNewImage] = useState(oldImage);
  const [validationError, setValidationError] = useState("");
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const mutation = useUpdateRecipe();

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!newTitle || !newIngredients || !newInstructions || !newImage) {
      setValidationError("Please fill in all fields");
      return;
    }

    mutation.mutate(
      {
        id,
        title: newTitle,
        ingredients: newIngredients,
        instructions: newInstructions,
        image: newImage,
      },
      {
        onSuccess: () => {
          toast.success("Recipe updated successfully!");
          dialogRef.current?.close();
          onClose();
        },
      }
    );
  };

  const handleCancel = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box max-h-[90vh] bg-white rounded-lg shadow-lg relative">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        <h3 className="text-2xl  text-[#252422] text-center font-semibold mb-6">
          Edit Recipe
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
     
          <label
            htmlFor="title"
            className="flex flex-col text-gray-700 font-medium"
          >
            Title
            <input
              type="text"
              id="title"
              className="mt-1 border border-gray-300 rounded-md p-2  text-gray-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </label>

          <label
            htmlFor="ingredients"
            className="flex flex-col text-gray-700 font-medium"
          >
            Ingredients
            <textarea
              id="ingredients"
              className="mt-1 border border-gray-300 rounded-md p-2  text-gray-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              placeholder="Ingredients"
              value={newIngredients}
              onChange={(e) => setNewIngredients(e.target.value)}
              rows={3}
            />
          </label>

          <label
            htmlFor="instructions"
            className="flex flex-col text-gray-700 font-medium"
          >
            Instructions
            <textarea
              id="instructions"
              className="mt-1 border border-gray-300 rounded-md p-2 text-gray-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              placeholder="Instructions"
              value={newInstructions}
              onChange={(e) => setNewInstructions(e.target.value)}
              rows={3}
            />
          </label>

          <label
            htmlFor="image"
            className="flex flex-col text-gray-700 font-medium"
          >
            Image URL
            <input
              type="text"
              id="image"
              className="mt-1 border border-gray-300 rounded-md p-2 text-gray-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              placeholder="URL"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
            />
          </label>

          {(validationError || mutation.error) && (
            <p className="font-bold text-red-500 text-sm">
              {validationError
                ? validationError
                : mutation.error?.message === "Failed to fetch"
                  ? "Failed to update recipe"
                  : mutation.error?.message}
            </p>
          )}

          <div className="flex flex-col sm:flex-row justify-end sm:gap-4 gap-2 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
