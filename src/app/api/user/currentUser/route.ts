import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server"; // Importa o NextResponse
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

async function getSession() {
  return await getServerSession(authOptions);
}

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "No user session found" }, { status: 401 }); // Retorna erro de autenticação
    }

    const currentUser = await prisma.eComerceUser.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 }); // Usuário não encontrado
    }

    return NextResponse.json({
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 }); // Erro genérico de servidor
  }
}




// import { getServerSession } from "next-auth/next";
// import { NextResponse } from "next/server"; // Importa o NextResponse
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import prisma from "@/app/libs/prismadb";

// export async function getSession() {
//   return await getServerSession(authOptions);
// }

// export async function GET() {
//   try {
//     const session = await getSession();

//     if (!session?.user?.email) {
//       return NextResponse.json({ message: "No user session found" }, { status: 401 }); // Retorna erro de autenticação
//     }

//     const currentUser = await prisma.eComerceUser.findUnique({
//       where: {
//         email: session.user.email as string,
//       },
//     });

//     if (!currentUser) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 }); // Usuário não encontrado
//     }

//     return NextResponse.json({
//       ...currentUser,
//       createdAt: currentUser.createdAt.toISOString(),
//       updatedAt: currentUser.updatedAt.toISOString(),
//     });
//   } catch (err: any) {
//     console.log(err);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 }); // Erro genérico de servidor
//   }
// }
