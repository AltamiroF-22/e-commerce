"use client";

import { createContext, useContext, useState, useEffect } from "react";
import getCartItems from "@/app/actions/getCartItems";

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

interface CartContextProps {
  cartItems: CartItemsProps[];
  updateCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemsProps[]>([]);

  const updateCart = async () => {
    const items = await getCartItems();
    setCartItems(items || []);
  };

  useEffect(() => {
    updateCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
