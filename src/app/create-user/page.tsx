"use client"

import Container from "../components/Container";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/inputs/Input";

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("credentials", data);
  };
  return (
    <Container>
        <div className="">
            <h1 className="text-md my-4">Personal Information</h1>
            
        </div>
      <main>
      <Input
        id="name"
        label="First Name"
        register={register("name", {
          required: "Name is required!",
          minLength: {
            value: 9,
            message: "Name must be at least 9 characters long!",
          },
        })}
        errors={errors}
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="py-4 bg-blue-700 rounded-md hover:bg-blue-500  transition text-white"
      >
        Submit
      </button>
      </main>
    </Container>
  );
};

export default CreateUser;
