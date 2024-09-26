import React from "react";
interface NumberInputFieldProps {
    name: string;
    placeholder?: string;
    isRequired?: boolean;
    min?: number;
    max?: number;
    styles?: React.CSSProperties;
    className?: string;
}
declare const NumberInputField: React.FC<NumberInputFieldProps>;
export default NumberInputField;
