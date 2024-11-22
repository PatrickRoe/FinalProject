// src/components/PaymentStep.jsx
import { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../api/axios";

function PaymentStep({
  nextStep,
  prevStep,
  setPaymentDetails,
  shippingMethod,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  // Calculate shipping cost
  const shippingCost =
    shippingMethod === "standard" ? 5 : shippingMethod === "express" ? 15 : 25;

  useEffect(() => {
    // Create Payment Intent when component mounts
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post("/payment/create-payment-intent", {
          shippingCost, // Pass shippingCost to the backend
        });
        setClientSecret(response.data.clientSecret);
        setPaymentIntentId(response.data.paymentIntentId); // Store the paymentIntentId
      } catch (error) {
        console.error("Error creating payment intent:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      }
    };
    createPaymentIntent();
  }, [shippingCost]);

  const handleNext = async () => {
    if (!stripe || !elements || !clientSecret) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );
    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Payment succeeded, save paymentIntent.id
      setPaymentDetails({ paymentIntentId: paymentIntentId }); // Use stored paymentIntentId
      nextStep();
    } else {
      setErrorMessage("Payment was not successful. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
      <div className="mb-4">
        <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-md bg-white dark:bg-gray-800">
          <CardElement className="w-full" />
        </div>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {/* Navigation Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-6 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Continue to Review
        </button>
      </div>
    </div>
  );
}

export default PaymentStep;
