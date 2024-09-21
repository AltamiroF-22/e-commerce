"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import HeartButton from "../HeartButton";
import { SafeUser } from "@/app/types";
import { FiMinusCircle } from "react-icons/fi";

interface ProductCardProps {
  imageAlt: string;
  id: string;
  imageSrc: string;
  productName: string;
  gender: string;
  price: string;
  deleteIcon?: () => void;
  noRouterPush?: boolean;
  currentUser: SafeUser;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageAlt,
  imageSrc,
  productName,
  id,
  price,
  gender,
  currentUser,
  deleteIcon,

  noRouterPush,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        noRouterPush ? null : router.push(`/product-detail/${id}`)
      }
      className={`${
        !noRouterPush && "hover:opacity-80 transition cursor-pointer"
      } mb-5`}
    >
      <div className="aspect-square bg-contain w-full relative overflow-hidden rounded-xl ">
        <Image
          src={imageSrc}
          alt={imageAlt}
          className=" object-cover h-full w-full group-hover:scale-110 transition"
          fill
        />
        <div className="absolute top-3 right-3">
          {deleteIcon ? (
            <div className="relative cursor-pointer" onClick={deleteIcon}>
              <FiMinusCircle
                size={22}
                className="text-zinc-95 transition hover:text-red-700 absolute -top-[2px] -right-[2px]"
              />
            </div>
          ) : (
            <>
              <HeartButton
                ProductId={id}
                currentUser={currentUser as SafeUser}
              />
            </>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={id}>
              <span />
              {productName}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {gender.at(0)}
            {gender.slice(1, gender.length).toLowerCase()}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
