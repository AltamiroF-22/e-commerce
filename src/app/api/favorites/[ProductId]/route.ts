import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IDParams {
  ProductId: string;
}

export async function POST(req: Request, { params }: { params: IDParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      console.log("user error");
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const { ProductId } = params;

    if (!ProductId || typeof ProductId !== "string") {
      console.log("invalid id");
      console.log(ProductId)

      return NextResponse.json(
        { message: "Invalid Product ID" },
        { status: 400 }
      );
    }

    let favoriteIds = [...(currentUser.favoritesProducts || [])];

    if (favoriteIds.includes(ProductId)) {
      return NextResponse.json(
        { message: "Product already in favorites" },
        { status: 400 }
      );
    }

    favoriteIds.push(ProductId);

    const updatedUser = await prisma.eComerceUser.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoritesProducts: favoriteIds,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: IDParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { ProductId } = params;

  if (!ProductId || typeof ProductId !== "string")
    throw new Error("Invalid ID");

  let favoriteIds = [...(currentUser.favoritesProducts || [])];
  favoriteIds = favoriteIds.filter((favorited) => ProductId !== favorited);

  const user = await prisma.eComerceUser.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoritesProducts: favoriteIds,
    },
  });

  return NextResponse.json(user);
}
