// src/components/ProductCard.jsx
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="group block h-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
        {/* Image Section */}
        <div
          className="relative overflow-hidden"
          style={{ paddingTop: "100%" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {/* Product Info */}
        <div className="p-4 flex flex-col justify-center flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {product.name}
          </h3>
          <p className="mt-2 text-gold text-xl">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
