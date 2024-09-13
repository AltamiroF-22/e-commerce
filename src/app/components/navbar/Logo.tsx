"use client";

import { useRouter } from "next/navigation";

interface LogoProps {
  smallLogo?: boolean;
  smallLogoWW?: boolean;
  bigLogo?: boolean;
  bigLogoWW?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  smallLogo,
  smallLogoWW,
  bigLogo,
  bigLogoWW,
}) => {
  const router = useRouter();

  return (
    <>
      {bigLogo && (
        <h1
          onClick={() => router.push("/")}
          className="text-md md:text-xl lg:text-2xl font-bold cursor-pointer hover:opacity-60 transition"
        >
          WardrobeWonders
        </h1>
      )}
      {bigLogoWW && (
        <h1
          onClick={() => router.push("/")}
          className="text-2xl font-bold cursor-pointer hover:opacity-60 transition"
        >
          WW
        </h1>
      )}
    </>
  );
};

export default Logo;
