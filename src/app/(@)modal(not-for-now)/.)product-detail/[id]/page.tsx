"use client";

import ModalInterception from "@/app/components/modals/ModalInterception";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
  const router = useRouter();
  const params = useParams();

  const id = params?.id;

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [availableSizes, setAvailableSizes] =
    useState<[{ sizeId: string; sizeName: string }]>();
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

  const closeModalInterception = () => {
    router.back();
  };

  const refreshPage = () => {
    router.replace(`/product-detail/${id}`);
  };

  const handleColorSelection = (colorId: string) => {
    setSelectedColor(colorId);
    const sizesForColor = productDetail.variants
      .filter((variant) => variant.colorId === colorId && variant.stock > 0)
      .map((variant) => ({
        sizeId: variant.sizeId,
        sizeName: variant.size.name,
      }));
    setAvailableSizes(sizesForColor);
  };

  // Agrupar variantes por cor
  const uniqueColors = Array.from(
    new Set(productDetail.variants.map((variant) => variant.colorId))
  ).map((colorId) =>
    productDetail.variants.find((variant) => variant.colorId === colorId)
  );

  return (
    <ModalInterception>
      <main className="w-full relative max-w-[900px] h-full md:h-[45vh] flex flex-col md:flex-row gap-4 bg-white overflow-y-auto rounded-md p-5">
        <button
          type="button"
          onClick={() => closeModalInterception()}
          className="absolute right-2 z-10 rounded-full bg-white p-1 border md:border-none md:bg-transparent top-2 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
        >
          <span className="sr-only">Close</span>
          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
        </button>
        <div className="relative w-full md:w-[80%] h-full">
          <Image
            alt={productDetail.mainImage}
            src={productDetail.mainImage}
            fill
            className="object-cover object-center rounded-sm"
          />
        </div>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="">
            <h1 className="text-zinc-950 text-2xl font-semibold">
              {productDetail.title.slice(0, 19)}
              {productDetail.title.length > 18 && <span>...</span>}
            </h1>
            <p className="py-1 text-xl font-light">
              ${productDetail.price.toFixed(2)}
            </p>

            <div className="flex space-x-4">
              {uniqueColors.map((variant) => (
                <label
                  key={variant?.colorId}
                  htmlFor={`color-${variant?.colorId}`}
                  className="cursor-pointer"
                >
                  <input
                    type="radio"
                    id={`color-${variant?.colorId}`}
                    name="color-radio"
                    value={variant?.colorId}
                    className="hidden"
                    checked={selectedColor === variant?.colorId}
                    onChange={() => handleColorSelection(variant?.colorId)}
                  />
                  <div
                    style={{ background: `${variant?.color.name}` }}
                    className={`w-8 h-8 border-2 border-transparent rounded-full ${
                      selectedColor === variant?.colorId && "border-blue-600"
                    }`}
                  ></div>
                </label>
              ))}
            </div>

            {selectedColor && (
              <div className="mt-4">
                <p className="text-lg font-semibold">Available Sizes:</p>
                <div className="flex space-x-4">
                  {availableSizes.map((size) => (
                    <div
                      key={size?.sizeId}
                      className="text-gray-700 border rounded-md min-w-20 py-2 flex items-center justify-center"
                    >
                      {size?.sizeName.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            className="w-full p-4 bg-zinc-950 transition hover:bg-zinc-800 text-white rounded-md"
            onClick={() => refreshPage()}
          >
            See more details
          </button>
        </div>
      </main>
    </ModalInterception>
  );
};

export default ProductDetailsModal;
