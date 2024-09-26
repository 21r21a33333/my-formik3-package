export interface Option {
    label: string;
    value: string;
}
export interface DropdownProps {
    name: string;
    options: Option[];
    placeholder?: string;
    isRequired?: boolean;
    styles?: React.CSSProperties;
    className?: string;
    listItemsClassName?: string;
    listItemstyles?: React.CSSProperties;
}
