import React, { useRef, useContext, useEffect } from "react";
import { FormContext } from "../contexts/FormProvider"; // Adjust path as necessary
// import DatePickerFieldProps from "../../types/"; // Define this type in your types folder
interface DatePickerFieldProps {
  placeholder?: string;
  isRequired?: boolean;
  styles?: React.CSSProperties;
  className?: string;
  name: string;
}
const DatePickerField: React.FC<DatePickerFieldProps> = ({
  placeholder = "Select date",
  isRequired = false,
  styles = {},
  className = "",
  name, // Name prop to identify this field in the form context
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Accessing the form context
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("DatePickerField must be used within a FormProvider.");
  }

  const { handleChange, formData, addRef } = formContext;

  // Register the input ref when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      addRef(name, inputRef); // Add ref to context
    }

    return () => {
      // Optionally, you could remove the ref on unmount
      // removeRef(name);
    };
  }, [name]); // No state dependencies to prevent infinite loops

  // Validate date input
  const validateDate = (inputValue: string) => {
    if (isRequired && !inputValue) {
      return false; // Required validation
    }
    return true; // If passed validation
  };

  // Handle input change and update form context
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const isValid = validateDate(inputValue);

    // Update the form context with the new value only if it has changed
    if (formData[name] !== inputValue) {
      handleChange(name, inputValue);
    }

    // Set error state directly in formData or handle display via form context
    handleChange(`${name}_error`, isValid ? "" : "Date is required.");
  };

  return (
    <div className="relative mb-4">
      <input
        id={name}
        ref={inputRef}
        type="date"
        value={formData[name] || ""}
        placeholder={placeholder}
        onChange={handleInputChange}
        required={isRequired}
        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
          ${
            formData[`${name}_error`]
              ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500"
              : "border-gray-300"
          } 
          ${className}`}
        style={styles} // Apply any custom styles
      />
      <div className="min-h-4">
        {formData[`${name}_error`] && (
          <div className="absolute text-red-500 text-sm mt-1">
            {formData[`${name}_error`]}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePickerField;
