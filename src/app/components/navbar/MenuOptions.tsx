"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import MenuItem from "@/app/components/navbar/MenuItem";
import { useState } from "react";

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

  return (
    <div className="relative">
      <div
        onClick={toggleOpen}
        className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar src={currentUser?.picture} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[20vw] bg-white overflow-hidden right-0 top-12 text-sm">
          {!currentUser && (
            <>
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={loginModal.onOpen} label="Login" />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={createModal.onOpen} label="Sign up" />
              </div>
            </>
          )}
          {currentUser && (
            <>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => router.push("/create-new-product")}
                  label="New product"
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => router.push("/edit-profile")}
                  label="Edit Profile"
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => router.push("/my-products")}
                  label="My products"
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
