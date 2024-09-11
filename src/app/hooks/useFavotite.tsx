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

      if (!currentUser) return loginModal.onOpen();

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${ProductId}`);
        } else {
          request = () => axios.post(`/api/favorites/${ProductId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (errr) {
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
