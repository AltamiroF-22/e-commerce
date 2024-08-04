"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectProps {
  id: string;
  label: string;
  label2?: string;
  options: string[];
  defaultValue: string;
  register: ReturnType<UseFormRegister<FieldValues>>;
  errors: FieldErrors;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  defaultValue,
  label2,
  errors,
  //   onChange,
  register,
  id,
}) => {
  return (
    <div className="flex flex-col my-4">
      <label className="m-2 ml-1 text-sm font-medium text-gray-700">
        {label} <span className="text-zinc-300">{label2}</span>
      </label>
      <select
        {...register}
        id={id}
        defaultValue={defaultValue}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.toLowerCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
