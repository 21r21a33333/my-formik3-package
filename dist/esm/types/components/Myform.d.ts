import React from "react";
interface MyFormProps {
    children?: React.ReactNode;
    onSubmit: (data: Record<string, string>) => void;
    buttonClasses: string;
    buttonStyles: React.CSSProperties;
    styles?: React.CSSProperties;
    className?: string;
    formtitle: string;
}
declare const MyForm: React.FC<MyFormProps>;
export default MyForm;
