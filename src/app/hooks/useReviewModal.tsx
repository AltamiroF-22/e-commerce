import { create } from "zustand";

interface ReviewModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReviewModal = create<ReviewModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReviewModal;
