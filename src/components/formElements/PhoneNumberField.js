import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useContext, useEffect } from "react";
import { FormContext } from "../contexts/FormProvider"; // Adjust the import path as needed
const PhoneNumberField = ({ styles = {}, className = "", isRequired = false, placeholder = "", name, // Name prop to identify this field in the form context
 }) => {
    const inputRef = useRef(null);
    // Accessing the form context
    const formContext = useContext(FormContext);
    if (!formContext) {
        throw new Error("PhoneNumberField must be used within a FormProvider.");
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
    }, [name]);
    // Phone number validation logic
    const validatePhoneNumber = (inputValue) => {
        const phonePattern = /^\d{10}$/; // Basic pattern for 10-digit phone numbers
        if (isRequired && inputValue === "") {
            return false;
        }
        else if (!phonePattern.test(inputValue)) {
            return false;
        }
        return true; // No error
    };
    // Handle input change and update form context
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        const isValid = validatePhoneNumber(inputValue);
        // Update the form context with the new value
        if (formData[name] !== inputValue) {
            handleChange(name, inputValue);
        }
        // Set error state directly in formData or handle display via form context
        handleChange(`${name}_error`, isValid ? "" : "Please enter a valid 10-digit phone number.");
    };
    return (_jsxs("div", { className: "relative mb-4", children: [_jsx("input", { id: name, type: "tel" // Use 'tel' for phone number input
                , ref: inputRef, value: formData[name] || "", placeholder: placeholder, onChange: handleInputChange, required: isRequired, className: `bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
          ${formData[`${name}_error`]
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500"
                    : "border-gray-300"} ${className}`, style: styles }), _jsx("div", { className: "min-h-4", children: formData[`${name}_error`] && (_jsx("div", { className: "absolute text-red-500 text-sm mt-1", children: formData[`${name}_error`] })) })] }));
};
export default PhoneNumberField;
