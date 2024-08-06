"use client";

import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/inputs/Input";
import axios from "axios";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SingleImageUpload from "../components/inputs/SingleImageUpload";
import TextArea from "../components/inputs/TextArea";
import Select from "../components/inputs/GenderSelect";
import ColorSizeStock from "../components/ColorSizeStock";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ChromePicker } from "react-color";
import toast from "react-hot-toast";
import { SafeUser } from "../types";

interface CreateProductProps {
  currentUser: SafeUser;
}

const CreateProduct: React.FC<CreateProductProps> = ({ currentUser }) => {
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
      price: '',
      imageSrc: "",
      imagesSrc: [],
      genderSelect: "UNISEX",
      category: "",
    },
  });
  const imageSrc = watch("imageSrc");
  const imagesSrc = watch("imagesSrc");

  const [choices, setChoices] = useState<
    { color: string; size: string; stock: number }[]
  >([]);
  const [currentColor, setCurrentColor] = useState("#3C6D43");
  const [currentSize, setCurrentSize] = useState("");
  const [currentStock, setCurrentStock] = useState(0);
  const [showAddMore, setShowAddMore] = useState<boolean>(false);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const handleAddChoise = () => {
    if (currentSize.length === 0 || currentStock === 0) {
      setShowAddMore(false);
      return;
    }
    setChoices([
      ...choices,
      { color: currentColor, size: currentSize, stock: currentStock },
    ]);

    setCurrentColor(currentColor);
    setCurrentSize("");
    setCurrentStock(0);
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log({ ...data, choices });

    if (choices.length === 0) {
      toast.error("The product need have at least one variant!");
      return;
    }

    if (data.imageSrc.length === 0) {
      toast.error("The product must have a main image!");
      return;
    }

    if (data.imagesSrc.length <= 2) {
      toast.error("The product must have at least 3 images!");
      return;
    }

    if (currentUser?.role !== "SELLER") {
      toast.error("You need to be a seller to create a product!");
      return;
    }

    try {
      await axios.post("/api/products", {
        ...data,
        choices,
      });

      toast.success("Produto criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar o produto:", error);
      toast.error("Erro ao criar o produto.");
    }
  };

  return (
    <Container>
      <main className="grid grid-cols-1 md:grid-cols-2 md:gap-4  w-full mt-10">
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

          <Input
            id="price"
            label="Price*"
            type="number"
            required
            register={register("price", {
              required: "Price is required!",
              min: {
                value: 1,
                message: "Price can't be below 1$",
              },
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

        <div className="flex flex-col mt-6 md:mt-0 justify-start gap-2 items-stretch px-2 md:px-0">
          <Select
            id="genderSelect"
            label="Gender*"
            label2="(Unisex items will appear in filters for both genders.)"
            options={["FEMALE", "MALE", "UNISEX"]}
            defaultValue="UNISEX"
            register={register("genderSelect")}
            errors={errors}
          />

          <Input
            label="Category"
            label2="(Optional)"
            register={register("category")}
            id="category"
            errors={errors}
          />

          <hr className="my-5" />
          <p className="text-sm">Products variants</p>
          <div className="relative grid grid-cols-2 gap-4 mt-2 pl-1">
            {choices.length > 0 &&
              choices.map((value) => (
                <div className=" justify-self-start">
                  <ColorSizeStock
                    key={value.size}
                    color={value.color}
                    size={value.size}
                    stock={value.stock}
                  />
                </div>
              ))}

            <button
              onClick={() => setShowAddMore(true)}
              className="w-36 border flex items-center py-2 justify-center text-zinc-300 rounded-md hover:bg-zinc-950 transition hover:text-white"
            >
              <AiOutlinePlus />
            </button>
            {showAddMore && (
              <div className="w-full z-20 flex-col mt-4 absolute bg-white border top-20 flex gap-2 p-5 rounded-md">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span>Cor:</span>
                    <div
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      className="w-10 h-6 border cursor-pointer"
                      style={{ backgroundColor: currentColor }}
                    ></div>
                    {showColorPicker && (
                      <ChromePicker
                        color={currentColor}
                        className="absolute left-0 top-36"
                        onChangeComplete={(color) => setCurrentColor(color.hex)}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Size:</span>
                    <input
                      type="text"
                      className="border w-full pl-2 "
                      maxLength={3}
                      required
                      onChange={(e) => setCurrentSize(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Stock:</span>
                    <input
                      type="number"
                      className="border w-full pl-2"
                      min={1}
                      required
                      onChange={(e) => setCurrentStock(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => {
                      handleAddChoise(), setShowAddMore(false);
                    }}
                    className="border rounded-sm p-2 w-full hover:text-white transition hover:bg-zinc-900"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowAddMore(false)}
                    className="border rounded-sm p-2 w-full hover:text-white transition hover:bg-zinc-900"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

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
