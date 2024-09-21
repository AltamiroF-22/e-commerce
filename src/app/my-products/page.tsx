"use client";

import { useEffect, useState } from "react";
import Container from "../components/Container";
import axios from "axios";
import ProductCard from "../components/product/Product";
import { ProductsProps } from "../page";
import { SafeUser } from "../types";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SetBodyHiddenInPopUps from "../utils/SetBodyHiddenInPopUps";

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState<ProductsProps[]>([]);
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [idToDelete, setIdToDelete] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/my-products");
        setMyProducts(response.data);
      } catch (error) {
        console.error("Error fetching the products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    SetBodyHiddenInPopUps(showDeleteModal);
  }, [showDeleteModal]);

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

  const handleShowDeleteModal = (productId: string) => {
    setShowDeleteModal(true);
    setIdToDelete(productId);
  };

  const handleDeleteProduct = async (productId: string) => {
    await axios
      .delete(`api/my-products`, { data: { productId } })
      .then(() => {
        toast.success("Product deleted!");

        setMyProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIdToDelete("");
        setShowDeleteModal(false);
      });
  };

  return (
    <Container>
      {showDeleteModal && (
        <div className="z-40 fixed top-0 left-0 w-[100vw] h-[100dvh] bg-zinc-950/70 flex items-center justify-center">
          <div className="bg-white rounded-md p-4 border">
            <h1 className=" text-zinc-950 text-xl font-bold">Are you sure?</h1>
            <p className=" text-sm mt-2 text-zinc-700">
              This action can't be reverted!
            </p>
            <hr className="my-5" />

            <div className="w-full justify-between px-5 flex items-center gap-10">
              <button
                className="transition border text-zinc-900 hover:bg-rose-700 hover:text-white px-10 py-3 rounded"
                onClick={() => handleDeleteProduct(idToDelete)}
              >
                {"I'm sure!"}
              </button>
              <button
                className="transition border text-zinc-900 hover:bg-zinc-950 hover:text-white px-10 py-3 rounded"
                onClick={() => {
                  setIdToDelete(""), setShowDeleteModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div
          style={{ height: `calc(100vh - 14em)` }}
          className="flex items-center justify-center w-full"
        >
          <Loader />
        </div>
      )}

      {!isLoading && myProducts.length > 0 && (
        <>
          <h1>My Products</h1>
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-40">
            {myProducts.map((product) => (
              <ProductCard
                noRouterPush
                deleteIcon={() => handleShowDeleteModal(product.id)}
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

      {!isLoading && myProducts.length === 0 && (
        <div
          style={{ height: `calc(100vh - 16em)` }}
          className="flex items-center justify-center w-[90vw]"
        >
          <div className="text-center">
            <h1 className="text-zinc-950 font-semibold text-lg">
              You don't have any products yet!
            </h1>
            <p>
              Do you want create one?{" "}
              <span
                onClick={() => router.push("/create-new-product")}
                className="underline text-blue-600 transition hover:opacity-75 cursor-pointer"
              >
                Create.
              </span>
            </p>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MyProducts;
