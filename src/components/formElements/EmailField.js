import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useContext, useEffect } from "react";
import { FormContext } from "../contexts/FormProvider"; // Adjust path as necessary
const EmailField = ({ styles = {}, className = "", isRequired = false, placeholder = "", name, // Ensure the name prop is passed to identify this field
 }) => {
    const inputRef = useRef(null);
    // Accessing the form context
    const formContext = useContext(FormContext);
    if (!formContext) {
        throw new Error("EmailField must be used within a FormProvider.");
    }
    const { handleChange, formData, addRef } = formContext;
    // Register the input ref when the component mounts
    useEffect(() => {
        if (inputRef.current) {
            addRef(name, inputRef); // Add ref to context
        }
    }, [name]); // Add addRef to dependencies
    // Email validation logic
    const validateEmail = (inputValue) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        let error = "";
        if (isRequired && inputValue === "") {
            error = "Email is required.";
        }
        else if (inputValue && !emailPattern.test(inputValue)) {
            error = "Please enter a valid email address.";
        }
        // Update error state in form context
        handleChange(`${name}_error`, error);
    };
    // Handle input change and update form context
    const handleChangeInput = (e) => {
        const inputValue = e.target.value;
        // Update the form context with the new value
        handleChange(name, inputValue);
        // Validate the input as it changes
        validateEmail(inputValue);
    };
    return (_jsxs("div", { className: "relative mb-4", children: [_jsx("input", { type: "email", id: name, ref: inputRef, value: formData[name] || "", placeholder: placeholder, onChange: handleChangeInput, required: isRequired, className: `bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
          ${formData[`${name}_error`]
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500"
                    : "border-gray-300"} ${className}`, style: styles }), _jsx("div", { className: "min-h-4", children: formData[`${name}_error`] && (_jsx("div", { className: "absolute text-red-500 text-sm mt-1", children: formData[`${name}_error`] })) })] }));
};
export default EmailField;
