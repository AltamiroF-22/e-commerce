"use client";

import { useEffect, useState } from "react";
import Container from "../components/Container";
import axios from "axios";
import Image from "next/image";
import getOrders from "../actions/getOrders";

interface orderProductsProps {
  productId: string;
  sizeName: string;
  colorName: string;
  sizeId: string;
  colorId: string;
  productImage: string;
  productTitle: string;
  productCategory: string;
  productQuantity: number;
}

const OrdersPage = () => {
  const [orderProducts, setOrderProducts] = useState<orderProductsProps[]>([]);

  useEffect(() => {
    fetchOrderProducts();
  }, []);

  // Função para buscar as ordens
  const fetchOrderProducts = async () => {
    try {
      const orders = await getOrders(); // Chama a função de requisição
      if (orders) {
        // A API retorna um array de ordens, então você pode precisar ajustar como acessa os produtos
        const allProducts = orders.flatMap((order: any) => order.orderProducts);
        setOrderProducts(allProducts);
      }
    } catch (error) {
      console.error("Failed to fetch order products", error);
    }
  };

  return (
    <Container>
      <div>
        <h1 className="mb-20">Orders</h1>

        {orderProducts.length > 0 ? (
          <div className=" flex flex-col gap-5">
            {orderProducts.map((order) => (
             <>
              <div
                key={order.productId}
                className="flex w-full gap-6 items-center justify-between"
              >
                <div className="relative w-[40vh] h-[40vh]">
                  <Image
                    alt={order.productTitle}
                    src={order.productImage}
                    fill
                    className="absolute aspect-square object-cover object-center"
                  />
                </div>
                <div className="text-start w-[80%]">
                  <h1>{order.productTitle}</h1>
                  <p>Size: {order.sizeName}</p>
                  <div
                    style={{ background: order.colorName }}
                    className="w-6 h-6 rounded-full"
                  ></div>
                </div>
              </div>
              <hr className="my-3" />
             </>
            ))}
            
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </Container>
  );
};

export default OrdersPage;
