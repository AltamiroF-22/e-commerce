"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

const CreateUser = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("api/register", data)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="grid place-content-center h-screen bg-gray-200">
      <div className="p-7 bg-white rounded-xl border-1 shadow-md w-[98vw] max-w-4xl">
        <h1 className="text-xl text-gray-800 mb-8">Personal Information</h1>

        <div className="">
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
        <button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className={`py-3 bg-blue-700 rounded-md hover:bg-blue-500 transition text-white w-full my-2 
            ${isLoading ? "cursor-not-allowed" : ""}
            ${isLoading ? " pointer-events-none" : ""}
            `}
        >
          Create user
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
