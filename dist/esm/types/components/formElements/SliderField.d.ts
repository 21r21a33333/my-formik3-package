import React from "react";
interface SliderFieldProps {
    name: string;
    min?: number;
    max?: number;
    initialValue?: number;
    styles?: React.CSSProperties;
    className?: string;
}
declare const SliderField: React.FC<SliderFieldProps>;
export default SliderField;
