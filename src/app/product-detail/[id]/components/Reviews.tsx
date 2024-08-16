"use client";

import { StarIcon } from "@heroicons/react/16/solid";
import defaultImage from "/src/app/images/default-user-image-300x300.png";
import Image from "next/image";

interface ReviewsProps {
  reviweRating: number;
  userImage?: string;
  userName: string;
  userReview: string;
}

const Review: React.FC<ReviewsProps> = ({
  reviweRating,
  userImage,
  userName,
  userReview,
}) => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="flex">
        <div className="relative h-10 w-10">
          <Image
            src={userImage ? userImage : defaultImage}
            alt={userName + "perfil image"}
            fill
            className="object-cover object-center rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm ml-2 font-bold">{userName}</span>
          <div className="">
            <h4 className="sr-only">Reviews</h4>

            <div className="flex items-center ml-2">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  aria-hidden="true"
                  className={classNames(
                    reviweRating > rating ? "text-zinc-950" : "text-zinc-400",
                    "h-4 w-4 flex-shrink-0"
                  )}
                />
              ))}
            </div>
            <p className="sr-only">{reviweRating} out of 5 stars</p>
          </div>
        </div>
      </div>
      <p className="mt-3 ml-2 text-sm italic text-zinc-600">{userReview}</p>
    </>
  );
};

export default Review;
