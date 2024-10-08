"use client";

import { useEffect, useState } from "react";
import Links from "./link";
import Logo from "./Logo";
import MenuOptions from "./MenuOptions";
import { SafeUser } from "@/app/types";
import { RiShoppingBagLine } from "react-icons/ri";
import useCartModal from "@/app/hooks/useCartModal";
import { useCart } from "@/app/context/CartContex";
import { usePathname } from "next/navigation";
import { AiOutlineWallet } from "react-icons/ai";

interface NavbarProps {
  currentUser: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [navBorder, setNavBorder] = useState<boolean>(false);
  const cartmodal = useCartModal();
  const pathname = usePathname();

  // não ta att auto
  const { cartItems } = useCart();

  const handleToggleCartModal = () => {
    if (cartmodal.isOpen) return cartmodal.onClose();
    cartmodal.onOpen();
  };

  useEffect(() => {
    const closeMenuOnScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 10) {
        setNavBorder(true);
      } else {
        setNavBorder(false);
      }
    };

    window.addEventListener("scroll", closeMenuOnScroll);
    return () => {
      window.removeEventListener("scroll", closeMenuOnScroll);
    };
  }, []);

  return (
    <nav
      className={`p-5 xl:px-20  fixed w-full bg-white z-10 ${
        navBorder && "border-b shadow-sm"
      } `}
    >
      <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
        <ul className="md:flex hidden md:flex-row gap-3">
          <Links
            label="favorites"
            path="/favorites"
            currentUser={currentUser}
          />
          <Links label="orders" path="/orders" currentUser={currentUser} />
          {/* <Links label="trancking" path="/tracking" currentUser={currentUser} /> */}
          <Links label="wishlist" path="/wishlist" currentUser={currentUser} />
        </ul>

        <Logo bigLogo />

        <div className="flex items-center gap-5">
          {pathname !== "/checkout" && (
            <button
              className={`relative`}
              onClick={() => {
                currentUser && handleToggleCartModal();
              }}
            >
              {cartItems.length > 0 && (
                <div className="h-4 w-4 rounded-full top-[-8px] right-[-8px] absolute bg-black flex items-center justify-center">
                  <p className="text-[10px] text-white">{cartItems.length}</p>
                </div>
              )}

              <p className="sr-only">cart</p>
              <RiShoppingBagLine
                className={`text-zinc-800 text-2xl hover:opacity-85 transition ${
                  currentUser
                    ? ""
                    : "opacity-45 hover:opacity-45 cursor-not-allowed"
                }`}
              />
            </button>
          )}

          {pathname === "/checkout" && (
            <button className="flex gap-1 items-center justify-center">
              <p className="sr-only">wallet</p>
              <AiOutlineWallet className="text-zinc-800 text-2xl hover:opacity-85 transition" />
              <span>${currentUser?.wallet.toFixed(2) || 0.0}</span>
            </button>
          )}

          <MenuOptions currentUser={currentUser} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
