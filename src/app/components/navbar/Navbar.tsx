"use client";

import { useEffect, useState } from "react";
import Links from "./link";
import Logo from "./Logo";
import MenuOptions from "./MenuOptions";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [navBorder, setNavBorder] = useState<boolean>(false);

  useEffect(() => {
    const closeMenuOnScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 200) {
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
        navBorder ? "border-b shadow-sm" : ""
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
          <Links label="trancking" path="/tracking" currentUser={currentUser} />
          <Links label="wishlist" path="/wishlist" currentUser={currentUser} />
        </ul>

        <Logo bigLogo />

        <MenuOptions currentUser={currentUser} />
      </div>
    </nav>
  );
};

export default Navbar;
