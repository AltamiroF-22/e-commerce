import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  const body = await req.json();
  const { AvatarSrc } = body;

  if (!currentUser) return NextResponse.json({ error: "You must be logged in!" });

  try {
    const response = await prisma.eComerceUser.update({
      where: {
        id: currentUser.id,
      },
      data: {
        picture: AvatarSrc,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update avatar!" });
  }
}
