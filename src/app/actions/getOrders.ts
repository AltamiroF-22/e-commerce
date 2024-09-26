import axios from "axios";

const getOrders = async () => {
  try {
    const response = await axios.get("/api/order");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch Orders", err);
  }
};

export default getOrders;
