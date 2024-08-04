"use client";

import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/inputs/Input";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SingleImageUpload from "../components/inputs/SingleImageUpload";
import TextArea from "../components/inputs/TextArea";
import Select from "../components/inputs/GenderSelect";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      imageSrc: "",
      imagesSrc: [],
      genderSelect: "UNISEX",
    },
  });
  const imageSrc = watch("imageSrc");
  const imagesSrc = watch("imagesSrc");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <Container>
      <main className="grid grid-cols-1 md:grid-cols-2 md:gap-4 w-full mt-10">
        <div className="flex flex-col justify-center gap-4 items-stretch px-2 md:px-0">
          <Input
            id="title"
            label="Title*"
            required
            register={register("title", {
              required: "Title is required!",
            })}
            errors={errors}
          />
          <TextArea
            id="description"
            label="Description*"
            register={register("description", {
              required: "Description is required!",
            })}
            errors={errors}
          />

<div>
            <p className="block text-sm font-medium leading-6 mb-4 text-gray-900">
              Main Image*
            </p>
            <SingleImageUpload
              onChange={(value) => setCustomValue("imageSrc", value[0])}
              value={imageSrc ? [imageSrc] : []}
              maxfile={1}
            />
            {errors.imageSrc && (
              <p className="text-red-500">Image is required!</p>
            )}
          </div>
          <div>
            <p className="block text-sm font-medium leading-6 mb-4 text-gray-900">
              Images*
            </p>
            <SingleImageUpload
              maxfile={10}
              onChange={(value) => setCustomValue("imagesSrc", value)}
              value={imagesSrc}
            />
            {errors.imagesSrc && (
              <p className="text-red-500">At least one image is required!</p>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-stretch px-2 md:px-0">
          <Select
            id="genderSelect"
            label="Gender*"
            label2="(Unisex items will appear in filters for both genders.)"
            options={["FEMALE", "MALE", "UNISEX"]}
            defaultValue="UNISEX"
            register={register("genderSelect")}
            errors={errors}
          />
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Button
              label="Create"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            />
            <Button label="Cancel" onClick={() => alert("to do")} />
          </div>
        </div>
      </main>
    </Container>
  );
};

export default CreateProduct;
