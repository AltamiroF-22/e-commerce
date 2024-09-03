import { create } from "zustand";

interface AvatarModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const UseAvatarModal = create<AvatarModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default UseAvatarModal;
