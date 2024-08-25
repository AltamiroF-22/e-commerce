"use client";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import MenuItem from "@/app/components/navbar/MenuItem";
import { useEffect, useState } from "react";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import UseLoginModal from "@/app/hooks/useLogingModal";
import UseCreateModal from "@/app/hooks/useCreateModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = UseLoginModal();
  const createModal = UseCreateModal();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };

  useEffect(() => {
    const closeMenuOnScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", closeMenuOnScroll);
    return () => {
      window.removeEventListener("scroll", closeMenuOnScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div
        onClick={toggleOpen}
        className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
      >
        {!isOpen ? <AiOutlineMenu /> : <AiOutlineClose />}
        <div className="hidden md:block">
          <Avatar src={currentUser?.picture} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md md:w-[20vw] w-[91dvw] bg-white overflow-hidden right-0  top-14 text-sm">
          {!currentUser && (
            <>
              <div
                onClick={() => router.push("/")}
                className="flex flex-col cursor-pointer"
              >
                <MenuItem onClick={loginModal.onOpen} label="Login" />
              </div>
              <div
                onClick={() => router.push("/")}
                className="flex flex-col cursor-pointer"
              >
                <MenuItem onClick={createModal.onOpen} label="Sign up" />
              </div>
            </>
          )}
          {currentUser && (
            <>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => {
                    router.push("/create-new-product");
                    toggleOpen();
                  }}
                  label="New product"
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => {
                    router.push("/edit-profile");
                    toggleOpen();
                  }}
                  label="Edit Profile"
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => {
                    router.push("/my-products");
                    toggleOpen();
                  }}
                  label="My products"
                />
              </div>
              <div className="flex md:hidden flex-col cursor-pointer">
                <MenuItem
                  onClick={() => {
                    router.push("/favorites");
                    toggleOpen();
                  }}
                  label="Favorites"
                />
              </div>
              <div className="flex md:hidden flex-col cursor-pointer">
                <MenuItem
                  onClick={() => {
                    router.push("/orders");
                    toggleOpen();
                  }}
                  label="Orders"
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => {
                    router.push("/trancking");
                    toggleOpen();
                  }}
                  label="Trancking"
                />
              </div>
              <div className="flex md:hidden flex-col cursor-pointer">
                <MenuItem
                  onClick={() => {
                    router.push("/wishlist");
                    toggleOpen();
                  }}
                  label="Wishlist"
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => {
                    router.push("/wallet");
                    toggleOpen();
                  }}
                  label={`+ $${currentUser.wallet.toFixed(2)}`}
                />
              </div>

              <hr />
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={() => signOut()} label="logout" />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
