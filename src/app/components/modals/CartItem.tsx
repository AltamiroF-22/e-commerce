"use client";

import Image from "next/image";
import { FiMinusCircle } from "react-icons/fi";
import { useState } from "react";

interface CartItemProps {
  id: string;
  imageSrc: string;
  productColor: string;
  productSize: string;
  productTitle: string;
  productId: string;
  productQuantity: number;
  ProductPrice: number;
  remove: (cartId: string) => void;
  onQuantityChange?: (productId: string, newQuantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  imageSrc,
  remove,
  productColor,
  productSize,
  productTitle,
  productId,
  productQuantity,
  ProductPrice,
  id,
  onQuantityChange,
}) => {
  const [localQuantity, setLocalQuantity] = useState<number>(productQuantity);

  const setQuantity = async (quantity: number) => {
    try {
      const response = await fetch(`/api/cart`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const data = await response.json();
      console.log("Quantity updated successfully:", data);

      // Atualiza a quantidade localmente e chama a função de callback
      setLocalQuantity(quantity);
      if (!onQuantityChange) return;
      onQuantityChange(productId, quantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className="relative w-full flex items-center justify-between gap-2">
      <div className="flex gap-2">
        <div className="relative h-[30dvw] w-[30dvw]  md:h-[17dvw] md:w-[17dvw]  xl:h-[10dvw] xl:w-[10dvw]">
          <Image
            src={imageSrc}
            fill
            alt="product-image"
            className="object-cover object-center aspect-square"
          />
        </div>
        <div className="flex flex-col justify-between">
          <button
            onClick={() => remove(id)}
            className="absolute left-1 top-1 transition text-zinc-900 hover:text-rose-600"
          >
            <FiMinusCircle />
            <p className="sr-only">remove</p>
          </button>
          <div>
            <h2 className="text-zinc-900 mb-1">
              {productTitle.length > 14
                ? `${productTitle.slice(0, 14)}...`
                : productTitle}
            </h2>
            <div className="flex gap-2 items-center">
              <p className="text-zinc-600 text-sm">Color:</p>
              <div
                style={{ background: productColor }}
                className="w-5 h-5 rounded-full border"
              ></div>
              <p className="text-zinc-600 text-sm">
                Size: {productSize.toLocaleUpperCase()}
              </p>
            </div>
          </div>
          <p className="text-slate-600 text-sm">In stock</p>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between h-[30dvw] md:h-[17dvw] xl:h-[10dvw]">
        <select
          value={localQuantity}
          className="border rounded-md p-1 cursor-pointer"
          onChange={(e) => setQuantity(Number(e.target.value))}
          name={productId}
          id={productId}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
        <p className="text-sm">${(localQuantity * ProductPrice).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
