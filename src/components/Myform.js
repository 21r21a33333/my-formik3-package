import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { FormContext } from "../components/contexts/FormProvider"; // Adjust the import based on your folder structure
const MyForm = ({ onSubmit, children, buttonClasses = "", buttonStyles = {}, styles = {}, className = "", formtitle = "", }) => {
    const { handleSubmit } = useContext(FormContext) || {
        handleSubmit: () => console.warn("FormContext is not available."),
    };
    const onFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(onSubmit); // Trigger form submission with the passed-in onSubmit function
    };
    return (_jsxs("form", { className: `mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8` + className, onSubmit: onFormSubmit, style: styles, children: [_jsx("h1", { className: "text-center text-2xl font-bold text-blue-600 sm:text-3xl", children: formtitle }), children, _jsx("button", { type: "submit", className: `w-full bg-blue-500 text-white p-2 rounded-lg ${buttonClasses}`, style: buttonStyles, children: "Submit" })] }));
};
export default MyForm;
