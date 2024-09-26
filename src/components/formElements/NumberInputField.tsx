import React, { useRef, useEffect, useContext } from "react";
import { FormContext } from "../contexts/FormProvider";

interface NumberInputFieldProps {
  name: string; // Unique name for form context
  placeholder?: string; // Placeholder text for the input
  isRequired?: boolean; // Whether the field is required
  min?: number; // Minimum value for the input
  max?: number; // Maximum value for the input
  styles?: React.CSSProperties; // Custom styles for the input container
  className?: string; // Additional class names for the input
}

const NumberInputField: React.FC<NumberInputFieldProps> = ({
  name,
  placeholder = "Enter a number",
  isRequired = false,
  min,
  max,
  styles = {},
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Access form context
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("NumberInputField must be used within a FormProvider.");
  }

  const { handleChange, formData, addRef } = formContext;

  // Register the input ref when component mounts
  useEffect(() => {
    if (inputRef.current) {
      addRef(name, inputRef);
    }
  }, [name]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    let errorMessage = "";

    // Validate value
    if (isRequired && inputValue === "") {
      errorMessage = "This field is required and enter valid number.";
    } else {
      const numberValue = parseFloat(inputValue);
      if (isNaN(numberValue)) {
        errorMessage = "Please enter a valid number.";
      } else if (min !== undefined && numberValue < min) {
        errorMessage = `Value must be at least ${min}.`;
      } else if (max !== undefined && numberValue > max) {
        errorMessage = `Value must not exceed ${max}.`;
      }
    }

    handleChange(name, inputValue ? inputValue.toString() : "");
    handleChange(`${name}_error`, errorMessage);
  };

  return (
    <div style={styles} className={`mb-4 ${className}`}>
      <input
        type="number"
        id={name}
        ref={inputRef}
        value={formData[name] || ""}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            formData[`${name}_error`] ? "border-red-500" : "border-gray-300"
          }`}
        required={isRequired}
        min={min} // Set min value if provided
        max={max} // Set max value if provided
      />
      <div className="min-h-4">
        {formData[`${name}_error`] && (
          <div className="text-red-500 text-sm mt-1">
            {formData[`${name}_error`]}
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberInputField;
