"use client";

import ModalInterception from "@/app/components/modals/ModalInterception";
import { useParams } from "next/navigation";

import { useState, useEffect } from "react";
import { DialogPanel, Radio, RadioGroup } from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";

import Image from "next/image";
import axios from "axios";

interface ProductDetail {
  id: string;
  title: string;
  mainImage: string;
  images: string[];
  description: string;
  eComerceUserId: string;
  gender: "MALE" | "FEMALE" | "UNISEX";
  price: number;

  category?: string;
  variants: [
    {
      color: {
        id: string;
        name: string;
      };
      colorId: string;
      id: string;
      productId: string;
      size: {
        id: string;
        name: string;
      };
      sizeId: string;
      stock: number;
    }
  ];
}

const ProductDetailsModal = async () => {
  const product = {
    name: "Basic Tee 6-Pack ",
    price: "$192",
    rating: 3.9,
    reviewCount: 117,
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
    colors: [
      { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
      { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
      { name: "XXS", inStock: true },
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
      { name: "XXL", inStock: true },
      { name: "XXXL", inStock: false },
    ],
  };
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  const params = useParams();
  const id = params?.id;

  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );

  const fetchProductDetail = async () => {
    try {
      const response = await axios.get(`/api/product/${id}`);
      console.log(response.data);
      setProductDetail(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  if (!productDetail) return;

  return (
    <ModalInterception>
      <div className="relative flex w-full max-w-[1024px] items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
        >
          <span className="sr-only">Close</span>
          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
        </button>

        <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
          <div className="relative h-[100%] w-[100%] rounded-lg bg-gray-100 sm:col-span-5 lg:col-span-16">
            <Image
              alt={productDetail.mainImage}
              src={productDetail.mainImage}
              fill
              className="object-cover object-center rounded-md"
            />
          </div>
          <div className="sm:col-span-8 lg:col-span-7">
            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
              {productDetail.title}
            </h2>

            <section aria-labelledby="information-heading" className="mt-2">
              <h3 id="information-heading" className="sr-only">
                Product information
              </h3>

              <p className="text-2xl text-gray-900">${productDetail.price.toFixed(2)}</p>

              {/* Reviews */}
              <div className="mt-6">
                <h4 className="sr-only">Reviews</h4>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          product.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                  <a
                    href="#"
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {product.reviewCount} reviews
                  </a>
                </div>
              </div>
            </section>

            <section aria-labelledby="options-heading" className="mt-10">
              <h3 id="options-heading" className="sr-only">
                Product options
              </h3>

              <form>
                {/* Colors */}
                <fieldset aria-label="Choose a color">
                  <legend className="text-sm font-medium text-gray-900">
                    Color
                  </legend>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4 flex items-center space-x-3"
                  >
                    {productDetail.variants.map((product) => (
                      <Radio
                        key={product.colorId}
                        value={product.color.name}
                        aria-label={product.color.name}
                        style={{ background: product.color.name }}
                        className={
                          "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                        }
                      >
                        <span
                          aria-hidden="true"
                          className={
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          }
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>

                {/* Sizes */}
                <fieldset aria-label="Choose a size" className="mt-10">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">
                      Size
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4 grid grid-cols-4 gap-4"
                  >
                    {productDetail.variants.map((size) => (
                      <Radio
                        key={size.sizeId}
                        value={size.size.name}
                        disabled={size.stock <= 0}
                        className={classNames(
                          size.stock > 0
                            ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                            : "cursor-not-allowed bg-gray-50 text-gray-200",
                          "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1"
                        )}
                      >
                        <span>{size.size.name}</span>
                        {size.stock > 0 ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                            >
                              <line
                                x1={0}
                                x2={100}
                                y1={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-zinc-950  px-8 py-3 text-base font-medium text-white hover:bg-zinc-800 transition focus:outline-none "
                >
                  Add to bag
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </ModalInterception>
  );
};

export default ProductDetailsModal;
