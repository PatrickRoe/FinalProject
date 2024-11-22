// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Bentobox from "../components/Bentobox";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Marquee from "react-fast-marquee";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchShoeProducts = async () => {
      try {
        const response = await axios.get("/products?category=shoes");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching shoes:", error);
        // Handle error
      }
    };
    fetchShoeProducts();
  }, []);

  const modules = [
    {
      className: "col-span-2 row-span-2",
      content: (
        <Link
          to="/shop/men"
          className="relative block h-full group rounded-lg overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Men's Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl font-serif">Men's Collection</h2>
          </div>
        </Link>
      ),
    },
    {
      className: "col-span-2 row-span-1",
      content: (
        <Link
          to="/shop/women"
          className="relative block h-full group rounded-lg overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Women's Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl font-serif">Women's Collection</h2>
          </div>
        </Link>
      ),
    },
    {
      className: "col-span-2 row-span-1",
      content: (
        <Link
          to="/shop/accessories"
          className="relative block h-full group rounded-lg overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1710552524021-a8dc68c2a8dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Accessories"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl font-serif">Accessories</h2>
          </div>
        </Link>
      ),
    },
  ];

  return (
    <div>
      {/* Bentobox Section */}
      <section className="py-16">
        <Bentobox modules={modules} />
      </section>
      {/* Shoes Section */}
      <section className="py-16">
        <h2 className="text-4xl font-bold mb-8 text-center font-serif">
          Shoes
        </h2>
        {/* Marquee */}
        <Marquee speed={60} pauseOnHover={true} gradient={false}>
          <div className="flex space-x-6">
            {products.map((product) => (
              <div key={product._id} className="w-64 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </Marquee>
        {/* View All Shoes Button */}
        <div className="text-center mt-8">
          <Link
            to="/shop/shoes"
            className="bg-black text-white py-3 px-6 rounded-md hover:bg-gold transition-colors"
          >
            View All Shoes
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
