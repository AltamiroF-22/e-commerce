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

  if (!totalAmount || !shippingAddressId || orderProducts.length === 0) {
    return NextResponse.json({ error: "Invalid order data!" });
  }

  // Verificar se o saldo é suficiente
  if (currentUser.wallet < totalAmount) {
    return NextResponse.json({ error: "Insufficient balance!" });
  }

  try {
    // Atualizar o saldo da carteira do usuário
    const wallet = await prisma.eComerceUser.update({
      where: {
        id: currentUser.id,
      },
      data: {
        wallet: currentUser.wallet - totalAmount,
      },
    });

    if (wallet) {
      // Verificar disponibilidade das variantes e criar a ordem para revisar ainda.... é dificil essa vida kkkkkk

      // for (const product of orderProducts) {
      //   const variant = await prisma.productVariant.findUnique({
      //     where: {
      //       productId: product.productId,
      //       sizeId: product.sizeId,
      //       colorId: product.colorId,
      //     },
      //   });

      //   if (!variant || variant.stock <= 0) {
      //     return NextResponse.json({ error: `Product variant not available for ${product.productTitle}` });
      //   }
      // }

      const order = await prisma.orders.create({
        data: {
          userId: currentUser.id,
          totalAmount,
          shippingAddressId,
          paymentStatus: "COMPLETED",
          orderStatus: "PENDING",
          orderProducts: {
            create: orderProducts.map((product: any) => ({
              sizeName: product.sizeName,
              colorName: product.colorName,
              productId: product.productId,
              sizeId: product.sizeId,
              colorId: product.colorId,
              productImage: product.productImage,
              productTitle: product.productTitle,
              productCategory: product.productCategory,
              productPrice: Number(product.productPrice),
              productQuantity: Number(product.productQuantity),
            })),
          },
        },
      });

      //receber quatidades de cada produto para tirar a quantidade certa
      for (const product of orderProducts) {
        await prisma.productVariant.updateMany({
          where: {
            productId: product.productId,
            sizeId: product.sizeId,
            colorId: product.colorId,
          },
          data: {
            stock: {
              decrement: product.productQuantity,
            },
          },
        });
      }

      // Limpar carrinho
      await prisma.cart.deleteMany({
        where: {
          userId: currentUser.id,
        },
      });

      console.log(order);

      return NextResponse.json({ order, wallet });
    } else {
      return NextResponse.json({ error: "Failed to update wallet!" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to create order!" });
  }
}

export async function GET() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "You must be logged in!" },
      { status: 401 }
    );
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
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
