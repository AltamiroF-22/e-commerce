import { create } from "zustand";

interface CarouselProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const UseCarousel = create<CarouselProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default UseCarousel;
