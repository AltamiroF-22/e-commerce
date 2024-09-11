import getCurrentUser from "../actions/getCurrentUser";
import getFavoritesProducts from "../actions/getFavoriteProducts";
import { ProductsProps } from "../page";
import { SafeUser } from "../types";
import Favorite from "./page";

export default async function Layout() {
  const favoritesProducts = await getFavoritesProducts();
  const currentUser = await getCurrentUser();

  return (
    <Favorite
      favoritesProducts={favoritesProducts as ProductsProps[]}
      currentUser={currentUser as SafeUser}
    />
  );
}
