"use client";

import { FieldValues, useForm } from "react-hook-form";
import Container from "../components/Container";
import Input from "../components/inputs/Input";
import Select from "../components/inputs/GenderSelect";

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

  return (
    <Container>
      <div className="w-full grid grid-cols-2">
        <div className="px-2">
          <h2 className="text-xl font-semibold text-zinc-700 mb-16">
            Shipping Address
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
                register={register("additionalInfo", {
                  required: "Additional info is required!",
                })}
                id="additionalInfo"
              />
            </div>
          </div>
        </div>

        <div className="bg-cyan-800"></div>
      </div>
    </Container>
  );
};

export default Checkout;
