"use client";

import { FieldValues, useForm } from "react-hook-form";
import Container from "../components/Container";
import Input from "../components/inputs/Input";
import Select from "../components/inputs/GenderSelect";
import Button from "../components/Button";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      street: "",
      houseNumber: "",
      country: "Brazil",
      postalCode: "",
      city: "",
      phoneNumber: "",
      addressType: "HOME",
      apartmentNumber: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <Container>
      <div className="w-full grid md:grid-cols-2 mt-10">
        <div className="px-2 xl:px-4">
          <h2 className="text-xl font-semibold text-zinc-700 mb-16">
            Add Shipping Address
          </h2>
          <div className="w-full  gap-2 grid grid-cols-4 gap-y-4">
            <div className=" col-span-2">
              <Input
                label="Street Address *"
                errors={errors}
                register={register("street", {
                  required: "Street address is required!",
                })}
                id="street"
              />
            </div>

            <Input
              label="House Number *"
              errors={errors}
              register={register("houseNumber", {
                required: "House number is required!",
              })}
              id="houseNumber"
            />
            <Input
              label="AP N°"
              label2="(optional)"
              errors={errors}
              register={register("apartmentNumber")}
              id="apartmentNumber"
            />

            <div className=" col-span-2">
              <Input
                label="Country *"
                errors={errors}
                register={register("country", {
                  required: "Country is required!",
                })}
                id="country"
              />
            </div>

            <div className="col-span-2">
              <Input
                label="State"
                label2="/Province *"
                errors={errors}
                register={register("state", {
                  required: "State/Province is required!",
                })}
                id="state"
              />
            </div>
            <div className="col-span-2">
              <Input
                label="Postal Code"
                label2="/CEP *"
                errors={errors}
                register={register("postalCode", {
                  required: "Postal code/CEP is required!",
                })}
                id="postalCode"
              />
            </div>
            <div className="col-span-2">
              <Input
                label="City *"
                errors={errors}
                register={register("city", {
                  required: "City is required!",
                })}
                id="city"
              />
            </div>
            <div className="col-span-3">
              <Input
                label="Phone Number *"
                errors={errors}
                register={register("phoneNumber", {
                  required: "Phone number is required!",
                })}
                id="phoneNumber"
              />
            </div>

            <div className="">
              <Select
                id="addressType"
                label="Address Type *"
                options={["HOME", "WORK", "OTHER"]}
                defaultValue="HOME"
                register={register("addressType", {
                  required: "Address type is required!",
                })}
                errors={errors}
              />
            </div>
            <div className=" col-span-4">
              <Input
                label="Additional Info"
                label2="(optional)"
                errors={errors}
                register={register("additionalInfo")}
                id="additionalInfo"
              />
            </div>
            <button //TODO: add disable
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="col-span-4 p-4 bg-zinc-950 rounded-md text-white transition hover:bg-zinc-800"
            >
              Add address
            </button>
          </div>
        </div>

        <div className="">
          <h3 className="text-md font-semibold text-zinc-700 mb-16">
            Or use a saved one
          </h3>
          <div className="border border-spacing-1 border-dashed rounded-md sticky top-[6em] ">
            <p className="text-sm p-9 text-center text-zinc-600 italic ">
              You don't have saved Addresses
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
