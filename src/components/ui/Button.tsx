import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ className = '', children, ...props }) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 font-medium 
                  py-2 px-4 rounded-md shadow-sm transition-all duration-200 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                  hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none 
                  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
