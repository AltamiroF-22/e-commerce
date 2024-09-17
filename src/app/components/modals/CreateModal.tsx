"use client";

import axios from "axios";
import Input from "../inputs/Input";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import UseCreateModal from "@/app/hooks/useCreateModal";
import UseLoginModal from "@/app/hooks/useLogingModal";
import { useEffect, useState } from "react";
import SetBodyHiddenInPopUps from "@/app/utils/SetBodyHiddenInPopUps";

const CreateModal = () => {
  const createModal = UseCreateModal();
  const loginModal = UseLoginModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    SetBodyHiddenInPopUps(createModal.isOpen);
  }, [createModal.isOpen]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("api/register", data)
      .then(() => {
        toast.success("User created!");
        createModal.onClose();
        loginModal.onOpen();
      })
      .catch((error: any) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const body = (
    <div className="flex flex-col gap-3">
      <Input
        id="name"
        required
        label="Name*"
        register={register("name", {
          required: "Name is required!",
          minLength: {
            value: 5,
            message: "Name must be at least 5 characters long!",
          },
        })}
        errors={errors}
      />
      <Input
        id="email"
        type="email"
        required
        label="Email*"
        register={register("email", {
          required: "Email is required!",
          minLength: {
            value: 9,
            message: "Email must be at least 9 characters long!",
          },
        })}
        errors={errors}
      />
      <Input
        id="password"
        type="password"
        label="Password*"
        required
        register={register("password", {
          required: "Password is required!",
          minLength: {
            value: 10,
            message: "Password must be at least 10 characters long!",
          },
        })}
        errors={errors}
      />
    </div>
  );

  return (
    <Modal
      title="Create User"
      onClose={createModal.onClose}
      buttonLabel="Submit"
      isOpen={createModal.isOpen}
      body={body}
      disable={isLoading}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default CreateModal;
