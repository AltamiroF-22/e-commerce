"use client";

import UseLoginModal from "@/app/hooks/useLogingModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import Modal from "./Modal";

const LoginModal = () => {
  const loginModal = UseLoginModal();

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
    console.log("credentials", {
      ...data,
    });
  };

  const body = (
    <div className="flex flex-col gap-3">
      <Input
        id="email"
        label="Email"
        type="e-mail"
        register={register("email", {
          required: "Email is required!",
          minLength: {
            value: 9,
            message: "Email must be at least 9 characters long!",
          },
        })}
        errors={errors}
        required
      />

      <Input
        id="password"
        type="password"
        label="Password"
        register={register("password", {
          required: "Password is required!",
          minLength: {
            value: 10,
            message: "Password must be at least 10 characters long!",
          },
        })}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Modal
        title="Login"
        onClose={loginModal.onClose}
        buttonLabel="Submit"
        isOpen={loginModal.isOpen}
        body={body}
        onSubmit={handleSubmit(onSubmit)}
      />
    </main>
  );
};

export default LoginModal;
