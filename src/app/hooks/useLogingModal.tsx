import { create } from "zustand";

interface LogingModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const UseLoginModal = create<LogingModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default UseLoginModal;
