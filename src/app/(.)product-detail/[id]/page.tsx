"use client";

// import React from "react";
import ModalInterception from "@/app/components/modals/ModalInterception";
import { useParams } from "next/navigation";

const ProductDetailsModal = () => {
  const params = useParams();
  const id = params?.id;
  return (
    <ModalInterception>
      <div className="bg-white p-10 rounded-sm ">
        <h1>Product interception: {id}</h1>
      </div>
    </ModalInterception>
  );
};

export default ProductDetailsModal;
