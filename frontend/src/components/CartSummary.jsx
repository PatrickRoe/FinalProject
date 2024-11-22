// src/components/CartSummary.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";

function CartSummary() {
  const [cart, setCart] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

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

  const handleApplyDiscount = async () => {
    try {
      const response = await axios.post("/cart/apply-discount", {
        code: discountCode,
      });
      setDiscountAmount(response.data.amount);
      alert("Discount applied successfully!");
    } catch (error) {
      console.error("Error applying discount:", error);
      alert("Invalid discount code.");
    }
  };

  if (!cart || !cart.products.length) return <p>Your cart is empty.</p>;

  const subtotal = cart.products.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const total = subtotal - discountAmount;

  return (
    <div>
      {cart.products.map((item) => (
        <div
          key={`${item.productId._id}-${item.size}`}
          className="flex justify-between mb-4"
        >
          <div>
            <p className="font-bold">{item.productId.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Size: {item.size}</p>
          </div>
          <p>${(item.productId.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      {/* Discount Code */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Discount Code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md mb-2 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <button
          onClick={handleApplyDiscount}
          className="bg-black text-white px-4 py-2 rounded-md w-full hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Apply Discount
        </button>
      </div>
      {/* Summary */}
      <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
        <div className="flex justify-between">
          <p>Subtotal:</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between">
            <p>Discount:</p>
            <p>-${discountAmount.toFixed(2)}</p>
          </div>
        )}
        <div className="flex justify-between font-bold">
          <p>Total:</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
