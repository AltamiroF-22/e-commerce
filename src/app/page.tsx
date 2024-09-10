"use client";

import Container from "./components/Container";
import Image from "next/image";
import HeaderPhoto from "./assets/images/headerPhoto.jpg";
import { AiOutlineSearch } from "react-icons/ai";
import ProductCard from "./components/product/Product";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { SafeUser } from "./types";
import Loader from "./components/Loader";

interface ProductsProps {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  mainImage: string;
  category?: string;
  gender: "MALE" | "FEMALE" | "UNISEX";
  createdAt: Date;
  updatedAt: Date;
  eComecerUserId: string;
}

export default function Home() {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [handpicked, setHandpicked] = useState<ProductsProps[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get("/api/user/currentUser");
        setCurrentUser(response.data as SafeUser);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    getCurrentUser();
  }, []);

  const fetchProducts = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `/api/products?page=${currentPage}&limit=10`
      );
      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.products,
      ]);
      setHasMore(response.data.products.length > 0);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading]);

  // TO DO: add a button with plus icon to search for more 10 products

  const fetchHandpicked = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/products?page=${currentPage}&limit=8`
      );

      setHandpicked([...response.data.products]);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchHandpicked();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading ||
        !hasMore
      )
        return;
      fetchProducts();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchProducts, loading, hasMore]);

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
        <h1 className="text-2xl mb-5 ">Handpicked Selections for You</h1>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-40">
          {handpicked.map((product) => (
            <ProductCard
              key={product.id}
              productName={product.title}
              imageSrc={product.mainImage}
              gender={product.gender}
              imageAlt={product.description}
              price={product.price.toFixed(2).toString()}
              id={product.id}
              currentUser={currentUser as SafeUser}
            />
          ))}
        </div>
        {/* <h1 className="text-2xl mb-5 ">Customers also purchased</h1>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productName={product.title}
              imageSrc={product.mainImage}
              imageAlt={product.description}
              price={product.price.toFixed(2).toString()}
              id={product.id}
            />
          ))}
        </div> */}
      </Container>
    </>
  );
}
