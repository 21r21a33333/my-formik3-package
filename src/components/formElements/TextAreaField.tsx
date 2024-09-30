import React, { useRef, useContext, useEffect } from "react";
import { FormContext } from "../contexts/FormProvider"; // Adjust path as necessary
import TextAreaFieldProps from "../../types/TextFeildProps"; // Define this type in your types folder

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  placeholder = "Enter text here...",
  isRequired = false,
  styles = {},
  className = "",
  rows = 4,
  name, // Name prop to identify this field in the form context
  validator,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
  const validate = (inputValue: string) => {
    if (isRequired && !inputValue) {
      return false; // Required validation
    }
    return validator ? validator(inputValue) : true; // Use custom validator if provided
  };

  // Handle textarea change and update form context
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const isValid = validate(inputValue);

    // Update the form context with the new value only if it has changed
    if (formData[name] !== inputValue) {
      handleChange(name, inputValue);
    }

    // Set error state directly in formData or handle display via form context
    handleChange(`${name}_error`, isValid ? "" : "Invalid input.");
  };

  return (
    <div className={`relative`} style={styles}>
      <textarea
        id={name}
        ref={textAreaRef}
        value={formData[name] || ""}
        onChange={handleInputChange}
        placeholder={placeholder}
        rows={rows}
        className={`border rounded-lg p-2 w-full ${
          formData[`${name}_error`] ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      <div className="min-h-4">
        {formData[`${name}_error`] && (
          <div className=" absolute  text-red-500 text-sm mt-1">
            {formData[`${name}_error`]}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextAreaField;
