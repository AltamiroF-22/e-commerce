import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import ToastProvider from "./providers/ToastProvider";
import LoginModal from "./components/modals/LoginModal";
import CreateModal from "./components/modals/CreateModal";
import getCurrentUser from "./actions/getCurrentUser";
import Navbar from "./components/navbar/Navbar";
import { SafeUser } from "./types";
import ReviewModal from "./product-detail/[id]/components/ReviewModal";
import CartModal from "./components/modals/CartModal";
import { CartProvider } from "./context/CartContex";
import AvatarModal from "./components/modals/AvatarModal";

export const metadata: Metadata = {
  title: "WardrobeWonders",
  description:
    "Discover the latest fashion trends and elevate your style with WardrobeWonders.",
  // openGraph: {
  //   title: "WardrobeWonders",
  //   description:
  //     "Discover the latest fashion trends and elevate your style with WardrobeWonders.",
  //   url: "https://www.seusite.com", // Altere para a URL do seu site
  //   images: [
  //     {
  //       url: "https://www.seusite.com/caminho/para/sua/imagem.jpg", // URL da imagem que você quer usar
  //       width: 800,
  //       height: 600,
  //       alt: "Descrição da imagem",
  //     },
  //   ],
  //   siteName: "WardrobeWonders",
  // },
  icons: {
    icon: "/favicon.svg",
  },
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <CartProvider>
          <div className="absolute">
            <ToastProvider />
            <Navbar currentUser={currentUser as SafeUser} />
            <LoginModal />
            <CreateModal />
            <CartModal currentUser={currentUser as SafeUser} />
            <ReviewModal />
            <AvatarModal />
          </div>

          <div className="pb-28 pt-28">
            {children} {modal}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
