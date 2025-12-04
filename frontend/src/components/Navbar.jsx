import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="w-full bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <Link to="/" className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            ProTask
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1">
          <Link 
            to="/" 
            className="px-4 py-2.5 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-xl hover:bg-blue-50 font-medium flex items-center space-x-1"
          >
            <span>Home</span>
          </Link>
          
          <Link 
            to="/features" 
            className="px-4 py-2.5 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-xl hover:bg-blue-50 font-medium"
          >
            Features
          </Link>

          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="px-4 py-2.5 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-xl hover:bg-blue-50 font-medium flex items-center space-x-1">
              <span>Services</span>
              <FiChevronDown className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-xl shadow-lg border border-gray-100 py-2 animate-fadeIn">
                <Link to="/enterprise" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                  Enterprise Solutions
                </Link>
                <Link to="/team" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                  Team Management
                </Link>
                <Link to="/analytics" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                  Analytics
                </Link>
              </div>
            )}
          </div>

          <Link 
            to="/pricing" 
            className="px-4 py-2.5 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-xl hover:bg-blue-50 font-medium"
          >
            Pricing
          </Link>

          <Link 
            to="/contact" 
            className="px-4 py-2.5 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-xl hover:bg-blue-50 font-medium"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            to="/login"
            className="px-6 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:border-gray-300"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="px-6 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2.5 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all duration-200"
          onClick={toggleMenu}
        >
          {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0 overflow-hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 space-y-3">
          <Link 
            to="/" 
            onClick={toggleMenu}
            className="block px-4 py-3 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-xl hover:bg-blue-50 font-medium"
          >
            Home
          </Link>
          
          <Link 
            to="/features" 
            onClick={toggleMenu}
            className="block px-4 py-3 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-xl hover:bg-blue-50 font-medium"
          >
            Features
          </Link>

          <Link 
            to="/services" 
            onClick={toggleMenu}
            className="block px-4 py-3 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-xl hover:bg-blue-50 font-medium"
          >
            Services
          </Link>

          <Link 
            to="/pricing" 
            onClick={toggleMenu}
            className="block px-4 py-3 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-xl hover:bg-blue-50 font-medium"
          >
            Pricing
          </Link>

          <Link 
            to="/contact" 
            onClick={toggleMenu}
            className="block px-4 py-3 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-xl hover:bg-blue-50 font-medium"
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-gray-100 space-y-3">
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block px-4 py-3 text-center text-gray-700 font-medium rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              onClick={toggleMenu}
              className="block px-4 py-3 text-center bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;