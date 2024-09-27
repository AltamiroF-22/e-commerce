"use client";

import { useEffect, useState } from "react";
import Container from "../components/Container";
import Image from "next/image";
import getOrders from "../actions/getOrders";
import { useRouter } from "next/navigation";

interface orderProductsProps {
  productId: string;
  productPrice: number;
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

  const router = useRouter();

  useEffect(() => {
    fetchOrderProducts();
  }, []);

  // Função para buscar as ordens
  const fetchOrderProducts = async () => {
    try {
      const orders = await getOrders();
      if (orders) {
        const allProducts = orders.flatMap((order: any) => order.orderProducts);
        setOrderProducts(allProducts);
        console.log(allProducts);
      }
    } catch (error) {
      console.error("Failed to fetch order products", error);
    }
  };

  return (
    <Container>
      <div>
        <h1 className="mb-8 text-xl font-semibold">Orders</h1>

        {orderProducts.length > 0 ? (
          <div className="">
            <table className="min-w-full md:table-auto">
              <thead className="hidden md:table-header-group">
                <tr className="border-b text-left">
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Info</th>
                </tr>
              </thead>
              <tbody className="flex flex-col items-center md:table-row-group">
                {orderProducts.map((order) => (
                  <tr
                    key={order.productId}
                    className="border-b block md:table-row"
                  >
                    {/* Mobile-first layout */}
                    <td className="px-4 py-4 flex flex-col md:table-cell items-start md:flex-row md:items-center space-y-2 md:space-x-4">
                      <div className="flex flex-col md:flex-row gap-4 md:items-center">
                        <div className="relative w-[87vw] h-[87vw] md:w-24 md:h-24">
                          <Image
                            alt={order.productTitle}
                            src={order.productImage}
                            fill
                            className="object-cover object-center rounded"
                          />
                        </div>
                        <div>
                          <h1 className="font-medium">{order.productTitle}</h1>

                          <div className="flex items-center justify-start gap-2">
                            <p className="text-sm flex items-center gap-2 text-gray-500">
                              Size: {order.sizeName}, Color:{" "}
                              <div
                                style={{ background: order.colorName }}
                                className="w-10 h-3 rounded-full"
                              ></div>
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Preço */}
                    <td className="px-4 py-4 text-sm md:table-cell">
                      <p>
                        {order.productQuantity} x $
                        {order.productPrice.toFixed(2)}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-sm  md:table-cell">
                      {/* {order.status} */}
                      Default
                    </td>

                    {/* Info com link para o produto */}
                    <td className="px-4 py-4 text-sm  text-blue-500 md:table-cell">
                      <p
                        className="cursor-pointer transition hover:underline"
                        onClick={() =>
                          router.push(`/product-detail/${order.productId}`)
                        }
                      >
                        View Product
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center mt-20">No orders found.</p>
        )}
      </div>
    </Container>
  );
};

export default OrdersPage;
