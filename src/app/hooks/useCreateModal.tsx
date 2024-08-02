import { create } from "zustand";

interface CreateModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const UseCreateModal = create<CreateModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default UseCreateModal;
