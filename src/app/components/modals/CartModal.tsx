"use client";

import useCartModal from "@/app/hooks/useCartModal";
import Colors from "@/app/product-detail/[id]/components/Colors";
import Image from "next/image";
import { useState } from "react";
import { FiX } from "react-icons/fi";

const CartModal = () => {
  const cartComponent = useCartModal();
  const [quantity, setQuantity] = useState<number>(1);

  if (!cartComponent.isOpen) {
    return null;
  }

  return (
    <main className=" z-[2] fixed h-[100dvh] w-full bg-zinc-950/40  flex justify-end mt-20">
      <div
        style={{ maxHeight: "calc(100dvh - 5em)" }}
        className={`overflow-y-auto overflow-x-hidden duration-300 `}
      >
        <aside
          style={{ minHeight: "calc(100dvh - 5em)" }}
          className=" w-[100vw] md:w-[70dvw] xl:w-[40dvw] flex flex-col gap-3 bg-white p-4 pt-6"
        >
          <nav className="flex items-center w-full justify-between pt-2 mb-6 pb-4 ">
            <h1 className="text-zinc-950 text-base">Shopping Cart</h1>
            <button
              onClick={() => cartComponent.onClose()}
              className="flex items-center justify-center transition text-zinc-950 hover:text-zinc-600"
            >
              <FiX className="text-2xl " />
              <p className="sr-only">close</p>
            </button>
          </nav>

          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <div className="relative xl:h-[10dvw] xl:w-[10dvw]">
                <Image
                  src={
                    "https://i.pinimg.com/564x/84/bd/ab/84bdab758e4995a73261ede705d1cec0.jpg"
                  }
                  fill
                  alt="product-image"
                  className=" object-cover object-center aspect-square"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div className="">
                  <h2 className=" text-zinc-900 mb-1 ">Nomad Tumber</h2>
                  <div className="flex gap-2 items-center">
                    <p className="text-zinc-600 text-sm">Color</p>
                    <div
                      style={{ background: "#fff" }}
                      className="w-5 h-5 rounded-full border"
                    ></div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">In stock</p>
              </div>
            </div>
            <div className="">
              <select
                value={quantity}
                className="border rounded-md p-1"
                onChange={(e) => setQuantity(Number(e.target.value))}
                name="quantity"
                id="quantity"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
            <div className="">${quantity * 35}</div>
          </div>
          <p className="bg-orange-400 h-[24dvh]">cart</p>
          <p className="bg-orange-400 h-[24dvh]">cart</p>
          <p className="bg-orange-400 h-[24dvh]">cart</p>
          <p className="bg-orange-400 h-[24dvh]">cart</p>
          <p className="bg-orange-400 h-[24dvh]">cart</p>
          <p className="bg-orange-400 h-[24dvh]">cart</p>
        </aside>
      </div>
    </main>
  );
};

export default CartModal;
