import getCurrentUser from "../actions/getCurrentUser";
// import { SafeUser } from "../types";
import Checkout from "./page";

export default async function RootLayout({}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="">
      <Checkout currentUser={currentUser as any} />
    </div>
  );
}
