// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: 'Men’s Winter Jacket',
    price: 299,
    category: 'men',
    image: 'https://via.placeholder.com/300x400',
    description: 'High-quality men\'s winter jacket.',
  },
  {
    name: 'Women’s Silk Dress',
    price: 499,
    category: 'women',
    image: 'https://via.placeholder.com/300x400',
    description: 'Elegant women\'s silk dress.',
  },
  // Add more products as needed
];

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    try {
      await Product.deleteMany({});
      await Product.insertMany(products);
      console.log('Data seeded');
      mongoose.connection.close();
    } catch (err) {
      console.error(err);
    }
  })
  .catch((err) => console.log(err));
