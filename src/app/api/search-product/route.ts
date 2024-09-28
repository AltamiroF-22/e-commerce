import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("searchTerm") || ""; // Obtém o termo da query string

  try {
    const products = await prisma.products.findMany({
      where: {
        title: {
          contains: searchTerm, // Busca produtos que contêm o termo de pesquisa no título
          mode: "insensitive",  // Faz a busca sem diferenciar maiúsculas e minúsculas
        },
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error();
  }
}
