"use client";

import UseCarousel from "@/app/hooks/useCarousel";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { use, useEffect, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

const Carousel = ({ images, index }: { images: string[]; index: number }) => {
  const useCarousel = UseCarousel();
  const [currentIndex, setCurrentIndex] = useState(index);
  const [zoom, setZoom] = useState<boolean>(false);

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

  const handleToggleZoom = () => {
    setZoom(!zoom);
  };

  useEffect(() => {
    const escCloseCarousel = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleCloseCarousel();
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrev();
    };
  
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
  
    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    };
  
    const handleTouchMove = (event: TouchEvent) => {
      touchEndX = event.touches[0].clientX;
      touchEndY = event.touches[0].clientY;
    };
  
    const handleTouchEnd = () => {
      const horizontalSwipeThreshold = 50;
      const verticalSwipeThreshold = 100;
  
      if (touchStartX - touchEndX > horizontalSwipeThreshold) {
        // Swiped left
        handleNext();
      } else if (touchEndX - touchStartX > horizontalSwipeThreshold) {
        // Swiped right
        handlePrev();
      }
  
      if (touchStartY - touchEndY > verticalSwipeThreshold) {
        // Swiped up, fecha o carrossel
        handleCloseCarousel();
      }
    };
  
    document.addEventListener("keydown", escCloseCarousel);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  
    return () => {
      document.removeEventListener("keydown", escCloseCarousel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [useCarousel, handleNext, handlePrev, handleCloseCarousel]);
  

  return (
    <div className="h-[100dvh] w-[100dvw] top-0 bg-white z-30 flex items-center justify-center fixed">
      <button
        onClick={handleCloseCarousel}
        className="absolute z-50 right-2 top-2  xl:right-10 xl:top-5 hover:text-zinc-950 transition text-zinc-500"
      >
        <p className="sr-only">close</p>
        <HiOutlineXMark className=" text-xl xl:text-3xl" />
      </button>
      <div className="flex justify-center items-center h-[90dvh]  xl:h-[45dvh] relative">
        <button
          className="h-full hidden xl:flex items-center px-5 focus:border-none focus:outline-none hover:translate-x-[-10px] transition  text-zinc-400 hover:text-zinc-950"
          onClick={handlePrev}
        >
          <p className="sr-only">Previus</p>

          <IoIosArrowBack className="text-xl xl:text-4xl" />
        </button>

        <div className="relative w-[90dvw] h-[85dvh] xl:w-[60dvw] xl:h-[40dvw] flex justify-center items-center">
          <Image
            onClick={handleToggleZoom}
            className={`object-center  ${
              zoom
                ? "cursor-zoom-out object-cover"
                : "cursor-zoom-in object-contain"
            }`}
            src={images[currentIndex]}
            alt={`Image ${currentIndex}`}
            fill
          />
        </div>

        <button
          className="h-full px-5 hidden xl:flex items-center focus:border-none focus:outline-none hover:translate-x-[10px] transition text-zinc-400 hover:text-zinc-950"
          onClick={handleNext}
        >
          <p className="sr-only">Next</p>

          <IoIosArrowForward className="text-xl xl:text-4xl " />
        </button>
      </div>
      <p className="w-full text-center absolute bottom-3">
        {currentIndex + 1}/{images.length}
      </p>
    </div>
  );
};

export default Carousel;
