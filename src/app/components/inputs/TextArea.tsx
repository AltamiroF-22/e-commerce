"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  register: ReturnType<UseFormRegister<FieldValues>>;
  errors: FieldErrors;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  register,
  rows,
  errors,
  id,
}) => {
  const errorMessage = errors[id]?.message as string | undefined;

  return (
    <div className="col-span-full">
      <label
        htmlFor="about"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          {...register}
          id="about"
          name="about"
          rows={rows ? rows : 3}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={""}
        />
      </div>
      {errorMessage && <p className="text-rose-500 text-sm ">{errorMessage}</p>}
    </div>
  );
};

export default TextArea;
