"use client";

import { SafeUser } from "@/app/types";
import Modal from "./Modal";
import UseAvatarModal from "@/app/hooks/useAvatarModal";
import SingleImageUpload from "../inputs/SingleImageUpload";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import SetBodyHiddenInPopUps from "@/app/utils/SetBodyHiddenInPopUps";

const AvatarModal = () => {
  const avatarModalAction = UseAvatarModal();
  const router = useRouter();

  const { setValue, handleSubmit, watch } = useForm<FieldValues>({
    defaultValues: {
      AvatarSrc: "",
    },
  });

  const avatarSrc = watch("AvatarSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    SetBodyHiddenInPopUps(avatarModalAction.isOpen);
  }, [avatarModalAction.isOpen]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post("/api/user/avatar", data)
      .then(() => {
        toast.success("Avatar added");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        avatarModalAction.onClose();
      });
  };

  const body = (
    <div className="flex flex-col gap-3">
      <SingleImageUpload
        onChange={(value) => setCustomValue("AvatarSrc", value[0])}
        value={avatarSrc ? [avatarSrc] : []}
        maxfile={1}
      />
    </div>
  );
  return (
    <Modal
      body={body}
      title="Add image or Gif"
      buttonLabel="Submit"
      isOpen={avatarModalAction.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      disable={avatarSrc ? false : true}
      onClose={() => avatarModalAction.onClose()}
    />
  );
};

export default AvatarModal;
