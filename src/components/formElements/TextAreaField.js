import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useContext, useEffect } from "react";
import { FormContext } from "../contexts/FormProvider"; // Adjust path as necessary
const TextAreaField = ({ placeholder = "Enter text here...", isRequired = false, styles = {}, className = "", rows = 4, name, // Name prop to identify this field in the form context
validator, }) => {
    const textAreaRef = useRef(null);
    // Accessing the form context
    const formContext = useContext(FormContext);
    if (!formContext) {
        throw new Error("TextAreaField must be used within a FormProvider.");
    }
    const { handleChange, formData, addRef } = formContext;
    // Register the textarea ref when the component mounts
    useEffect(() => {
        if (textAreaRef.current) {
            addRef(name, textAreaRef); // Add ref to context
        }
        return () => {
            // Optionally, you could remove the ref on unmount
            // removeRef(name);
        };
    }, [name]); // No state dependencies to prevent infinite loops
    // Validate textarea input
    const validate = (inputValue) => {
        if (isRequired && !inputValue) {
            return false; // Required validation
        }
        return validator ? validator(inputValue) : true; // Use custom validator if provided
    };
    // Handle textarea change and update form context
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        const isValid = validate(inputValue);
        // Update the form context with the new value only if it has changed
        if (formData[name] !== inputValue) {
            handleChange(name, inputValue);
        }
        // Set error state directly in formData or handle display via form context
        handleChange(`${name}_error`, isValid ? "" : "Invalid input.");
    };
    return (_jsxs("div", { className: `relative`, style: styles, children: [_jsx("textarea", { id: name, ref: textAreaRef, value: formData[name] || "", onChange: handleInputChange, placeholder: placeholder, rows: rows, className: `border rounded-lg p-2 w-full ${formData[`${name}_error`] ? "border-red-500" : "border-gray-300"} ${className}` }), _jsx("div", { className: "min-h-4", children: formData[`${name}_error`] && (_jsx("div", { className: " absolute bottom-2 text-red-500 text-sm mt-1", children: formData[`${name}_error`] })) })] }));
};
export default TextAreaField;
