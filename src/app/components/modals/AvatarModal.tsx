"use client";

import { SafeUser } from "@/app/types";
import Modal from "./Modal";
import UseAvatarModal from "@/app/hooks/useAvatarModal";
import SingleImageUpload from "../inputs/SingleImageUpload";
import { FieldValues, useForm } from "react-hook-form";

const AvatarModal = ({ currentUser }: { currentUser: SafeUser }) => {
  const avatarModalAction = UseAvatarModal();

  const { setValue, handleSubmit, watch } = useForm<FieldValues>({
    defaultValues: {
      AvatarSrc: "",
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const avatarSrc = watch("AvatarSrc");

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
      onSubmit={() => alert("enviou!")}
      disable={avatarSrc ? false : true}
      onClose={() => avatarModalAction.onClose()}
    />
  );
};

export default AvatarModal;
