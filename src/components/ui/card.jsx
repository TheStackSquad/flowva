// src/components/ui/card.jsx
import React from 'react';

// Reusable Card Container
export const Card = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};