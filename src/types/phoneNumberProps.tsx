export default interface PhoneNumberFieldProps {
  name: string; // Unique name for the input field
  styles?: React.CSSProperties; // Custom styles for the container
  className?: string; // Additional class names for the input
  isRequired?: boolean;
  placeholder?: string;
}
