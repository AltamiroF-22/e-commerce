"use client";

import Container from "@/app/components/Container";
import { useParams } from "next/navigation";

const ProductDetails = () => {
  const params = useParams();
  const id = params?.id;

  return (
    <Container>
      <h1>Product Deatails: {id}</h1>
    </Container>
  );
};

export default ProductDetails;
