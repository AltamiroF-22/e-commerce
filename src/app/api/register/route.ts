import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.eComerceUser.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
