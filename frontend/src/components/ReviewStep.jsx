// src/components/ReviewStep.jsx

import axios from "../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ReviewStep({
  shippingAddress,
  shippingMethod,
  paymentDetails,
  prevStep,
  navigate,
  setOrderTotal,
}) {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/cart");
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    // Validate that shippingAddress has all required fields
    const requiredFields = [
      "fullName",
      "addressLine1",
      "city",
      "state",
      "zipCode",
      "country",
      "phoneNumber",
    ];
    for (const field of requiredFields) {
      if (!shippingAddress[field] || !shippingAddress[field].trim()) {
        alert(`Shipping address is incomplete. Please provide ${field}.`);
        return;
      }
    }

    // Calculate shipping cost
    const shippingCost =
      shippingMethod === "standard" ? 5 : shippingMethod === "express" ? 15 : 25;

    try {
      await axios.post("/orders", {
        shippingAddress,
        shippingMethod,
        paymentIntentId: paymentDetails.paymentIntentId,
        shippingCost, // Pass shippingCost to the backend
      });
      // Redirect to order confirmation page
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        alert(error.response.data.message || "An error occurred while placing your order.");
      }
    }
  };

  if (!cart) {
    return <p>Loading...</p>;
  }

  const subtotal = cart.products.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const shippingCost =
    shippingMethod === "standard" ? 5 : shippingMethod === "express" ? 15 : 25;
  const total = subtotal + shippingCost;
  setOrderTotal(total);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Review Your Order</h2>
      {/* Display order summary */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Shipping Address</h3>
        <p>{shippingAddress.fullName}</p>
        <p>{shippingAddress.addressLine1}</p>
        {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
        <p>
          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
        </p>
        <p>{shippingAddress.country}</p>
        <p>{shippingAddress.phoneNumber}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Shipping Method</h3>
        <p>{shippingMethod.charAt(0).toUpperCase() + shippingMethod.slice(1)}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Items</h3>
        {cart.products.map((item) => (
          <div
            key={`${item.productId._id}-${item.size}`}
            className="flex justify-between mb-2"
          >
            <div>
              <p>{item.productId.name}</p>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <p>${(item.productId.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between">
          <p>Subtotal:</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping:</p>
          <p>${shippingCost.toFixed(2)}</p>
        </div>
        <div className="flex justify-between font-bold">
          <p>Total:</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-black px-6 py-2 rounded-md"
        >
          Back
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-black text-white px-6 py-2 rounded-md"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default ReviewStep;
