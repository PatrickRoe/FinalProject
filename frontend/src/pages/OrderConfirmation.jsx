// src/pages/OrderConfirmation.jsx

import { useEffect, useState } from "react";
import axios from "../api/axios";

function OrderConfirmation() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const response = await axios.get("/orders");
        if (response.data && response.data.length > 0) {
          setOrder(response.data[0]); // Get the most recent order
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchLatestOrder();
  }, []);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-4 font-serif">
        Thank You for Your Purchase!
      </h1>
      <p>Your order ID is: {order._id}</p>
      <p>A confirmation email has been sent to your email address.</p>
    </div>
  );
}

export default OrderConfirmation;
