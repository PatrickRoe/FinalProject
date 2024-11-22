// src/pages/ProductPage.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');

  // Define size options
  const shoeSizes = [39, 40, 41, 42, 43, 44, 45]; // European sizes
  const clothingSizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${productId}`);
        setProduct(response.data);

        // Set default size based on category
        if (response.data.category === "shoes") {
          setSize(shoeSizes[0].toString());
        } else {
          setSize(clothingSizes[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Handle error
      }
    };

    fetchProduct();
  }, [productId]);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    try {
      await axios.post('/cart/add', {
        productId: product._id,
        quantity: Number(quantity),
        size,
      });
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error
    }
  };

  if (!product) return <div>Loading...</div>;

  // Determine size options based on category
  let sizeOptions = [];
  if (product.category === "shoes") {
    sizeOptions = shoeSizes;
  } else {
    sizeOptions = clothingSizes;
  }

  return (
    <div className="container mx-auto py-16 grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-bold mb-4 font-serif">{product.name}</h1>
        <p className="text-xl mb-4 text-gold">${product.price}</p>
        <p className="mb-8">{product.description}</p>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            <button onClick={decreaseQuantity} className="border border-gray-300 dark:border-gray-600 px-2 py-1">
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button onClick={increaseQuantity} className="border border-gray-300 dark:border-gray-600 px-2 py-1">
              +
            </button>
          </div>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            {sizeOptions.map((sizeOption) => (
              <option key={sizeOption} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
        </div>
        <p className="mb-8">Height of model: 189 cm. / 6’ 2” Size 41</p>
        <div className="flex space-x-4">
          <button
            onClick={handleAddToCart}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-md"
          >
            Add to Cart - ${(quantity * product.price).toFixed(2)}
          </button>
          {/* Implement Buy Now functionality if needed */}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
