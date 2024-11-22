function ShippingStep({
  nextStep,
  prevStep,
  shippingMethod,
  setShippingMethod,
}) {
  const handleNext = () => {
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shipping Method</h2>
      {/* Shipping Options */}
      <div className="mb-4">
        <label className="block mb-2">
          <input
            type="radio"
            name="shippingMethod"
            value="standard"
            checked={shippingMethod === "standard"}
            onChange={(e) => setShippingMethod(e.target.value)}
            className="mr-2"
          />
          Standard Shipping (5-7 days) - $5.00
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="shippingMethod"
            value="express"
            checked={shippingMethod === "express"}
            onChange={(e) => setShippingMethod(e.target.value)}
            className="mr-2"
          />
          Express Shipping (2-3 days) - $15.00
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="shippingMethod"
            value="overnight"
            checked={shippingMethod === "overnight"}
            onChange={(e) => setShippingMethod(e.target.value)}
            className="mr-2"
          />
          Overnight Shipping (1 day) - $25.00
        </label>
      </div>
      {/* Navigation Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-black px-6 py-2 rounded-md"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-black text-white px-6 py-2 rounded-md"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

export default ShippingStep;
