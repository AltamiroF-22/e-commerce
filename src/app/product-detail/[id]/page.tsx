"use client";

import Container from "@/app/components/Container";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Sizes from "./components/Sizes";
import Colors from "./components/Colors";
import Review from "./components/Reviews";
import { FiPlus } from "react-icons/fi";
import useReviewModal from "@/app/hooks/useReviewModal";
import toast from "react-hot-toast";

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
  const reviewModal = useReviewModal();

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedSizeName, setSelectedSizeName] = useState<string>("");
  const [selectedColorName, setSelectedColorName] = useState<string>("");
  const [selectedStock, setSelectedStock] = useState<number>(0);
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );
  const [availableSizes, setAvailableSizes] =
    useState<[{ sizeId: string; sizeName: string }]>();

  const { handleSubmit } = useForm();

  const handleColorSelection = (
    colorId: string | undefined,
    colorName: string | undefined
  ) => {
    if (!colorId || !colorName)
      return console.error("error no color id do productdetail");

    const filter = productDetail?.variants
      .filter((variant) => variant.colorId === colorId && variant.stock > 0)
      .map((variant) => ({
        sizeId: variant.sizeId,
        sizeName: variant.size.name,
      }));

    setAvailableSizes(filter);
    setSelectedColor(colorId);
    setSelectedColorName(colorName);
  };

  const handleSizeSelection = (sizeID: string, sizeName: string) => {
    setSelectedSize(sizeID);
    setSelectedSizeName(sizeName);
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

  const onSubmit = async () => {
    const data = {
      productId: productDetail.id,
      sizeName: selectedSizeName,
      colorName: selectedColorName,
      sizeId: selectedSize,
      colorId: selectedColor,
      productImage: productDetail.mainImage,
      productPrice: productDetail.price,
    };

    try {
      await axios.post(`/api/product/`, data);
      toast.success("Product added to the cart");
    } catch (error: any) {
      console.log(error);

      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong!");
      }
    }
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
                {productDetail.images.length}+
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
            <Review
              reviweRating={4}
              userName="Ashley F-22"
              userImage="https://i.pinimg.com/originals/89/43/11/89431156d5b3cb697e6a11adadb57438.gif"
              userReview="this is a default review :) Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Delectus consequatur quia quasi labore adipisci soluta
        magnam atque sapiente, omnis, nobis recusandae harum voluptatem
        aspernatur sint esse ratione iste aliquid obcaecati?"
            />
            <hr className="mt-7" />
            <div className="w-full flex justify-center items-center py-4 mt-1">
              <button
                onClick={() => reviewModal.onOpen()}
                className="flex justify-center items-center hover:border-b hover:border-zinc-800 transition"
              >
                <p className="text-zinc-950 text-sm pr-1"> Add review </p>
                <FiPlus className="text-zinc-950 text-sm" />
              </button>
            </div>
          </div>
        </div>

        <div className=" w-full md:w-[50%]">
          <p className="mb-7">${productDetail.price.toFixed(2)}</p>
          <p>Color</p>
          <div className="flex gap-2 mb-7 mt-1">
            {uniqueColors.map((variant) => (
              <Colors
                key={variant?.colorId}
                colorId={variant?.colorId}
                selectedColor={selectedColor}
                colorName={variant?.color.name}
                handleColorSelection={() =>
                  handleColorSelection(variant?.colorId, variant?.color.name)
                }
              />
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <p>Size</p>
            <div className="w-full grid xl:max-w-[300px] gap-2 grid-cols-3 xl:grid-cols-4 my-2">
              {availableSizes?.map((product) => (
                <Sizes
                  key={product.sizeId}
                  sizeId={product.sizeId}
                  sizeName={product.sizeName}
                  selectedSize={selectedSize}
                  handleSizeSelection={() =>
                    handleSizeSelection(product.sizeId, product.sizeName)
                  }
                />
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
