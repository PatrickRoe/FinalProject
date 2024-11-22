// src/components/Header.jsx

import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { AdminContext } from '../context/AdminContext';
import axios from '../api/axios';

// Import Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBag,
  faUser,
  faSearch,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { isAdmin } = useContext(AdminContext);

  // State hooks for search functionality
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [cartCount, setCartCount] = useState(0); // State for cart item count

  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Fetch cart item count when component mounts or when isLoggedIn changes
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axios.get('/cart');
        const count = response.data?.products?.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setCartCount(count || 0);
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    if (isLoggedIn) {
      fetchCartCount();
    } else {
      setCartCount(0); // Reset cart count when user logs out
    }
  }, [isLoggedIn]);

  return (
    <header className="bg-white dark:bg-dark-gray text-black dark:text-white py-4 shadow-md fixed w-full z-50 font-serif">
      <nav className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          A M P E S
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8 items-center text-lg">
          <Link to="/shop/men" className="hover:text-gold">
            Men
          </Link>
          <Link to="/shop/women" className="hover:text-gold">
            Women
          </Link>
          <Link to="/shop/accessories" className="hover:text-gold">
            Accessories
          </Link>
          <Link to="/shop/shoes" className="hover:text-gold">
            Shoes
          </Link>
          <Link to="/about" className="hover:text-gold">
            About
          </Link>
        </div>
        {/* Right-side actions */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
            className="relative"
          >
            <FontAwesomeIcon icon={faSearch} className="text-xl" />
          </button>
          {/* Cart Icon */}
          {isLoggedIn && (
            <Link to="/cart" className="relative" aria-label="Cart">
              <FontAwesomeIcon icon={faShoppingBag} className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="text-xl"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? '🌞' : '🌜'}
          </button>
          {/* Login/Logout/Profile */}
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="hidden lg:block text-xl" aria-label="Admin Dashboard">
                  Admin
                </Link>
              )}
              <Link to="/profile" className="hidden lg:block text-xl" aria-label="Profile">
                Profile
              </Link>
              <button onClick={handleLogout} className="hidden lg:block text-xl" aria-label="Logout">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-xl" aria-label="Login">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          )}
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-xl"
            onClick={toggleMobileMenu}
            aria-label="Toggle Mobile Menu"
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </nav>
      {/* Mobile Navigation */}
      {/* Overlay for mobile menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      ></div>
      <nav
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white dark:bg-dark-gray text-black dark:text-white transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col space-y-4 p-6">
          <li>
            <Link
              to="/shop/men"
              className="hover:text-gold text-xl"
              onClick={toggleMobileMenu}
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              to="/shop/women"
              className="hover:text-gold text-xl"
              onClick={toggleMobileMenu}
            >
              Women
            </Link>
          </li>
          <li>
            <Link
              to="/shop/accessories"
              className="hover:text-gold text-xl"
              onClick={toggleMobileMenu}
            >
              Accessories
            </Link>
          </li>
          <li>
            <Link
              to="/shop/shoes"
              className="hover:text-gold text-xl"
              onClick={toggleMobileMenu}
            >
              Shoes
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-gold text-xl"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-gold text-xl"
                    onClick={toggleMobileMenu}
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/profile"
                  className="hover:text-gold text-xl"
                  onClick={toggleMobileMenu}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="hover:text-gold text-left text-xl w-full"
                >
                  Logout
                </button>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-gold text-xl"
                  onClick={toggleMobileMenu}
                >
                  Cart
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="hover:text-gold text-xl"
                onClick={toggleMobileMenu}
              >
                Login
              </Link>
            </li>
          )}
          {/* Mobile Search */}
          <li>
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 focus:outline-none bg-white dark:bg-gray-700 text-black dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-gold text-white px-4 py-2"
                >
                  Search
                </button>
              </div>
            </form>
          </li>
        </ul>
      </nav>
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white dark:bg-dark-gray bg-opacity-95 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-2xl"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close Search"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form onSubmit={handleSearchSubmit} className="w-full max-w-lg px-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md text-xl bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <button
              type="submit"
              className="mt-4 w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-md text-xl"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
}

export default Header;
