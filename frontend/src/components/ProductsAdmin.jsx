// src/components/ProductsAdmin.jsx

import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function ProductsAdmin() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/products/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <button
        onClick={() => navigate('/admin/products/new')}
        className="mb-4 bg-black text-white px-4 py-2 rounded-md"
      >
        Add New Product
      </button>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-4 py-2 border">{product.name}</td>
              <td className="px-4 py-2 border">${product.price}</td>
              <td className="px-4 py-2 border">{product.category}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                  className="mr-2 bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsAdmin;
