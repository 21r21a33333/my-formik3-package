import React, { useRef, useEffect, useContext, useState } from "react";
import { DropdownProps } from "../../types/DropDownFieldProps";
import { FormContext } from "../contexts/FormProvider";

const DropDownField: React.FC<DropdownProps> = ({
  options,
  name, // Name prop for form identification
  placeholder = "Select an option",
  isRequired = false,
  styles = {},
  className = "",
  listItemsClassName = "",
  listItemstyles = {},
}) => {
  const inputRef = useRef<HTMLDivElement>(null);

  // Access the form context
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("DropDownField must be used within a FormProvider.");
  }

  const { handleChange, formData, addRef } = formContext;
  const [isOpen, setIsOpen] = useState(false); // Manage dropdown open/close

  // Register the dropdown ref when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      addRef(name, inputRef);
    }
  }, [name]);

  // Handle option change
  const handleOptionChange = (value: string) => {
    handleChange(name, value);
    setIsOpen(false); // Close dropdown after selection
    handleChange(
      `${name}_error`,
      isRequired && !value ? "This field is required" : ""
    );
  };

  return (
    <div style={styles} className={`relative mb-4 ${className}`}>
      <button
        id={name}
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown open/close
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
          focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center 
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      >
        {formData[name]
          ? options.find((opt) => opt.value === formData[name])?.label
          : placeholder}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10  divide-y divide-gray-100 rounded-lg  w-full max-h-60 overflow-y-auto">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDelayButton"
          >
            {options.map((option, index) => (
              <li key={index}>
                <div
                  onClick={() => handleOptionChange(option.value)} // Change value on click
                  className={
                    "block bg-white shadow max-w-xs mx-auto px-4 py-2 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer " +
                    `${listItemsClassName}`
                  }
                  style={listItemstyles}
                >
                  {option.label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {formData[`${name}_error`] && (
        <div className="text-red-500 text-sm mt-1">
          {formData[`${name}_error`]}
        </div>
      )}
    </div>
  );
};

export default DropDownField;
