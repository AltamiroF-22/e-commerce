"use client";

import Image from "next/image";
import Container from "./Container";
import etoAnimeGirl from "@/app/assets/images/gif/eto-anime-girl.gif";
import spongebobPatrick from "@/app/assets/images/gif/spongebob-patrick.gif";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TemporaryToBuildingPages = () => {
  const [showSpongebob, setShowSpongebob] = useState(false);
  const router = useRouter();

  return (
    <Container>
      <div className="h-full w-full flex items-center flex-col justify-center">
        <h1 className=" font-semibold text-zinc-900">
          I didn&apos;t build this page yet!
        </h1>
        <div className="flex items-center gap-2 justify-center">
          <p className="text-zinc-600">Continue exploring...</p>
          <button
            onClick={() => router.back()}
            className="text-blue-600 font-semibold transition hover:underline"
          >
            Back to the last page.
          </button>
        </div>
        <div
          onClick={() => setShowSpongebob((prev) => !prev)}
          className="relative w-[30vw] h-[30vw] cursor-pointer"
        >
          <Image
            src={showSpongebob ? spongebobPatrick : etoAnimeGirl}
            fill
            className="aspect-square object-center object-cover"
            alt={
              showSpongebob ? "Spongebob and Patrick GIF" : "Eto Anime Girl GIF"
            }
          />
        </div>
      </div>
    </Container>
  );
};

export default TemporaryToBuildingPages;