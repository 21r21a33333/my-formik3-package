import React$1, { ReactNode } from 'react';

interface DatePickerFieldProps {
    placeholder?: string;
    isRequired?: boolean;
    styles?: React$1.CSSProperties;
    className?: string;
    name: string;
}
declare const DatePickerField: React$1.FC<DatePickerFieldProps>;

interface Option$1 {
    label: string;
    value: string;
}
interface DropdownProps {
    name: string;
    options: Option$1[];
    placeholder?: string;
    isRequired?: boolean;
    styles?: React.CSSProperties;
    className?: string;
    listItemsClassName?: string;
    listItemstyles?: React.CSSProperties;
}

declare const DropDownField: React$1.FC<DropdownProps>;

interface EmailFieldProps {
    name: string;
    styles?: React.CSSProperties;
    className?: string;
    isRequired?: boolean;
    placeholder?: string;
}

declare const EmailField: React$1.FC<EmailFieldProps>;

interface LabelProps {
    text: string;
    isRequired?: boolean;
    styles?: React$1.CSSProperties;
    className?: string;
    For?: string;
}
declare const Label: React$1.FC<LabelProps>;

interface NumberInputFieldProps {
    name: string;
    placeholder?: string;
    isRequired?: boolean;
    min?: number;
    max?: number;
    styles?: React$1.CSSProperties;
    className?: string;
}
declare const NumberInputField: React$1.FC<NumberInputFieldProps>;

interface PhoneNumberFieldProps {
    name: string;
    styles?: React.CSSProperties;
    className?: string;
    isRequired?: boolean;
    placeholder?: string;
}

declare const PhoneNumberField: React$1.FC<PhoneNumberFieldProps>;

interface SliderFieldProps {
    name: string;
    min?: number;
    max?: number;
    initialValue?: number;
    styles?: React$1.CSSProperties;
    className?: string;
}
declare const SliderField: React$1.FC<SliderFieldProps>;

interface TextFieldProps {
    rows?: number;
    name: string;
    className?: string;
    styles?: React.CSSProperties;
    isRequired?: boolean;
    validator?: (value: string) => boolean;
    placeholder?: string;
    type?: "alpha" | "numeric" | "alphanumeric";
}

declare const TextAreaField: React$1.FC<TextFieldProps>;

declare const TextField: React$1.FC<TextFieldProps>;

interface MyFormProps {
    children?: React$1.ReactNode;
    onSubmit: (data: Record<string, string>) => void;
    buttonClasses?: string;
    buttonStyles?: React$1.CSSProperties;
    styles?: React$1.CSSProperties;
    className?: string;
    formtitle?: string;
}
declare const MyForm: React$1.FC<MyFormProps>;

interface FormContextType {
    formData: Record<string, string>;
    handleChange: (name: string, value: string) => void;
    handleSubmit: (callback: (data: Record<string, any>) => void) => void;
    addRef: (name: string, ref: React$1.RefObject<HTMLInputElement | HTMLDivElement | HTMLTextAreaElement>) => void;
    refs: Record<string, React$1.RefObject<HTMLInputElement | HTMLDivElement | HTMLTextAreaElement>>;
    getRef: (name: string) => React$1.RefObject<HTMLInputElement | HTMLDivElement | HTMLTextAreaElement> | undefined;
}
declare const FormContext: React$1.Context<FormContextType>;
interface FormProviderProps {
    children: ReactNode;
}
declare const FormProvider: React$1.FC<FormProviderProps>;

interface PasswordConfirmationProps {
    isRequired?: boolean;
    styles?: React.CSSProperties;
    className?: string;
    placeholder?: string;
    name: string;
    minLetters?: number;
    totalLength?: number;
    minSpecialChars?: number;
    minCapitalLetters?: number;
    passwordinputStyles?: React.CSSProperties;
    passwordinputClassName?: string;
}

declare const PasswordConfirmation: React$1.FC<PasswordConfirmationProps>;

interface ToggleButtonProps {
    name: string;
    label: string;
}
declare const ToggleButton: React$1.FC<ToggleButtonProps>;

interface Option {
    label: string;
    value: string;
}
interface SingleCheckboxListProps {
    options: Option[];
    name: string;
    className?: string;
    optionstyles?: React$1.CSSProperties;
}
declare const SingleCheckboxList: React$1.FC<SingleCheckboxListProps>;

export { DatePickerField, DropDownField, EmailField, FormContext, FormProvider, Label, MyForm, NumberInputField, PasswordConfirmation, PhoneNumberField, SingleCheckboxList, SliderField, TextAreaField, TextField, ToggleButton };
