// src/pages/Checkout.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressStep from "../components/AddressStep";
import ShippingStep from "../components/ShippingStep";
import PaymentStep from "../components/PaymentStep";
import ReviewStep from "../components/ReviewStep";
import CartSummary from "../components/CartSummary";

function Checkout() {
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({});
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [orderTotal, setOrderTotal] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="container mx-auto py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Side: Forms */}
      <div className="col-span-2">
        <h1 className="text-4xl font-bold mb-6 font-serif">Checkout</h1>
        <div className="flex space-x-4 mb-6 text-lg">
          <span className={step === 1 ? "font-bold" : ""}>Address</span>
          <span>—</span>
          <span className={step === 2 ? "font-bold" : ""}>Shipping</span>
          <span>—</span>
          <span className={step === 3 ? "font-bold" : ""}>Payment</span>
          <span>—</span>
          <span className={step === 4 ? "font-bold" : ""}>Review</span>
        </div>
        {step === 1 && (
          <AddressStep
            nextStep={nextStep}
            setShippingAddress={setShippingAddress}
          />
        )}
        {step === 2 && (
          <ShippingStep
            nextStep={nextStep}
            prevStep={prevStep}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
          />
        )}
        {step === 3 && (
          <PaymentStep
            nextStep={nextStep}
            prevStep={prevStep}
            setPaymentDetails={setPaymentDetails}
            shippingMethod={shippingMethod} // Pass shippingMethod
          />
        )}
        {step === 4 && (
          <ReviewStep
            shippingAddress={shippingAddress}
            shippingMethod={shippingMethod}
            paymentDetails={paymentDetails}
            prevStep={prevStep}
            navigate={navigate}
            setOrderTotal={setOrderTotal}
          />
        )}
      </div>
      {/* Right Side: Cart Summary */}
      <div>
        <h2 className="text-2xl font-bold mb-4 font-serif">Order Summary</h2>
        <CartSummary />
      </div>
    </div>
  );
}

export default Checkout;
