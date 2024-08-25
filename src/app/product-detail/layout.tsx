import getCurrentUser from "../actions/getCurrentUser";
import { SafeUser } from "../types";
import ProductDetails from "./[id]/page";

const layout = async () => {
  const currentUser = await getCurrentUser();
  return <ProductDetails currentUser={currentUser as SafeUser} />;
};

export default layout;
