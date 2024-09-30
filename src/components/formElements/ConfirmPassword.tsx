import React, { useRef, useContext, useEffect, useState } from "react";
import { FormContext } from "../contexts/FormProvider"; // Adjust path as necessary
import Label from "./LabelField";
import PasswordConfirmationProps from "../../types/CheckPasswordType";
import validatePassword2 from "../../utils/PasswordCheck";

const PasswordConfirmation: React.FC<PasswordConfirmationProps> = ({
  isRequired = false,
  styles = {},
  className = "",
  placeholder = "Enter password",
  name,
  minLetters = 1,
  totalLength = 8,
  minSpecialChars = 1,
  minCapitalLetters = 1,
  passwordinputStyles = {},
  passwordinputClassName = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const formContext = useContext(FormContext);

  if (!formContext) {
    throw new Error("PasswordConfirmation must be used within a FormProvider.");
  }

  const { handleChange, formData, addRef } = formContext;
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Register the input refs when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      addRef(name, inputRef); // Add password ref to context
    }
    if (confirmRef.current) {
      addRef(`${name}_confirm`, confirmRef); // Add confirm password ref to context
    }
  }, [name]); // No state dependencies to prevent infinite loops

  // Validation logic
  const validatePassword = (password: string) => {
    return validatePassword2({
      password,
      totalLength,
      minLetters,
      minCapitalLetters,
      minSpecialChars,
    });
  };

  // Handle input change and update form context
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    handleChange(name, inputValue); // Update password field

    // Validate password
    const validationMessage = validatePassword(inputValue);
    setError(validationMessage); // Update error state
  };

  // Handle confirm password change
  const handleConfirmInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmValue = e.target.value;
    if (validatePassword(formData[name]) == "") {
      // Validate confirm password against the password
      if (formData[name] !== confirmValue) {
        setError("Passwords do not match.");
        handleChange(`${name}_confirm`, confirmValue); // Update confirm password field
      } else {
        setError(""); // Clear error if passwords match
        handleChange(`${name}_confirm`, confirmValue); // Update confirm password field
      }
    } else {
      handleChange(`${name}_error`, confirmValue); // Update confirm password field
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`mb-4 ${className}`} style={styles}>
      {/* Password Input */}
      <div className="max-w-sm">
        <Label For={`${name}`} text="Password" isRequired={isRequired} />
        <div className="relative">
          <input
            id={name}
            ref={inputRef}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            onChange={handleInputChange}
            required={isRequired}
            className={
              `py-3 ps-4 pe-10 block w-full  rounded-lg text-sm 
              focus:border-blue-500 focus:ring-blue-500 bg-gray-50 border-gray-400
              ${error ? "border-red-500" : "border-gray-600"} 
              dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600` +
              " " +
              passwordinputClassName
            }
            style={passwordinputStyles}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
          >
            <svg
              className="shrink-0 size-3.5"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className={
                  showPassword ? "hidden" : "hs-password-active:hidden"
                }
                d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
              ></path>
              <path
                className={
                  showPassword ? "hidden" : "hs-password-active:hidden"
                }
                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
              ></path>
              <path
                className={
                  showPassword ? "hidden" : "hs-password-active:hidden"
                }
                d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
              ></path>
              <line
                className={
                  showPassword ? "hidden" : "hs-password-active:hidden"
                }
                x1="2"
                x2="22"
                y1="2"
                y2="22"
              ></line>
              <path
                className={showPassword ? "hs-password-active:block" : "hidden"}
                d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
              ></path>
              <circle
                className={showPassword ? "hs-password-active:block" : "hidden"}
                cx="12"
                cy="12"
                r="3"
              ></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div className="max-w-sm mt-4">
        <Label
          For={`${name}_confirm`}
          text="Confirm Password"
          isRequired={isRequired}
        />
        <div className="relative">
          <input
            id={`${name}_confirm`}
            ref={confirmRef}
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            onChange={handleConfirmInputChange}
            required={isRequired}
            className={
              `py-3 ps-4 pe-10 block w-full  rounded-lg text-sm 
              focus:border-blue-500 focus:ring-blue-500 bg-gray-50 border-gray-400
              ${error ? "border-red-500" : "border-gray-600"} 
              dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600` +
              " " +
              passwordinputClassName
            }
            style={passwordinputStyles}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
          >
            <svg
              className="shrink-0 size-3.5"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className={
                  showPassword ? "hidden" : "hs-password-active:hidden"
                }
                d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
              ></path>
              <path
                className={
                  showPassword ? "hidden" : "hs-password-active:hidden"
                }
                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
              ></path>
              <path
                className={
                  showPassword ? "hidden" : "hs-password-active:hidden"
                }
                d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
              ></path>
              <line
                className={
                  showPassword ? "hidden" : "hs-password-active:hidden"
                }
                x1="2"
                x2="22"
                y1="2"
                y2="22"
              ></line>
              <path
                className={showPassword ? "hs-password-active:block" : "hidden"}
                d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
              ></path>
              <circle
                className={showPassword ? "hs-password-active:block" : "hidden"}
                cx="12"
                cy="12"
                r="3"
              ></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* Error Message */}
      <div className="min-h-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default PasswordConfirmation;
