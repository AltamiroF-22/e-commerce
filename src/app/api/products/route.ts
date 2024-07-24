import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, images, mainImage, category, gender, choises } = body;

    // Criar o produto
    const product = await prisma.products.create({
      data: {
        title,
        description,
        images,
        mainImage,
        category,
        gender,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Processar variantes de produto
    for (const { color, size, stock } of choises) {
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

    return NextResponse.json({ message: "Produto criado com sucesso!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar o produto." });
  }
}
