import React from 'react';

export default function TagPill({ label }) {
  return (
    <span className="inline-block bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-medium">
      {label}
    </span>
  );
}
