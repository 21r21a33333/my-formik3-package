export default interface TextFieldProps {
  rows?: number;
  name: string;
  className?: string;
  styles?: React.CSSProperties;
  isRequired?: boolean;
  validator?: (value: string) => boolean; // Custom validator function
  placeholder?: string;
  type?: "alpha" | "numeric" | "alphanumeric"; // New prop to handle validation type
}
