import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function checkEmailExists(req: Request) {
  const body = await req.json();
  const { email } = body;

  const existingUser = await prisma.eComerceUser.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: "Email already exists" }, { status: 400 });
  }

  return null;
}
