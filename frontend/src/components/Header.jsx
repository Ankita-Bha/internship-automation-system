import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Dashboard", to: "/dashboard" },
    { name: "Internships", to: "/internships" },
    { name: "Upload Resume", to: "/resume-upload" },
    { name: "Resume Manager", to: "/resume-manager" },
    { name: "Application Status", to: "/application-status" },
  ];

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl text-orange-500">
          AutoIntern
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map(({ name, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-gray-800 hover:text-orange-500 ${
                  isActive ? "font-semibold underline" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {name}
            </NavLink>
          ))}

          <Link
            to="/login"
            className="ml-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="ml-2 px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition"
          >
            Register
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-orange-500 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md px-4 pb-4 space-y-3">
          {navLinks.map(({ name, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block text-gray-800 hover:text-orange-500 ${
                  isActive ? "font-semibold underline" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {name}
            </NavLink>
          ))}

          <Link
            to="/login"
            className="block mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block mt-1 px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </nav>
      )}
    </header>
  );
}
