import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "You must be logged in!" });
  }

  const body = await req.json();

  const {
    sizeName,
    sizeId,
    colorName,
    productImage,
    productPrice,
    colorId,
    productId,
  } = body;

  try {
    const cart = await prisma.cart.create({
      data: {
        sizeName,
        productPrice,
        productImage,
        sizeId,
        colorName,
        colorId,
        productId,
        userId: currentUser.id,
        productQuantity: 1,
      },
    });

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error creating cart item:", error);
    return NextResponse.json({ error: "Failed to add item to cart" });
  }
}
