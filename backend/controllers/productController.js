// controllers/productController.js

import Product from '../models/Product.js';
import cloudinary from '../utils/cloudinary.js';

export const getProducts = async (req, res) => {
  const category = req.query.category;
  let products;

  try {
    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchProducts = async (req, res) => {
  const query = req.query.q;

  try {
    const products = await Product.find({
      name: { $regex: query, $options: 'i' },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin functionalities
export const createProduct = async (req, res) => {
  const { name, price, category, description, imageUrl } = req.body;

  let image;

  if (req.file) {
    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;
    } catch (error) {
      return res.status(500).json({ message: 'Image upload failed' });
    }
  } else if (imageUrl) {
    image = imageUrl;
  }

  const product = new Product({
    name,
    price,
    category,
    image,
    description,
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, price, category, description, imageUrl } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (name) product.name = name;
    if (price) product.price = price;
    if (category) product.category = category;
    if (description) product.description = description;

    if (req.file) {
      try {
        // Upload new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        product.image = result.secure_url;
      } catch (error) {
        return res.status(500).json({ message: 'Image upload failed' });
      }
    } else if (imageUrl) {
      product.image = imageUrl;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
