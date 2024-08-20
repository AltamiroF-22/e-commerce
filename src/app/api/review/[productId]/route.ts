import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IDParams {
  productId: string;
}


/** pegar user e ver se o id do produto consta no historico de compra se sim pode review se n, n
 * 
 */
export async function POST(req: Request, { params }: { params: IDParams }) {

    const body = await req.json();
  }
  