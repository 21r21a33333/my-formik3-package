export default interface PasswordConfirmationProps {
  isRequired?: boolean; // Whether the field is required
  styles?: React.CSSProperties; // Custom styles for the container
  className?: string; // Additional class names for the container
  placeholder?: string; // Placeholder text for the password input
  name: string; // Name prop to identify this field in the form context
  minLetters?: number; // Minimum number of letters required
  totalLength?: number; // Minimum total length required
  minSpecialChars?: number; // Minimum number of special characters required
  minCapitalLetters?: number; // Minimum number of capital letters required
  passwordinputStyles?: React.CSSProperties; // Custom styles for the password input
  passwordinputClassName?: string; // Additional class names for the password input
}
