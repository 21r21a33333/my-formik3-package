export const defaultValidators = {
    alpha: (value) => /^[a-zA-Z]*$/.test(value),
    numeric: (value) => /^[0-9]*$/.test(value),
    alphanumeric: (value) => /^[a-zA-Z0-9]*$/.test(value),
};
