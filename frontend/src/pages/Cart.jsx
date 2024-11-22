// src/pages/Cart.jsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
        // Handle error
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (productId, size) => {
    try {
      await axios.post('/cart/remove', { productId, size });
      // Update the cart state
      setCart((prevCart) => ({
        ...prevCart,
        products: prevCart.products.filter(
          (item) => item.productId._id !== productId || item.size !== size
        ),
      }));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      // Handle error
    }
  };

  if (!cart || !cart.products.length)
    return (
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-8 font-serif">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8 font-serif">Your Cart</h1>
      {/* Cart items */}
      <div className="bg-white dark:bg-dark-gray p-4 rounded-md shadow-md">
        {cart.products.map((item) => (
          <div key={item.productId._id} className="flex justify-between mb-4">
            <div className="flex items-center">
              <img
                src={item.productId.image}
                alt="Product"
                className="w-24 h-24 object-cover mr-4"
              />
              <div>
                <h3 className="font-bold font-serif">{item.productId.name}</h3>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p className="font-bold text-gold">
                  ${item.productId.price * item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.productId._id, item.size)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        {/* Proceed to Checkout */}
        <div className="text-right mt-4">
          <Link
            to="/checkout"
            className="bg-black text-white py-3 px-6 rounded-md"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
