import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();
    const {
      title,
      description,
      imagesSrc,
      imageSrc,
      price,
      category,
      genderSelect,
      choices,
    } = body;

    // Criar o produto
    const product = await prisma.products.create({
      data: {
        title,
        price: Number(price),
        description,
        images: imagesSrc,
        mainImage: imageSrc,
        category,
        gender: genderSelect,
        eComerceUserId: currentUser?.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Processar variantes de produto
    for (const { color, size, stock } of choices) {
      // Criar ou encontrar a cor
      const colorEntity = await prisma.color.upsert({
        where: { name: color },
        update: {},
        create: { name: color },
      });

      // Criar ou encontrar o tamanho
      const sizeEntity = await prisma.size.upsert({
        where: { name: size },
        update: {},
        create: { name: size },
      });

      // Verificar se a variante já existe
      const existingVariant = await prisma.productVariant.findFirst({
        where: {
          productId: product.id,
          colorId: colorEntity.id,
          sizeId: sizeEntity.id,
        },
      });

      if (existingVariant) {
        // Atualizar o estoque da variante existente
        await prisma.productVariant.update({
          where: { id: existingVariant.id },
          data: { stock: existingVariant.stock + stock },
        });
      } else {
        // Criar uma nova variante
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            colorId: colorEntity.id,
            sizeId: sizeEntity.id,
            stock,
          },
        });
      }
    }

    return NextResponse.json({ message: "Product created!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error to create the product!." });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    const products = await prisma.products.findMany({
      skip: offset,
      take: limit,
    });

    const totalProducts = await prisma.products.count();

    return NextResponse.json(
      {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
      },

      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products!" },
      { status: 500 }
    );
  }
}
