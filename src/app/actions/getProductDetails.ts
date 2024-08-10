import prisma from "@/app/libs/prismadb";

export default async function getProductDetail(id: string) {
  const product = await prisma.products.findUnique({
    where: {
      id,
    },
  });

  if (!product) return null;

  return {
    ...product,
    createdAt: product.createdAt.toISOString(),
  };
}
