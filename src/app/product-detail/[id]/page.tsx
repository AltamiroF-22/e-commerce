"use client";

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import { StarIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  
  const product = {
    rating: 3.9,
  };
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const params = useParams();
  const id = params?.id;
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );

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

  return (
    <Container>
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

      <div className="flex gap-4 flex-col items-start md:flex-row">
        <div className="w-full">
          <h1 className="text-xl pb-4 text-zinc-900 font-semibold">
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
            {productDetail.variants.map((product) => (
              <div
                style={{ background: product.color.name }}
                key={product.colorId}
                className="h-8 w-8 rounded-full border"
              ></div>
            ))}
          </div>
          <p>Size</p>
          <div className="w-full grid xl:max-w-[300px] gap-2 grid-cols-3 xl:grid-cols-4 my-2">
            {productDetail.variants.map((product) => (
              <div
                key={product.sizeId}
                className="w-full  border py-4 flex items-center rounded-md justify-center"
              >
                {product.size.name}
              </div>
            ))}
          </div>

          <button className=" mt-4 w-full p-4 bg-zinc-950 text-white rounded-md hover:bg-zinc-800 transition">
            Add to bag
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
