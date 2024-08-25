import CreateProduct from "./page";
import getCurrentUser from "../actions/getCurrentUser";
import { SafeUser } from "../types";

export default async function RootLayout({}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="">
      <CreateProduct currentUser={currentUser as SafeUser} />
    </div>
  );
}
