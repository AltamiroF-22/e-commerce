import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IDParams {
  productId: string;
}

export async function GET(req: Request, { params }: { params: IDParams }) {
  const { productId } = params;

  console.log(`-----------------product id here: ${productId}`);

  if (!productId) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const product = await prisma.products.findUnique({
      where: {
        id: productId,
      },
      include: {
        variants: {
          include: {
            color: true,
            size: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prismadb";

// interface IDParams {
//   productId: string;
// }
// export async function GET(req: Request, { params }: { params: IDParams }) {
//   const { productId } = params;

//   console.log(`-----------------product id here: ${productId}`);

//   if (!productId) {
//     return NextResponse.json({ error: "ID is required" }, { status: 400 });
//   }

//   const product = await prisma.products.findUnique({
//     where: {
//       id: productId,
//     },
//   });

//   if (!product) {
//     return NextResponse.json({ error: "Product not found" }, { status: 404 });
//   }

//   return NextResponse.json(product);
// }
