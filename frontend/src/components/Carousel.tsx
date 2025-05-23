import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import type { Key } from "react";
import { useGetAll } from "../hooks/useGetAll";

export default function Carousel() {
  const { data } = useGetAll();

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {data?.slice(0, 10).map(
          (
            recipe: {
              image: string;
            },
            index: Key
          ) => (
            <img
              key={index}
              src={recipe.image}
              alt={`Recipe ${index}`}
              className="w-full h-[300px] sm:h-[400px] object-cover opacity-70"
            />
          )
        )}
      </Slider>

      <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-xl sm:text-3xl lg:text-4xl font-bold text-[#252422] drop-shadow-lg px-4">
        Culinary Inspirations
      </p>
    </div>
  );
}
