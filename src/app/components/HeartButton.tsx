"use client";

import UseFavorite from "../hooks/useFavotite";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  ProductId: string;
  currentUser?: SafeUser | null | undefined;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  ProductId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = UseFavorite({
    ProductId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />

      <AiFillHeart
        size={24}
        className={hasFavorited ? `fill-rose-500` : `fill-neutral-700/70`}
      />
    </div>
  );
};

export default HeartButton;
