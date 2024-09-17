"use client";

import TextArea from "@/app/components/inputs/TextArea";
import Modal from "@/app/components/modals/Modal";
import useReviewModal from "@/app/hooks/useReviewModal";
import SetBodyHiddenInPopUps from "@/app/utils/SetBodyHiddenInPopUps";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const ReviewModal = () => {
  const reviewModal = useReviewModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(3);

  useEffect(() => {
    SetBodyHiddenInPopUps(reviewModal.isOpen);
  }, [reviewModal.isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    alert(`Rating: ${rating + 1}, Comment: ${data.comment}`);
  };

  const handleReviewClose = () => {
    reviewModal.onClose();
  };

  const body = (
    <div className="">
      <div className="">
        <p className="text-sm">Rate the product</p>
        <div className="flex mb-6">
          {[0, 1, 2, 3, 4].map((star) => (
            <StarIcon
              key={star}
              className={`cursor-pointer transition ${
                star <= (rating ?? -1) ? "text-zinc-950" : "text-zinc-400"
              } hover:text-yellow-500`}
              onClick={() => setRating(star === rating ? -1 : star)}
              height={26}
              width={26}
            />
          ))}
        </div>
      </div>
      <TextArea
        label="What do you think of this product?"
        id="comment"
        register={register("comment", {
          required: "How can you send a review without a review? 😄",
          minLength: {
            value: 10,
            message: "At least 10 characters!",
          },
        })}
        errors={errors}
      />
    </div>
  );

  return (
    <Modal
      title="Add Review"
      buttonLabel="Submit"
      onClose={handleReviewClose}
      isOpen={reviewModal.isOpen}
      disable={isLoading}
      body={body}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default ReviewModal;
