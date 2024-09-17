import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  const body = await req.json();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "You must be logged in!" });
  }

  const { totalAmount, shippingAddressId, orderProductsId } = body;
  //fazer que nem fez para pegar os favoritos 

  try {
    const order = await prisma.orders.create({
      data: {
        userId: currentUser.id,
        totalAmount,
        shippingAddressId,
        orderProductsId,
        paymentStatus: "PENDING",
        orderStatus: "PENDING",
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order!" });
  }
}
