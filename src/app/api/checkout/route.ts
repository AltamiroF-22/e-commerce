import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { error } from "console";

export async function POST(req: Request) {
  const body = await req.json();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "User must be logged in" },
      { status: 400 }
    );
  }

  const {
    street,
    houseNumber,
    country,
    postalCode,
    city,
    phoneNumber,
    addressType,
    apartmentNumber,
    state,
    additionalInfo,
  } = body;

  const address = await prisma.address.create({
    data: {
      userId: currentUser.id,
      street,
      houseNumber,
      state,
      country,
      postalCode,
      city,
      phoneNumber,
      addressType,
      apartmentNumber,
      additionalInfo,
    },
  });

  return NextResponse.json(address, { status: 201 });
}

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return;

  try {
    const addresses = await prisma.address.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return NextResponse.json(addresses);
  } catch (err) {
    console.error("Failed to fetch addresses", err);
  }
}

export async function DELETE(req: Request) {
  const body = await req.json();

  const { addressId } = body;

  try {
    const addresses = await prisma.address.delete({
      where: {
        id: addressId,
      },
    });
    return NextResponse.json(addresses);
  } catch (err) {
    console.error("Failed to delete addresses", err);
  }
}
