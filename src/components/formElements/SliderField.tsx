import React, { useEffect, useRef, useContext, useCallback } from "react";
import { FormContext } from "../contexts/FormProvider";

interface SliderFieldProps {
  name: string; // Unique identifier for form context
  min?: number; // Minimum value for the slider
  max?: number; // Maximum value for the slider
  initialValue?: number; // Initial value for the slider
  styles?: React.CSSProperties; // Custom styles for the input container
  className?: string; // Additional class names for the input
}

const SliderField: React.FC<SliderFieldProps> = ({
  name,
  min = 0,
  max = 100,
  initialValue = 50,
  styles = {},
  className = "",
}) => {
  const sliderRef = useRef<HTMLInputElement>(null);

  // Access form context
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("SliderField must be used within a FormProvider.");
  }

  const { handleChange, formData, addRef } = formContext;

  // Throttling function
  const throttle = useCallback(
    (func: (...args: any[]) => void, limit: number) => {
      let lastFunc: ReturnType<typeof setTimeout>;
      let lastRan: number;

      return function (...args: any[]) {
        if (!lastRan) {
          func(...args);
          lastRan = Date.now();
        } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(() => {
            if (Date.now() - lastRan >= limit) {
              func(...args);
              lastRan = Date.now();
            }
          }, limit - (Date.now() - lastRan));
        }
      };
    },
    []
  );

  const handleSliderChange = (value: number) => {
    handleChange(name, value.toString());
  };

  // Throttled version of handleSliderChange
  const throttledHandleChange = throttle(handleSliderChange, 100);

  // Register slider ref on component mount
  useEffect(() => {
    if (sliderRef.current) {
      addRef(name, sliderRef);
    }
    // Set initial value
    handleChange(name, initialValue.toString());
  }, [name, initialValue]);

  // Ensure values are numbers
  const value = Number(formData[name]) || initialValue; // Convert to number
  const tooltipPosition: number = ((value - min) / (max - min)) * 100;

  return (
    <div style={styles} className={`relative mb-4 ${className}`}>
      {/* Background for filled portion */}
      <div className="relative mb-1 h-2 bg-gray-200 rounded-lg dark:bg-gray-700">
        <div
          className="absolute h-full bg-blue-600 rounded-lg"
          style={{
            width: `${tooltipPosition}%`, // Fill percentage based on slider value
          }}
        ></div>
      </div>

      {/* Tooltip */}
      <div
        className="absolute left-0 transform -translate-x-1/2 -translate-y-full mb-1 text-white bg-blue-600 rounded-lg text-sm p-1"
        style={{
          left: `calc(${tooltipPosition}% + 0.5rem)`, // Position tooltip above slider thumb
        }}
      >
        {value} {/* Display current slider value */}
      </div>

      <input
        id={name}
        ref={sliderRef}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => throttledHandleChange(Number(e.target.value))}
        className="w-full h-2 bg-transparent appearance-none cursor-pointer"
      />

      {/* Min and Max values display */}
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default SliderField;
