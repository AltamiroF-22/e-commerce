"use client";

import { FieldValues, useForm } from "react-hook-form";
import Container from "../components/Container";
import Input from "../components/inputs/Input";
import Select from "../components/inputs/GenderSelect";
import axios from "axios";
import toast from "react-hot-toast";
import getAddresses from "../actions/getAddresses";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface AddressProps {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  houseNumber: string;
  addressType: "WORK" | "HOME" | "OTHER";
  apartmentNumber: string | null;
  additionalInfo: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const Checkout = () => {
  const [addresses, setAddresses] = useState<AddressProps[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
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
      state: "",
    },
  });



  useEffect(() => {
    address();
  }, []);

  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses]);

  const address = async () => {
    const address = await getAddresses();
    if (!address) return;
    setAddresses(address);
  };

  const onSubmit = async (data: any) => {
    axios
      .post("/api/checkout", data)
      .then(() => {
        toast.success("Address added");
        address();
        reset()
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
  };

  const handleDeleteAddress = async (addressId: string) => {
    await axios
      .delete("/api/checkout", { data: { addressId } })
      .then(() => {
        toast.success("Address deleted!");
        setAddresses(addresses.filter((address) => address.id !== addressId));
      })
      .catch((err) => {
        toast.error("Error to delete address");
        console.log(err);
      });
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
            {addresses.length === 0 && (
              <p className="text-sm p-9 text-center text-zinc-600 italic ">
                You don't have saved Addresses
              </p>
            )}
            {addresses.length > 0 && (
              <div className="text-sm flex gap-2 flex-col p-1 text-center">
                {addresses.map((address) => (
                  <label htmlFor={address.id} className="" key={address.id}>
                    <input
                      type="radio"
                      id={address.id}
                      value={address.id}
                      className="hidden"
                      checked={selectedAddressId === address.id}
                      onChange={() => setSelectedAddressId(address.id)}
                    />

                    <div
                      className={`border-2 p-3 rounded-md relative cursor-pointer text-start grid md:grid-cols-2 ${
                        selectedAddressId === address.id && "border-blue-600"
                      }`}
                    >
                      <button
                        className="absolute right-1 top-2 hover:text-red-700 transition"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteAddress(address.id);
                        }}
                      >
                        <FiTrash2 />
                        <p className="sr-only">delete address</p>
                      </button>

                      <div className="flex flex-col gap-1">
                        <p className="text-sm">
                          Country:
                          <span className="text-zinc-500 text-xs">
                            {" "}
                            {address.country}
                          </span>
                        </p>
                        <p className="text-sm ">
                          State:
                          <span className="text-zinc-500 text-xs">
                            {" "}
                            {address.state}
                          </span>
                        </p>
                        <p className="text-sm">
                          City:
                          <span className="text-zinc-500 text-xs">
                            {" "}
                            {address.city}
                          </span>
                        </p>

                        <p className="text-sm">
                          Postal Code:
                          <span className="text-zinc-500 text-xs">
                            {" "}
                            {address.postalCode}
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <p className="text-sm">
                          Phone Number:
                          <span className="text-zinc-500 text-xs">
                            {" "}
                            {address.phoneNumber}
                          </span>
                        </p>

                        <p className="text-sm">
                          Street:
                          <span className="text-zinc-500 text-xs">
                            {" "}
                            {address.street}
                          </span>
                        </p>
                        <p className="text-sm">
                          N°:
                          <span className="text-zinc-500 text-xs">
                            {" "}
                            {address.houseNumber}
                          </span>
                        </p>
                        {address.apartmentNumber &&
                          address.apartmentNumber.trim().length > 0 && (
                            <p className="text-sm">
                              Apartment N°:
                              <span className="text-zinc-500 text-xs">
                                {" "}
                                {address.apartmentNumber}
                              </span>
                            </p>
                          )}
                        <p className="text-sm">
                          Address Type:
                          <span className="text-zinc-500 text-xs">
                            {" "}
                            {address.addressType.slice(0, 1)}
                            {address.addressType
                              .slice(1, address.addressType.length)
                              .toLowerCase()}
                          </span>
                        </p>

                        {address.additionalInfo &&
                          address.additionalInfo.trim().length > 0 && (
                            <p className="text-sm">
                              Addiotional Information:
                              <span className="text-zinc-500 text-xs">
                                {" "}
                                {address.additionalInfo}
                              </span>
                            </p>
                          )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
