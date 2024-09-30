// Validation logic
interface PasswordCheck {
  password: string;
  totalLength: number;
  minLetters: number;
  minCapitalLetters: number;
  minSpecialChars: number;
}
const validatePassword = ({
  password,
  totalLength,
  minLetters,
  minCapitalLetters,
  minSpecialChars,
}: PasswordCheck): string => {
  const letterRegex = /[a-zA-Z]/g; // Matches letters
  const specialCharRegex = /[!@#$%^&*]/g; // Matches special characters
  const capitalLetterRegex = /[A-Z]/g; // Matches capital letters

  const lettersCount = (password.match(letterRegex) || []).length;
  const specialCharsCount = (password.match(specialCharRegex) || []).length;
  const capitalLettersCount = (password.match(capitalLetterRegex) || []).length;

  let message = "";

  if (password.length < totalLength) {
    message = `Password must be at least ${totalLength} characters long.`;
  } else if (lettersCount < minLetters) {
    message = `Password must contain at least ${minLetters} letters.`;
  } else if (specialCharsCount < minSpecialChars) {
    message = `Password must contain at least ${minSpecialChars} special characters.`;
  } else if (capitalLettersCount < minCapitalLetters) {
    message = `Password must contain at least ${minCapitalLetters} capital letters.`;
  }

  return message;
};
export default validatePassword;
