import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import ToastProvider from "./providers/ToastProvider";
import LoginModal from "./components/modals/LoginModal";
import CreateModal from "./components/modals/CreateModal";

import getCurrentUser from "./actions/getCurrentUser";
import Navbar from "./components/navbar/Navbar";
import { SafeUser } from "./types";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <div className="absolute">
          <ToastProvider />
          <Navbar currentUser={currentUser as SafeUser} />
          <LoginModal />
          <CreateModal />
        </div>

        <div className="pb-28 pt-28">
          {children} {modal}
        </div>
      </body>
    </html>
  );
}
