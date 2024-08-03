"use client";

import Image from "next/image";
import defaultImage from "/src/app/images/default-user-image-300x300.png"

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height={38}
      width={38}
      alt="Avatar"
      src={src || defaultImage }
    />
  );
};

export default Avatar;