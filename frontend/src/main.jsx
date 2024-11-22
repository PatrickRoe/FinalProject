import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Q7Xni08D9sd9eoMILr5LvHRJi9YMrTT1YjhjmjT7TG7NnIUb3RDebbTlUCv4N0eaeBBRFuKRqmjVeR1sHYY5u8b00zV6dwBzi"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AdminProvider>
          <Router>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </Router>
        </AdminProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
