"use client";

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface LinkProps {
  currentUser: SafeUser | null 
  label: string;
  path: string;
}

const Links: React.FC<LinkProps> = ({ currentUser, label, path }) => {
  const router = useRouter();

  return (
    <li
      className={`${
        currentUser !== null
          ? "cursor-pointer hover:opacity-85 transition"
          : "cursor-not-allowed text-gray-300"
      }`}
      onClick={() => currentUser !== null && router.push(path)}
    >
      {label}
    </li>
  );
};

export default Links;
