import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useContext, useCallback } from "react";
import { FormContext } from "../contexts/FormProvider";
const SliderField = ({ name, min = 0, max = 100, initialValue = 50, styles = {}, className = "", }) => {
    const sliderRef = useRef(null);
    // Access form context
    const formContext = useContext(FormContext);
    if (!formContext) {
        throw new Error("SliderField must be used within a FormProvider.");
    }
    const { handleChange, formData, addRef } = formContext;
    // Throttling function
    const throttle = useCallback((func, limit) => {
        let lastFunc;
        let lastRan;
        return function (...args) {
            if (!lastRan) {
                func(...args);
                lastRan = Date.now();
            }
            else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(() => {
                    if (Date.now() - lastRan >= limit) {
                        func(...args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }, []);
    const handleSliderChange = (value) => {
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
    const tooltipPosition = ((value - min) / (max - min)) * 100;
    return (_jsxs("div", { style: styles, className: `relative mb-4 ${className}`, children: [_jsx("div", { className: "relative mb-1 h-2 bg-gray-200 rounded-lg dark:bg-gray-700", children: _jsx("div", { className: "absolute h-full bg-blue-600 rounded-lg", style: {
                        width: `${tooltipPosition}%`, // Fill percentage based on slider value
                    } }) }), _jsxs("div", { className: "absolute left-0 transform -translate-x-1/2 -translate-y-full mb-1 text-white bg-blue-600 rounded-lg text-sm p-1", style: {
                    left: `calc(${tooltipPosition}% + 0.5rem)`, // Position tooltip above slider thumb
                }, children: [value, " "] }), _jsx("input", { id: name, ref: sliderRef, type: "range", min: min, max: max, value: value, onChange: (e) => throttledHandleChange(Number(e.target.value)), className: "w-full h-2 bg-transparent appearance-none cursor-pointer" }), _jsxs("div", { className: "flex justify-between text-sm text-gray-600 dark:text-gray-300", children: [_jsx("span", { children: min }), _jsx("span", { children: max })] })] }));
};
export default SliderField;
