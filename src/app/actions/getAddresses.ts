import axios from "axios";

const getAddresses = async () => {
    try {
        const response = await axios.get("/api/checkout");
        return response.data;
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      }
}

export default getAddresses