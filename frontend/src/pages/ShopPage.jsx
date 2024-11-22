// src/pages/ShopPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import ProductCard from '../components/ProductCard';

function ShopPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/products${category ? `?category=${category}` : ''}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="container mx-auto py-16 mt-12">
      <h1 className="text-4xl font-bold mb-8 text-center font-serif">
        {category
          ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
          : 'Shop All'}
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No products found in this category.</p>
      )}
    </div>
  );
}

export default ShopPage;
