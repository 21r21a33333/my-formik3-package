export default interface EmailFieldProps {
  name: string; // Unique name for the
  styles?: React.CSSProperties; // Custom styles for the container
  className?: string; // Additional class names for the input
  isRequired?: boolean;
  placeholder?: string;
}
