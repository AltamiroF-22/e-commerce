"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  type?: string;
  required?: boolean;
  label: string;
  placeholder?: string;
  register: ReturnType<UseFormRegister<FieldValues>>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  register,
  required,
  placeholder,
  errors,
  label,
}) => {
  const errorMessage = errors[id]?.message as string | undefined;

  return (
    <div className="mb-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          {...register}
          type={type}
          placeholder={placeholder}
          className=" w-full border px-2 rounded-md bg-transparent py-1.5   text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm sm:leading-6"
        />
      </div>
      {errorMessage && <p className="text-rose-500 text-sm ">{errorMessage}</p>}
    </div>
  );
};

export default Input;
