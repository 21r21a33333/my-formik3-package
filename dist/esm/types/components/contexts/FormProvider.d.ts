import React, { ReactNode } from "react";
interface FormContextType {
    formData: Record<string, string>;
    handleChange: (name: string, value: string) => void;
    handleSubmit: (callback: (data: Record<string, any>) => void) => void;
    addRef: (name: string, ref: React.RefObject<HTMLInputElement | HTMLDivElement | HTMLTextAreaElement>) => void;
    refs: Record<string, React.RefObject<HTMLInputElement | HTMLDivElement | HTMLTextAreaElement>>;
    getRef: (name: string) => React.RefObject<HTMLInputElement | HTMLDivElement | HTMLTextAreaElement> | undefined;
}
export declare const FormContext: React.Context<FormContextType>;
interface FormProviderProps {
    children: ReactNode;
}
export declare const FormProvider: React.FC<FormProviderProps>;
export {};
