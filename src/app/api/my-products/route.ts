import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.json([]);

    const myProducts = await prisma.products.findMany({
      where: {
        eComerceUserId: currentUser.id,
      },
    });

    return NextResponse.json(myProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, res: NextResponse) {
  try {
    const body = await req.json();
    const { productId } = body;
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    if (!productId || typeof productId !== "string")
      throw new Error("Invalid ID");

    // Primeiro, remover todas as referências ao produto no Cart
    await prisma.cart.deleteMany({
      where: {
        productId: productId,
      },
    });

    // Agora, deletar o produto
    const deletedProduct = await prisma.products.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
