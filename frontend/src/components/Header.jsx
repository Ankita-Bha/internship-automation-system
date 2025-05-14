import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-orange-600">
          AutoIntern
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/jobs" className="text-gray-800 hover:text-orange-600">Jobs</Link>
          <Link to="/resume" className="text-gray-800 hover:text-orange-600">Resume</Link>
          <Link to="/applications" className="text-gray-800 hover:text-orange-600">Applications</Link>
          <Link to="/login" className="bg-orange-600 text-white px-4 py-2 rounded-lg">Login</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-orange-600">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-2">
          <Link to="/jobs" className="block text-gray-800 hover:text-orange-600">Jobs</Link>
          <Link to="/resume" className="block text-gray-800 hover:text-orange-600">Resume</Link>
          <Link to="/applications" className="block text-gray-800 hover:text-orange-600">Applications</Link>
          <Link to="/login" className="block bg-orange-600 text-white px-4 py-2 rounded-lg">Login</Link>
        </div>
      )}
    </header>
  );
}
