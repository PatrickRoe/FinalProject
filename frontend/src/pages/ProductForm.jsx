// src/pages/ProductForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

function ProductForm() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name:        '',
    price:       '',
    category:    '',
    description: '',
    imageUrl:    '', // For image URL
  });

  const [imageFile, setImageFile] = useState(null); // For image upload
  const [useImageUrl, setUseImageUrl] = useState(false); // Toggle between image URL and file upload

  useEffect(() => {
    if (productId) {
      // Fetch existing product data
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/products/${productId}`);
          setProductData(response.data);
          if (response.data.image) {
            setUseImageUrl(true);
            setProductData((prevData) => ({ ...prevData, imageUrl: response.data.image }));
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('category', productData.category);
      formData.append('description', productData.description);

      if (useImageUrl) {
        formData.append('imageUrl', productData.imageUrl);
      } else if (imageFile) {
        formData.append('image', imageFile);
      }

      if (productId) {
        // Update product
        await axios.put(`/products/${productId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Create new product
        await axios.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-2xl font-bold mb-8 font-serif">
        {productId ? 'Edit Product' : 'Add New Product'}
      </h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto" encType="multipart/form-data">
        {/* Name */}
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
        </div>
        {/* Price */}
        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
        </div>
        {/* Category */}
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="accessories">Accessories</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-md"
            rows="5"
            required
          ></textarea>
        </div>
        {/* Image */}
        <div className="mb-4">
          <label className="block mb-2">Image</label>
          <div className="mb-2">
            <label className="mr-4">
              <input
                type="radio"
                checked={!useImageUrl}
                onChange={() => setUseImageUrl(false)}
              />
              Upload Image
            </label>
            <label>
              <input
                type="radio"
                checked={useImageUrl}
                onChange={() => setUseImageUrl(true)}
              />
              Use Image URL
            </label>
          </div>
          {useImageUrl ? (
            <input
              type="text"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Enter Image URL"
            />
          ) : (
            <input
              type="file"
              name="image"
              onChange={handleImageFileChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          )}
        </div>
        {/* Submit Button */}
        <button className="bg-black text-white px-6 py-2 rounded-md">
          {productId ? 'Update Product' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
