import React from 'react';
import './Button.css';

const Button = ({ text, onClick, className, ...props }) => {
  return (
    <button
      className={`gradient-button ${className}`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;