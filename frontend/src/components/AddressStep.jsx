// src/components/AddressStep.jsx
import { useState } from "react";

function AddressStep({ nextStep, setShippingAddress }) {
  const [address, setAddress] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!address.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!address.addressLine1.trim())
      newErrors.addressLine1 = "Address Line 1 is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.state.trim()) newErrors.state = "State is required";
    if (!address.zipCode.trim()) newErrors.zipCode = "Zip Code is required";
    if (!address.country.trim()) newErrors.country = "Country is required";
    if (!address.phoneNumber.trim())
      newErrors.phoneNumber = "Phone Number is required";
    setErrors(newErrors);
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setShippingAddress(address);
      nextStep();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="col-span-2">
          <label className="block mb-2">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={address.fullName}
            onChange={handleChange}
            className={`w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white ${
              errors.fullName ? "border-red-500" : ""
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>
        {/* Address Line 1 */}
        <div className="col-span-2">
          <label className="block mb-2">Address Line 1 *</label>
          <input
            type="text"
            name="addressLine1"
            value={address.addressLine1}
            onChange={handleChange}
            className={`w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white ${
              errors.addressLine1 ? "border-red-500" : ""
            }`}
          />
          {errors.addressLine1 && (
            <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>
          )}
        </div>
        {/* Address Line 2 */}
        <div className="col-span-2">
          <label className="block mb-2">Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            value={address.addressLine2}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </div>
        {/* City */}
        <div>
          <label className="block mb-2">City *</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            className={`w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white ${
              errors.city ? "border-red-500" : ""
            }`}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
        {/* State */}
        <div>
          <label className="block mb-2">State *</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            className={`w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white ${
              errors.state ? "border-red-500" : ""
            }`}
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
          )}
        </div>
        {/* Zip Code */}
        <div>
          <label className="block mb-2">Zip Code *</label>
          <input
            type="text"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            className={`w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white ${
              errors.zipCode ? "border-red-500" : ""
            }`}
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
          )}
        </div>
        {/* Country */}
        <div>
          <label className="block mb-2">Country *</label>
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
            className={`w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white ${
              errors.country ? "border-red-500" : ""
            }`}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>
        {/* Phone Number */}
        <div className="col-span-2">
          <label className="block mb-2">Phone Number *</label>
          <input
            type="text"
            name="phoneNumber"
            value={address.phoneNumber}
            onChange={handleChange}
            className={`w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white ${
              errors.phoneNumber ? "border-red-500" : ""
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleNext}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Continue to Shipping
        </button>
      </div>
    </div>
  );
}

export default AddressStep;
