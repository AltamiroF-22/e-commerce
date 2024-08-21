import axios from "axios";

const getCartItems = async () => {
  try {
    const response = await axios.get("/api/cart");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch cart items:", err);
  }
};

export default getCartItems;
