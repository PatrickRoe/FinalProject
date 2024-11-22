// src/pages/Login.jsx

import { useState, useContext } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      login(response.data.accessToken);
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-dark-gray p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center font-serif">
          Welcome Back
        </h2>
        <p className="text-center mb-6">Login with your email</p>
        {errorMessage && (
          <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md mb-4 bg-white dark:bg-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md mb-4 bg-white dark:bg-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-between items-center mb-4">
            <label>
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <Link to="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button className="w-full bg-black text-white py-2 rounded-md mb-4">
            Login
          </button>
        </form>
        <p className="text-center">
          Or{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
