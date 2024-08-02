"use client";

import Image from "next/image";

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
      src={src || "/src/app/images/default-user-image-300x300.png"}
    />
  );
};

export default Avatar;