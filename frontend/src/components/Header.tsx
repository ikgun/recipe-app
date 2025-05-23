import { Link } from "@tanstack/react-router";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="bg-[#252422] text-white shadow-sm p-4 sm:p-5 text-base flex flex-col sm:flex-row items-center sm:justify-between gap-4">
      
      <div className="text-xl">
        <Link to="/" className="btn btn-ghost text-xl">
          Recipes
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
        <Link to="/recipes" className="btn btn-ghost px-2">
          All recipes
        </Link>
        <Link to="/addRecipe" className="btn btn-ghost px-2">
          Add a recipe
        </Link>
      </div>

      <div className="w-full sm:w-72">
        <SearchBar />
      </div>
    </div>
  );
}
