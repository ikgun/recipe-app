import { Link } from "@tanstack/react-router";
import { useDeleteRecipe } from "../hooks/useDeleteRecipe";
import { toast } from "react-toastify";
import type { FormEvent } from "react";

type RecipeCardProps = {
  id: string;
  title: string;
  image: string;
};

export default function RecipeCard({ id, title, image }: RecipeCardProps) {
  const mutation = useDeleteRecipe();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutation.mutate(id, {
      onSuccess: () => {
        toast.success("Recipe deleted successfully!");
      },
    });
  };

  return (
    <div className="bg-[#252422] w-80 max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-lg overflow-hidden flex flex-col mx-auto">
      <img
        src={image}
        alt={title}
        className="w-full h-48 sm:h-52 object-cover"
      />

      <div className="flex flex-col p-4">
        <h2 className="text-lg text-center font-semibold text-white mb-3">
          {title}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="pt-2 flex flex-col sm:flex-row gap-2 justify-center"
        >
          <Link
            to={"/$id"}
            params={{ id }}
            className="text-center bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded-lg transition"
          >
            Read more
          </Link>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="cursor-pointer flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}