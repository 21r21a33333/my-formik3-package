export const defaultValidators = {
  alpha: (value: string) => /^[a-zA-Z]*$/.test(value),
  numeric: (value: string) => /^[0-9]*$/.test(value),
  alphanumeric: (value: string) => /^[a-zA-Z0-9]*$/.test(value),
};
