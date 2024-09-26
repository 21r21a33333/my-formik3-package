import React from "react";

interface LabelProps {
  text: string; // Text to display in the label
  isRequired?: boolean; // Whether the label is for a required field
  styles?: React.CSSProperties; // Custom styles for the label
  className?: string; // Additional class names for the label
  For?: string; // For attribute for the label
}

const Label: React.FC<LabelProps> = ({
  text,
  isRequired = false,
  styles = {},
  className = "",
  For = "",
}) => {
  return (
    <div style={styles} className={`flex items-center m-1 ${className}`}>
      <label
        htmlFor={For}
        className="tracking-normal text-gray-700 md:text-lg dark:text-gray-400"
      >
        {text}
      </label>
      {isRequired && <span className="text-red-500 mr-1 ml-1">*</span>}
    </div>
  );
};

export default Label;
