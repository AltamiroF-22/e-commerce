"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface SelectInputProps {
  id: string;
  label: string;
  options: string[];
  register: ReturnType<UseFormRegister<FieldValues>>;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  register,
  id,
}) => {
  return (
    <div className="flex flex-col gap-2 my-2">
      <label htmlFor={id}>{label}</label>
      <select defaultValue={'UNISEX'} id={id} {...register} className="py-2 px-1 border rounded-md">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
