import React from "react";
interface DatePickerFieldProps {
    placeholder?: string;
    isRequired?: boolean;
    styles?: React.CSSProperties;
    className?: string;
    name: string;
}
declare const DatePickerField: React.FC<DatePickerFieldProps>;
export default DatePickerField;
