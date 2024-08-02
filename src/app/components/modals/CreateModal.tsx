"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import Modal from "./Modal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import UseCreateModal from "@/app/hooks/useCreateModal";
import axios from "axios";
import UseLoginModal from "@/app/hooks/useLogingModal";

const CreateModal = () => {
  const createModal = UseCreateModal();
  const loginModal = UseLoginModal();

  const router = useRouter();

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post("api/register", data)
      .then(() => {
        toast.success("User created!");
        createModal.onClose();
        loginModal.onOpen();
      })
      .catch(() => {
        toast.error("Something went wrong!");
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Modal
        title="Create User"
        onClose={createModal.onClose}
        buttonLabel="Submit"
        isOpen={createModal.isOpen}
        body={body}
        onSubmit={handleSubmit(onSubmit)}
      />
    </main>
  );
};

export default CreateModal;
