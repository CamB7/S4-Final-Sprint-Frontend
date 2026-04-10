import React from 'react';
import './Button.css';

const Button = ({ text, onClick, ...props }) => {
  return (
    <button className="gradient-button" onClick={onClick} {...props}>
      {text}
    </button>
  );
};

export default Button;