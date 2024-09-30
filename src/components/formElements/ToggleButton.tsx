import React, { useRef, useContext, useEffect, useState } from "react";
import { FormContext } from "../contexts/FormProvider"; // Adjust path as necessary

interface ToggleButtonProps {
  name: string; // Name prop to identify this toggle in the form context
  label: string; // Label to display for the toggle
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ name, label }) => {
  const formContext = useContext(FormContext);
  const toggleRef = useRef<HTMLInputElement>(null);

  if (!formContext) {
    throw new Error("ToggleButton must be used within a FormProvider.");
  }

  const { handleChange, formData, addRef } = formContext;

  // State to manage toggle state
  const [isChecked, setIsChecked] = useState<boolean>(!!formData[name]);

  // Register the toggle ref when the component mounts
  useEffect(() => {
    if (toggleRef.current) {
      addRef(name, toggleRef); // Add toggle ref to context
    }
  }, [name]); // Include addRef to avoid missing dependency warning

  // Handle change event
  const handleToggleChange = () => {
    const newValue = !isChecked; // Toggle the boolean value
    setIsChecked(newValue); // Update local state

    // Convert boolean to string before passing to handleChange
    handleChange(name, newValue ? "true" : "false"); // Update the form context with the new string value
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        ref={toggleRef}
        checked={isChecked}
        onChange={handleToggleChange}
        className="sr-only peer"
      />
      <div
        className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 
          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
          peer-checked:after:border-white after:content-[''] 
          after:absolute after:top-0.5 after:start-[2px] 
          after:bg-white after:border-gray-300 after:border 
          after:rounded-full after:h-5 after:w-5 after:transition-all 
          dark:border-gray-600 peer-checked:bg-blue-600"
      ></div>
      <span className="ms-3 text-sm font-medium text-gray-400 dark:text-gray-500">
        {label}
      </span>
    </label>
  );
};

export default ToggleButton;
