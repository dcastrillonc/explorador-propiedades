import React from 'react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

const Select: React.FC<SelectProps> = ({ options, className, ...props }) => {
  return (
    <div className="relative">
      <select
        className={`
          appearance-none w-full p-4 pr-10 rounded-md shadow-md outline-none
          focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 
          text-gray-900 dark:text-white
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default Select;
