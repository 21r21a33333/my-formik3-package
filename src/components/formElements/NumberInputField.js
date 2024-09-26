import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useContext } from "react";
import { FormContext } from "../contexts/FormProvider";
const NumberInputField = ({ name, placeholder = "Enter a number", isRequired = false, min, max, styles = {}, className = "", }) => {
    const inputRef = useRef(null);
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
    const handleInputChange = (e) => {
        let inputValue = e.target.value;
        let errorMessage = "";
        // Validate value
        if (isRequired && inputValue === "") {
            errorMessage = "This field is required and enter valid number.";
        }
        else {
            const numberValue = parseFloat(inputValue);
            if (isNaN(numberValue)) {
                errorMessage = "Please enter a valid number.";
            }
            else if (min !== undefined && numberValue < min) {
                errorMessage = `Value must be at least ${min}.`;
            }
            else if (max !== undefined && numberValue > max) {
                errorMessage = `Value must not exceed ${max}.`;
            }
        }
        handleChange(name, inputValue ? inputValue.toString() : "");
        handleChange(`${name}_error`, errorMessage);
    };
    return (_jsxs("div", { style: styles, className: `mb-4 ${className}`, children: [_jsx("input", { type: "number", id: name, ref: inputRef, value: formData[name] || "", onChange: handleInputChange, placeholder: placeholder, className: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formData[`${name}_error`] ? "border-red-500" : "border-gray-300"}`, required: isRequired, min: min, max: max }), _jsx("div", { className: "min-h-4", children: formData[`${name}_error`] && (_jsx("div", { className: "text-red-500 text-sm mt-1", children: formData[`${name}_error`] })) })] }));
};
export default NumberInputField;
