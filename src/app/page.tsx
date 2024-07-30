"use client";

import Image from "next/image";
import ColorPickerComponent from "./components/inputs/....";
import Input from "./components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  // const currentUser = await getCurrentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <h1>{currentUser?.name}</h1> */}
    </main>
  );
}
