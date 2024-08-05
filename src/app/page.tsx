"use client";

import Container from "./components/Container";
import Image from "next/image";
import HeaderPhoto from "./assets/images/headerPhoto.jpg";
import Input from "./components/inputs/Input";
import { AiOutlineSearch } from "react-icons/ai";
import ProductCard from "./components/product/Product";

export default function Home() {
  const products = [
    {
      id: "1",
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: "2",
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: "3",
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: "4",
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    // More products...
  ];
  return (
    <>
      <header className=" flex items-center justify-center relative overflow-hidden w-[100dvw] md:w-[95vw] mx-auto h-[86dvh] bg-opacity-25 bg-black rounded-none  xl:rounded-3xl md:rounded-2xl mb-40">
        <div className="text-white">
          <h1 className=" text-center mb-3 text-2xl font-semibold">
            Discover Your Perfect Outfit
          </h1>

          <div className="flex gap-4 items-center bg-white mb-40 rounded-full px-4 overflow-hidden">
            <button className="flex items-center justify-center hover:opacity-80 transition">
              <AiOutlineSearch className="text-zinc-900 text-2xl md:text-3xl" />
            </button>
            <input
              className="w-80 md:w-96 p-4 pl-0 md:pl-4 text-sm text-zinc-950 outline-none"
              type="text"
              placeholder="Find the perfect clothes that match your style."
            />
          </div>
        </div>

        <div className="text-white absolute bottom-10 px-4">
          <small>
            Finding the perfect outfit has never been easier. Our curated
            collection is designed to help you discover clothes that match your
            unique style. Whether you're searching for casual wear, business
            attire, or something for a special occasion, we have options that
            cater to all tastes and preferences. Explore our selection and find
            the pieces that make you feel confident and stylish. With our
            user-friendly search tools, you can easily narrow down your choices
            and find exactly what you need. Start your fashion journey with us
            and redefine your wardrobe today.
          </small>
        </div>
        <Image
          src={HeaderPhoto}
          alt="Header Image"
          className="absolute object-cover h-full w-full top-0 -z-[1]"
        />
      </header>

      <Container>
        <h1 className="text-2xl mb-10 ">Handpicked Selections for You</h1>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productName={product.name}
              imageSrc={product.imageSrc}
              color={product.color}
              imageAlt={product.imageAlt}
              price={product.price}
              id={product.id}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
