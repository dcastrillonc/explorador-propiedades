import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`p-4 rounded-md shadow-md outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${className}`}
      {...props}
    />
  );
};

export default Input;
