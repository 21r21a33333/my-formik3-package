export default interface TextFieldProps {
    rows?: number;
    name: string;
    className?: string;
    styles?: React.CSSProperties;
    isRequired?: boolean;
    validator?: (value: string) => boolean;
    placeholder?: string;
    type?: "alpha" | "numeric" | "alphanumeric";
}
