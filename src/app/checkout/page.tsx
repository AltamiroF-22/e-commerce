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
import { CartItemsProps } from "../components/modals/CartModal";
import getCartItems from "../actions/getCartItems";
import CartItem from "../components/modals/CartItem";
import { SafeUser } from "../types";

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

const Checkout = ({ currentUser }: { currentUser: SafeUser }) => {
  const [CartItems, setCartItems] = useState<CartItemsProps[]>([]);

  //////////
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
    const fetchCartItems = async () => {
      const getCartItem = await getCartItems();
      setCartItems(getCartItem);
    };

    fetchCartItems();
  }, []);

  const subTotal = CartItems.reduce(
    (accumulator: number, item: CartItemsProps) => {
      return accumulator + item.productPrice * item.productQuantity;
    },
    0
  );

  //"random" shipping
  const shipping = (subTotal / 8) * 0.75;
  const total = shipping + subTotal;

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
        reset();
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

  const handleFinishOrder = async () => {
    if (addresses.length === 0)
      return toast.error("You need at least 1 address!");

    if (subTotal + shipping > currentUser.wallet)
      return toast.error("todo add more money with stripe!!!");

    const productIds = CartItems.map((item) => item.productId);

    await axios
      .post("/api/order", {
        userId: currentUser.id,
        totalAmount: total,
        shippingAddressId: selectedAddressId,
        orderProductsId: productIds, // Incluindo os IDs dos produtos
      })
      .then(() => {
        toast.success("Order made :)");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };
  return (
    <Container>
      <div className="w-full grid gap-4 md:grid-cols-2 mt-10">
        <div className="px-2 xl:px-4">
          <h2 className="text-md font-semibold text-zinc-700 mb-16">
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

          {addresses.length > 0 && (
            <div className="pt-5">
              <h3 className="text-sm font-semibold text-zinc-700 text-center pb-5">
                Or use a saved one
              </h3>
              <div className="top-[6em] ">
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
              </div>
            </div>
          )}
        </div>

        {CartItems.length > 0 && (
          <div className="">
            <h2 className="text-md font-semibold text-zinc-700 mb-16">
              Products to checkout
            </h2>
            {CartItems.map((item) => (
              <>
                <CartItem
                  key={item.id}
                  id={item.id}
                  imageSrc={item.productImage}
                  productId={item.productId}
                  productColor={item.colorName}
                  productSize={item.sizeName}
                  productQuantity={item.productQuantity}
                  productTitle={item.product.title}
                  ProductPrice={item.productPrice}
                />
                <hr className="my-4" />
              </>
            ))}
            <div className="w-full">
              <div className="flex w-full justify-between gap-3">
                <p className="text-zinc-700 text-sm">Subtotal</p>
                <p className="text-sm">${subTotal.toFixed(2)}</p>
              </div>
              <hr className="my-3" />
              <div className="flex w-full justify-between gap-3">
                <p className="text-zinc-700 text-sm">Shipping</p>
                <p className="text-sm">${shipping.toFixed(2)}</p>
              </div>
              <hr className="my-3" />
              <div className="flex w-full justify-between gap-3">
                <p className="text-zinc-700 text-sm">Total</p>
                <p className="text-sm">${total.toFixed(2)}</p>
              </div>
              <hr className="my-3" />
            </div>

            <button
              onClick={() => {
                handleFinishOrder();
              }}
              className="w-full p-4 bg-zinc-950 rounded-md text-white transition hover:bg-zinc-800"
            >
              Finish order
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Checkout;
