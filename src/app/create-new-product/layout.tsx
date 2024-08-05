import CreateProduct from "./page";
import getCurrentUser from "../actions/getCurrentUser";

export default async function RootLayout({}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="">
      <CreateProduct currentUser={currentUser} />
    </div>
  );
}
