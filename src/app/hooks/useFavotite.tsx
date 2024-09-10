import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import UseLoginModal from "./useLogingModal";

interface IUseFavorite {
  ProductId: string;
  currentUser?: SafeUser | null;
}

const UseFavorite = ({ ProductId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = UseLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoritesProducts || [];

    return list.includes(ProductId);
  }, [currentUser, ProductId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        if (hasFavorited) {
          await axios.delete(`/api/favorites/${ProductId}`);
        } else {
          await axios.post(`/api/favorites/${ProductId}`);
        }

        router.refresh();
        toast.success("Success");
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    },
    [currentUser, loginModal, hasFavorited, ProductId, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default UseFavorite;
