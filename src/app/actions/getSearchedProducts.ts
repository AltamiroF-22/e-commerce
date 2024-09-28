import prisma from "@/app/libs/prismadb";

interface paramsProps {
  title?: string;
}

export default async function getSearchedProducts(params: paramsProps) {
  try {
    const { title } = params;

    let query: any = {};

    if (title) query.title = title;

    const products = await prisma.products.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeProducts = products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
    }));

    return safeProducts;
  } catch (err: any) {
    throw new Error("Failed to fetch products. Please try again later.");
  }
}
