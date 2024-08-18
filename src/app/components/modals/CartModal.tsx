"use client";

import useCartModal from "@/app/hooks/useCartModal";
import Image from "next/image";
import { useState } from "react";
import { FiMinusCircle, FiX } from "react-icons/fi";

const CartModal = () => {
  const cartComponent = useCartModal();
  const [quantity, setQuantity] = useState<number>(1);

  if (!cartComponent.isOpen) {
    return null;
  }

  return (
    <main className=" z-[4] fixed h-[100dvh] w-full bg-zinc-950/40  flex justify-end mt-20">
      <div
        style={{ maxHeight: "calc(100dvh - 5em)" }}
        className={`overflow-y-auto overflow-x-hidden`}
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

          <div className=" relative w-full flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <div className="relative h-[30dvw] w-[30dvw]  md:h-[17dvw] md:w-[17dvw]  xl:h-[10dvw] xl:w-[10dvw]">
                <Image
                  src={
                    "https://res.cloudinary.com/dxmehwz3f/image/upload/v1722911043/w3icxp1ov50iw9nfp7vc.webp"
                  }
                  fill
                  alt="product-image"
                  className=" object-cover object-center aspect-square"
                />
              </div>
              <div className="flex flex-col justify-between">
                <button className=" absolute left-1 top-1 transition text-zinc-900 hover:text-rose-600">
                  <FiMinusCircle />
                  <p className="sr-only">remove</p>
                </button>
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
            <div className="flex flex-col-reverse justify-between h-[30dvw]  md:h-[17dvw] xl:h-[10dvw]">
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
              <p className="">${quantity * 35 /** toFixed(2) */}</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CartModal;
