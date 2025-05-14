import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterLink({ label, href }) {
  return (
    <Link to={href} className="text-sm text-gray-600 hover:text-orange-600 transition">
      {label}
    </Link>
  );
}
