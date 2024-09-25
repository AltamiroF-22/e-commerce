import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  const body = await req.json();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "You must be logged in!" });
  }

  const { totalAmount, shippingAddressId, orderProducts } = body;
  //fazer que nem fez para pegar os favoritos

  try {
    const order = await prisma.orders.create({
      data: {
        userId: currentUser.id,
        totalAmount,
        shippingAddressId,
        paymentStatus: "PENDING",
        orderStatus: "PENDING",
        orderProducts: {
          create: orderProducts.map((product: any) => ({
            sizeName: product.sizeName,
            colorName: product.colorName,
            productImage: product.productImage,
            productTitle: product.productTitle,
            productCategory: product.productCategory,
          })),
        },
      },
    });

    console.log(order);

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to create order!" });
  }
}


export async function GET() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "You must be logged in!" }, { status: 401 });
  }

  try {
    const orders = await prisma.orders.findMany({
      where: {
        userId: currentUser.id, // Filtra pelo ID do usuário atual
      },
      include: {
        orderProducts: true, // Inclui os produtos relacionados ao pedido
      },
      orderBy: {
        orderDate: "desc", // Ordena os pedidos do mais recente para o mais antigo
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}