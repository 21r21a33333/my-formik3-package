import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Label = ({ text, isRequired = false, styles = {}, className = "", For = "", }) => {
    return (_jsxs("div", { style: styles, className: `flex items-center m-1 ${className}`, children: [_jsx("label", { htmlFor: For, className: "tracking-normal text-gray-700 md:text-lg dark:text-gray-400", children: text }), isRequired && _jsx("span", { className: "text-red-500 mr-1 ml-1", children: "*" })] }));
};
export default Label;
