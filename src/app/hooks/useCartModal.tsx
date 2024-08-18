import { create } from "zustand";

interface useCartModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCartModal = create<useCartModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCartModal;
