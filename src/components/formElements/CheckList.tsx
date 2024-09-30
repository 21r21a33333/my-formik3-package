// src/components/formElements/SingleCheckboxList.tsx
import React, { useRef, useContext, useEffect } from "react";
import { FormContext } from "../contexts/FormProvider"; // Adjust path as necessary

interface Option {
  label: string;
  value: string; // Value to be stored in form data
}

interface SingleCheckboxListProps {
  options: Option[];
  name: string;
  className?: string; // Optional class name for additional styling
  optionstyles?: React.CSSProperties; // Optional styles for the options
}

const SingleCheckboxList: React.FC<SingleCheckboxListProps> = ({
  options,
  name,
  className = "",
  optionstyles = {},
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  // Accessing the form context
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("SingleCheckboxList must be used within FormProvider.");
  }

  const { handleChange, formData, addRef } = formContext;

  // Register the checkbox ref when the component mounts
  useEffect(() => {
    if (checkboxRef.current) {
      addRef(name, checkboxRef); // Add ref to context
    }
    return () => {
      // Optional cleanup if you want to remove ref on unmount
      // removeRef(name);
    };
  }, [name, addRef]);

  // Handle checkbox change and update form context
  const handleCheckboxChange = (value: string) => {
    // Update the form context with the selected value
    handleChange(name, value);

    // Optionally, clear any error state if needed
    handleChange(`${name}_error`, "");
  };

  return (
    <div className={`flex flex-col ${className}`} style={optionstyles}>
      {options.map((option) => (
        <div
          key={option.value}
          className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 mb-2"
        >
          <input
            ref={checkboxRef}
            id={option.value}
            type="checkbox"
            checked={formData[name] === option.value}
            onChange={() => handleCheckboxChange(option.value)}
            className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={option.value}
            className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {option.label}
          </label>
        </div>
      ))}
      <div className="min-h-4">
        {formData[`${name}_error`] && (
          <div className="text-red-500 text-sm">
            {formData[`${name}_error`]}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCheckboxList;
