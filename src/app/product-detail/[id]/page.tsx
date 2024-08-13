"use client";

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import { StarIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [availableSizes, setAvailableSizes] =
    useState<[{ sizeId: string; sizeName: string }]>();
  const [selectedStock, setSelectedStock] = useState<number>(0);

  const { register, handleSubmit, watch } = useForm();
  const selectedSize = watch("size");

  const handleColorSelection = (colorId: string) => {
    const filter = productDetail?.variants
      .filter((variant) => variant.colorId === colorId && variant.stock > 0)
      .map((variant) => ({
        sizeId: variant.sizeId,
        sizeName: variant.size.name,
      }));

    setAvailableSizes(filter);
    setSelectedColor(colorId);
  };

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const selectedVariant = productDetail?.variants.find(
        (variant) =>
          variant.colorId === selectedColor && variant.sizeId === selectedSize
      );
      setSelectedStock(selectedVariant?.stock || 0);
    }
  }, [selectedColor, selectedSize]);

  const uniqueColors = Array.from(
    new Set(productDetail?.variants.map((variant) => variant.colorId))
  ).map((colorId) =>
    productDetail?.variants.find((variant) => variant.colorId === colorId)
  );

  const product = {
    rating: 3.9,
  };

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const params = useParams();
  const id = params?.id;

  const fetchProductDetail = async () => {
    try {
      const response = await axios.get(`/api/product/${id}`);
      setProductDetail(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  if (!productDetail) return null;

  const onSubmit = (data: any) => {
    console.log({
      productID: productDetail.id,
      sizeID: data.size,
      colorID: selectedColor,
    });
    // Adicione aqui a lógica para lidar com a seleção de tamanho
  };

  return (
    <Container>
      {/* Layout de imagens e detalhes do produto */}
      <div className="grid md:grid-cols-3 grid-rows-4 md:grid-rows-2 gap-4 pb-8">
        <div className="cursor-pointer hover:opacity-90 transition  relative md:col-span-1 md:row-span-2">
          <Image
            alt={productDetail.title}
            src={productDetail.mainImage}
            fill
            className="object-cover object-center rounded-md"
          />
        </div>
        <div className="cursor-pointer hover:opacity-90 transition h-[35dvh] rounded-md relative">
          <Image
            alt={productDetail.title}
            src={productDetail.images[2]}
            fill
            className="object-cover object-center rounded-md"
          />
        </div>
        <div className="cursor-pointer hover:opacity-90 transition relative rounded-md md:row-span-2">
          <Image
            alt={productDetail.title}
            src={productDetail.images[0]}
            fill
            className="object-cover object-center rounded-md"
          />
        </div>
        <div className="cursor-pointer hover:opacity-90 transition relative rounded-md">
          {productDetail.images.length >= 4 && (
            <div className="absolute w-full cursor-pointer h-full bg-black/60 z-[2] rounded-md flex items-center justify-center">
              <p className="text-white text-4xl font-bold tracking-wide">
                {productDetail.images.length + 1}+
              </p>
            </div>
          )}
          <Image
            alt={productDetail.title}
            src={productDetail.images[1]}
            fill
            className="object-cover object-center rounded-md"
          />
        </div>
      </div>

      {/* Detalhes e seleção do produto */}
      <div className="flex gap-4 flex-col items-start md:flex-row">
        <div className="w-full">
          <h1 className="text-xl pb-2 text-zinc-900 font-semibold">
            {productDetail.title}
          </h1>
          <p className="text-sm">{productDetail.description}</p>

          <div className="mt-7">
            <h1 className="text-xl pb-4 text-zinc-900 font-semibold">
              Reviews
            </h1>

            <div className="">
              <div className="flex">
                <div className="relative h-10 w-10">
                  <Image
                    src={
                      "https://i.pinimg.com/originals/89/43/11/89431156d5b3cb697e6a11adadb57438.gif"
                    }
                    alt="default gif"
                    fill
                    className="object-cover object-center rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm ml-2 font-bold">Ashley F-22</span>
                  <div className="">
                    <h4 className="sr-only">Reviews</h4>

                    <div className="flex items-center ml-2">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={classNames(
                            product.rating > rating
                              ? "text-gray-900"
                              : "text-gray-200",
                            "h-4 w-4 flex-shrink-0"
                          )}
                        />
                      ))}
                    </div>
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 ml-2 text-sm italic text-zinc-600">
                this is a default review :) Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Delectus consequatur quia quasi
                labore adipisci soluta magnam atque sapiente, omnis, nobis
                recusandae harum voluptatem aspernatur sint esse ratione iste
                aliquid obcaecati?
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-[50%]">
          <p className="mb-7">${productDetail.price.toFixed(2)}</p>
          <p>Color</p>
          <div className="flex gap-2 mb-7 mt-1">
            {uniqueColors.map((variant) => (
              <label
                key={variant?.colorId}
                htmlFor={`color-${variant?.colorId}`}
                className="cursor-pointer"
              >
                <input
                  type="radio"
                  id={`color-${variant?.colorId}`}
                  value={variant?.colorId}
                  className="hidden"
                  checked={selectedColor === variant?.colorId}
                  onChange={() => handleColorSelection(variant?.colorId)}
                />
                <div
                  style={{ background: `${variant?.color.name}` }}
                  className={`w-8 h-8 border rounded-full ${
                    selectedColor === variant?.colorId && "border-blue-600"
                  }`}
                ></div>
              </label>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <p>Size</p>
            <div className="w-full grid xl:max-w-[300px] gap-2 grid-cols-3 xl:grid-cols-4 my-2">
              {availableSizes?.map((product) => (
                <label
                  key={product.sizeId}
                  htmlFor={`size-${product.sizeId}`}
                  className="cursor-pointer w-full"
                >
                  <input
                    type="radio"
                    id={`size-${product.sizeId}`}
                    {...register("size")}
                    value={product.sizeId}
                    className="hidden"
                  />
                  <div
                    className={`border py-4 flex items-center justify-center rounded-md ${
                      selectedSize === product.sizeId
                        ? "border-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {product.sizeName}
                  </div>
                </label>
              ))}
            </div>

            {selectedStock > 0 ? (
              <p className="text-sm pt-2 pb-4 text-zinc-950">
                {selectedStock} items in stock
              </p>
            ) : (
              <p className="text-sm pt-2 pb-4 text-zinc-700">Out of stock</p>
            )}

            <button
              type="submit"
              className={`mt-4 w-full p-4 bg-zinc-950 text-white rounded-md hover:bg-zinc-800 transition ${
                selectedStock === 0 && "cursor-not-allowed opacity-70"
              }`}
              disabled={selectedStock === 0}
            >
              Add to bag
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
