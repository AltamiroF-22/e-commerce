"use client";

import UseCarousel from "@/app/hooks/useCarousel";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { use, useEffect, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

const Carousel = ({ images, index }: { images: string[]; index: number }) => {
  const useCarousel = UseCarousel();
  const [currentIndex, setCurrentIndex] = useState(index);

  useEffect(() => {
    const escCloseCarousel = () => {
      useCarousel.onClose();
    };

    document.addEventListener("keydown", escCloseCarousel);

    return () => {
      document.removeEventListener("keydown", escCloseCarousel);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCloseCarousel = () => {
    useCarousel.onClose();
  };

  return (
    <div className="h-[100dvh] w-[100dvw] top-0 bg-white z-30 flex items-center justify-center fixed">
      <button
        onClick={handleCloseCarousel}
        className="absolute z-50 right-10 top-5 hover:text-zinc-950 transition text-zinc-500"
      >
        <p className="sr-only">close</p>
        <HiOutlineXMark className="text-3xl" />
      </button>
      <div className="flex justify-center items-center h-[45dvh] relative">
        <button
          className="h-full px-5 hover:translate-x-[-10px] transition  text-zinc-400 hover:text-zinc-950"
          onClick={handlePrev}
        >
          <p className="sr-only">Previus</p>

          <IoIosArrowBack className="text-4xl" />
        </button>

        <div className="relative w-[60dvw] h-[40dvw] flex justify-center items-center">
          <Image
            className="object-center object-cover"
            src={images[currentIndex]}
            alt={`Image ${currentIndex}`}
            fill
          />
        </div>

        <button
          className="h-full px-5 hover:translate-x-[10px] transition text-zinc-400 hover:text-zinc-950"
          onClick={handleNext}
        >
          <p className="sr-only">Next</p>

          <IoIosArrowForward className="text-4xl " />
        </button>
      </div>
      <p className="w-full text-center absolute bottom-3">
        {currentIndex + 1}/{images.length}
      </p>
    </div>
  );
};

export default Carousel;
