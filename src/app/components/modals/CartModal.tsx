"use client";

import useCartModal from "@/app/hooks/useCartModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import CartItem from "./CartItem";
import toast from "react-hot-toast";
import getCartItems from "@/app/actions/getCartItems";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface CartItemsProps {
  colorId: string;
  colorName: string;
  sizeId: string;
  sizeName: string;
  userId: string;
  id: string;
  productId: string;
  productImage: string;

  productPrice: number;
  productQuantity: number;

  product: {
    category?: string;
    title: string;
  };
}

const CartModal = ({ currentUser }: { currentUser: SafeUser }) => {
  const cartComponent = useCartModal();
  const [CartItems, setCartItems] = useState<CartItemsProps[]>([]);
  const [opSelected, setOpSelected] = useState<number | null>(0);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) return;

    const fetchCartItems = async () => {
      setOpSelected(null);
      const getCartItem = await getCartItems();
      setCartItems(getCartItem);
    };

    if (cartComponent.isOpen) {
      fetchCartItems();
    }
  }, [currentUser, cartComponent.isOpen, opSelected]);

  if (!cartComponent.isOpen || !currentUser) {
    return null;
  }

  const subTotal = CartItems.reduce(
    (accumulator: number, item: CartItemsProps) => {
      return accumulator + item.productPrice * item.productQuantity;
    },
    0
  );

  const shipping = (subTotal / 8) * 0.75;

  const handleDeleteCartItem = async (productId: string) => {
    try {
      const response = await axios.delete("/api/cart", {
        data: { productId },
      });

      if (response.status === 200) {
        toast.success("Item removed successfully");
        setCartItems(CartItems.filter((item) => item.id !== productId));
      }
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  return (
    <main className=" z-[4] fixed h-[100dvh] w-full bg-zinc-950/40  flex justify-end mt-20">
      <div
        style={{ maxHeight: "calc(100dvh - 5em)" }}
        className={`overflow-y-auto overflow-x-hidden`}
      >
        <aside
          style={{ minHeight: "calc(100dvh - 5em)" }}
          className=" w-[100vw] md:w-[70dvw] xl:w-[40dvw] flex flex-col justify-between gap-3  bg-white p-4 pt-6"
        >
          <div className="flex flex-col gap-4 mb-6">
            <nav className="flex items-center w-full justify-between py-6 sticky top-0 z-10 border-b bg-white ">
              <h1 className="text-zinc-950 text-base">Shopping Cart</h1>
              <button
                onClick={() => cartComponent.onClose()}
                className="flex items-center justify-center transition text-zinc-950 hover:text-zinc-600"
              >
                <FiX className="text-xl " />
                <p className="sr-only">close</p>
              </button>
            </nav>
            {CartItems.length === 0 ? (
              <div
                style={{ minHeight: "calc(100dvh - 15em)" }}
                className="flex flex-col items-center justify-center"
              >
                <p className="text-base text-zinc-900 text-center">
                  You don't have products in your cart yet
                </p>
                <p
                  className="text-sm cursor-pointer text-zinc-700 transition hover:underline"
                  onClick={() => cartComponent.onClose()}
                >{`Go shopping`}</p>
              </div>
            ) : (
              <div
                style={{ minHeight: "calc(100dvh - 15em)" }}
                className="flex flex-col justify-between"
              >
                <div className="">
                  {CartItems.map((item) => (
                    <>
                      <CartItem
                        key={item.id}
                        id={item.id}
                        imageSrc={item.productImage}
                        productId={item.productId}
                        productColor={item.colorName}
                        productSize={item.sizeName}
                        productQuantity={item.productQuantity}
                        productTitle={item.product.title}
                        ProductPrice={item.productPrice}
                        opSelected={(op) =>
                          setOpSelected(op * item.productPrice)
                        }
                        remove={(productId) => {
                          handleDeleteCartItem(productId);
                        }}
                      />
                      <hr className="my-4" />
                    </>
                  ))}
                </div>

                <footer>
                  <div className="w-full">
                    <div className="flex w-full justify-between gap-3">
                      <p className="text-zinc-700 text-sm">Subtotal</p>
                      <p className="text-sm">${subTotal.toFixed(2)}</p>
                    </div>
                    <hr className="my-3" />
                    <div className="flex w-full justify-between gap-3">
                      <p className="text-zinc-700 text-sm">Shipping</p>
                      <p className="text-sm">${shipping.toFixed(2)}</p>
                    </div>
                    <hr className="my-3" />
                    <div className="flex w-full justify-between gap-3">
                      <p className="text-zinc-700 text-sm">Total</p>
                      <p className="text-sm">
                        ${(subTotal + shipping).toFixed(2)}
                      </p>
                    </div>
                    <hr className="my-3" />
                  </div>
                  <div className="w-full text-center">
                    <button
                      onClick={() => {
                        router.push("/checkout"), cartComponent.onClose();
                      }}
                      className="p-3 bg-zinc-950 text-white w-full mb-2 hover:opacity-90 transition"
                    >
                      Checkout
                    </button>
                    <p className="text-zinc-600 text-sm">
                      or{" "}
                      <span
                        onClick={() => cartComponent.onClose()}
                        className="text-zinc-950 transition hover:underline cursor-pointer"
                      >
                        Continue Shopping
                      </span>
                    </p>
                  </div>
                </footer>
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CartModal;
