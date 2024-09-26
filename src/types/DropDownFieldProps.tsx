export interface Option {
  label: string; // Display text for the option
  value: string; // Value of the option
}

export interface DropdownProps {
  name: string; // Name prop for form identification
  options: Option[]; // Options for the dropdown
  placeholder?: string; // Placeholder text for the dropdown
  isRequired?: boolean; // Whether at least one option must be selected
  styles?: React.CSSProperties; // Custom styles for the dropdown container
  className?: string; // Additional class names for the dropdown
  listItemsClassName?: string; // Additional class names for the list items
  listItemstyles?: React.CSSProperties; // Custom styles for the list items
  // isrequired?: boolean; // Whether the dropdown is required
}
