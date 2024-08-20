import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "You must be logged in!" },
      { status: 401 }
    );
  }

  try {
    const cart = await prisma.cart.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        product: true, // Se você quiser incluir os detalhes do produto
      },
    });

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "You must be logged in!" },
      { status: 401 }
    );
  }

  const { productId, quantity } = await req.json();

  if (!productId || !quantity) {
    return NextResponse.json(
      { error: "Product ID and quantity are required" },
      { status: 400 }
    );
  }

  try {
    const cartItem = await prisma.cart.updateMany({
      where: {
        userId: currentUser.id,
        productId: productId,
      },
      data: {
        productQuantity: quantity,
      },
    });

    if (cartItem.count === 0) {
      return NextResponse.json(
        { error: "No cart item found to update" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Quantity updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating quantity:", error);
    return NextResponse.json(
      { error: "Failed to update quantity" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "You must be logged in!" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const res = await prisma.cart.deleteMany({
      where: {
        userId: currentUser.id,
        id: productId,
      },
    });

    if (res.count === 0) {
      return NextResponse.json(
        { error: "No item found to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { error: "Failed to delete item from cart" },
      { status: 500 }
    );
  }
}
