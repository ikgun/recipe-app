import { createFileRoute, Link } from "@tanstack/react-router";
import Carousel from "../components/Carousel";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <>
      <Carousel />

      <h1 className="text-[#252422] mt-12 mb-6 text-center text-3xl font-semibold px-4">
        About
      </h1>

      <p className="text-[#252422] px-4  mb-10 text-center max-w-4xl mx-auto leading-relaxed">
        Welcome to a curated collection of culinary inspirations designed to
        bring joy and flavor to your kitchen. Here, every recipe is thoughtfully
        selected to celebrate the art of cooking — from timeless classics to
        innovative creations. Whether you’re a seasoned chef or just beginning
        your culinary journey, our goal is to inspire, guide, and delight you
        with dishes crafted to nourish both body and soul. Explore, savor, and
        create unforgettable meals with us.
      </p>

      <div className="flex flex-col items-center space-y-4 mb-12 px-4 ">
        <Link
          to="/recipes"
          className="btn btn-ghost hover:text-white text-xl text-[#252422] flex items-center justify-center w-50 "
          aria-label="View all recipes"
        >
          All Recipes &rarr;
        </Link>

        <Link
          to="/addRecipe"
          className="btn btn-ghost hover:text-white text-xl text-[#252422] flex items-center justify-center w-50  "
          aria-label="Add a recipe"
        >
          Add a recipe &rarr;
        </Link>
      </div>
    </>
  );
}
