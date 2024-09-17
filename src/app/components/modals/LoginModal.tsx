"use client";

import UseLoginModal from "@/app/hooks/useLogingModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import Modal from "./Modal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SetBodyHiddenInPopUps from "@/app/utils/SetBodyHiddenInPopUps";

const LoginModal = () => {
  const loginModal = UseLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  useEffect(() => {
    SetBodyHiddenInPopUps(loginModal.isOpen);
  }, [loginModal.isOpen]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
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
    <Modal
      title="Login"
      onClose={loginModal.onClose}
      buttonLabel="Submit"
      isOpen={loginModal.isOpen}
      body={body}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginModal;
