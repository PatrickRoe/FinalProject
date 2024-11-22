// src/pages/AdminDashboard.jsx
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import OrdersAdmin from "../components/OrdersAdmin";
import UsersAdmin from "../components/UsersAdmin";
import ProductsAdmin from "../components/ProductsAdmin";

function AdminDashboard() {
  const { isAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    if (!isAdmin) {
      navigate("/"); // Redirect non-admin users to home
    }
  }, [isAdmin, navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersAdmin />;
      case "users":
        return <UsersAdmin />;
      default:
        return <ProductsAdmin />;
    }
  };

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8 font-serif">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "products"
              ? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "orders"
              ? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "users"
              ? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          }`}
        >
          Users
        </button>
      </div>
      {renderContent()}
    </div>
  );
}

export default AdminDashboard;
