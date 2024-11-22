// src/components/Footer.jsx
import { useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
function Footer() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setEmail("");
  };
  return (
    <footer className="bg-white dark:bg-dark-gray text-black dark:text-white py-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Subscription */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-4 font-serif">
            Join Our Newsletter
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center items-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-2 text-black dark:text-white rounded-md mb-4 sm:mb-0 sm:mr-4 bg-gray-100 dark:bg-gray-700"
              required
            />
            <button
              type="submit"
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://www.facebook.com/YourBrand"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold"
            aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://www.instagram.com/YourBrand"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
        </div>
        {/* Footer Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="/about" className="hover:text-gold">
              About Us
            </a>
            <a href="/contact" className="hover:text-gold">
              Contact
            </a>
            <a href="/privacy" className="hover:text-gold">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-gold">
              Terms of Service
            </a>
          </div>
          <p>
            &copy; {new Date().getFullYear()} A M P E S. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;