/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Container from "./components/Container";
import Image from "next/image";
import HeaderPhoto from "./assets/images/headerPhoto.jpg";
import { AiOutlineSearch } from "react-icons/ai";
import ProductCard from "./components/product/Product";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { SafeUser } from "./types";
import { PuffLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import getSearchedProducts from "./actions/getSearchedProducts";
import toast from "react-hot-toast";

export interface ProductsProps {
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

  const [loading, setLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchedProducts, setSearchedProduts] = useState<ProductsProps[]>([]);

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

  const fetchHandpicked = useCallback(async () => {
    try {
      const response = await axios.get(`/api/products?page=2&limit=4`);
      setHandpicked(response.data.products);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchHandpicked();
  }, [fetchHandpicked]);

  const fetchProducts = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `/api/products?page=${currentPage}&limit=20`
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

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - 100;

      if (isAtBottom && !loading && hasMore) {
        fetchProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchProducts, loading, hasMore]);

  useEffect(() => {
    searchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  //fazer um modal quando length de searchedProcts for > 0 e mostrar os produtos
  const searchProducts = async () => {
    try {
      const response = await axios.get(
        `/api/search-product?searchTerm=${searchTerm}`
      );
      if (response && response.data) {
        setSearchedProduts(response.data);
        console.log(response.data);
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <>
      <header className="flex items-center justify-center relative overflow-hidden w-[100dvw] md:w-[95vw] mx-auto h-[86dvh] bg-opacity-25 bg-black rounded-none xl:rounded-3xl md:rounded-2xl mb-40">
        <div className="text-white">
          <h1 className="text-center mb-3 text-2xl font-semibold">
            Discover Your Perfect Outfit
          </h1>

          <div
            className={`flex gap-4 items-center bg-white mb-40 rounded-full px-4 overflow-hidden transition-transform duration-500 ease-in-out ${
              searchTerm.length > 0 ? "-translate-y-[20dvh]" : ""
            }`}
          >
            <button
              onClick={() => console.log(searchTerm)}
              className="flex items-center justify-center hover:opacity-80 transition"
            >
              <AiOutlineSearch className="text-zinc-900 text-2xl md:text-3xl" />
            </button>
            <input
              className="w-80 md:w-96 p-4 pl-0 md:pl-4 text-sm text-zinc-950 outline-none"
              type="text"
              placeholder="Find the perfect clothes that match your style."
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>

          <div
            className={`h-[60dvh] z-[2] w-[100dvw] md:w-[95vw] left-1/2 overflow-y-auto -translate-x-1/2 bottom-0 absolute transition-transform duration-500 ease-in-out transform ${
              searchTerm.length > 0 ? "translate-y-0" : "translate-y-full"
            } bg-white border rounded-none xl:rounded-3xl md:rounded-2xl`}
          >
            {searchedProducts.length > 0 && (
              <>
                <div className="h-8 sticky top-0 bg-white z-[2]"></div>
                <div className=" px-10 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-40">
                  {searchedProducts.map((product) => (
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
              </>
            )}

            {searchedProducts.length === 0 && (
              <div className="w-full h-full flex items-center flex-col gap-1 justify-center">
                <h3 className=" text-zinc-800 text-lg font-semibold">No results</h3>
                <small className="text-zinc-600 text-sm">Try something different</small>
              </div>
            )}
          </div>
        </div>

        <div className="text-white absolute bottom-10 px-4">
          <small>
            Finding the perfect outfit has never been easier. Our curated
            collection is designed to help you discover clothes that match your
            unique style. Whether you&apos;re searching for casual wear, business
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
        <h1 className="text-2xl mb-5">Handpicked Selections for You</h1>
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
        <h1 className="text-2xl mb-5">Our Products</h1>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {products.map((product) => (
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
        {loading && (
          <div className="w-full flex items-center justify-center py-6">
            <PuffLoader size={50} color="gray" />
          </div>
        )}
      </Container>
    </>
  );
}
