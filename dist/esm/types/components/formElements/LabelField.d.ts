import React from "react";
interface LabelProps {
    text: string;
    isRequired?: boolean;
    styles?: React.CSSProperties;
    className?: string;
    For?: string;
}
declare const Label: React.FC<LabelProps>;
export default Label;
