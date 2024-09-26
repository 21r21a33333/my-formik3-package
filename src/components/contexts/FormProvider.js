import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from "react";
// Initialize the context
export const FormContext = createContext({
    formData: {},
    handleChange: () => { },
    handleSubmit: () => { },
    addRef: () => { },
    refs: {},
    getRef: () => undefined, // Set default to return undefined
});
export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({});
    const [refs, setRefs] = useState({}); // Store refs
    // Handle field value changes
    const handleChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // Handle form submission
    const handleSubmit = (callback) => {
        let hasError = false;
        console.log("Form Data: ", formData);
        // Check for errors in form data
        for (const key in formData) {
            if (key.endsWith("_error") && formData[key]) {
                hasError = true;
                // Focus the input corresponding to the error
                const ref = refs[key.replace("_error", "")]; // Get the input ref
                if (ref && ref.current) {
                    ref.current.focus(); // Focus the input
                }
            }
        }
        // If there's an error, do not proceed with submission
        if (!hasError) {
            console.log(formData);
            alert("Submitting form data");
            callback(formData); // Trigger the callback with form data
        }
        else {
            alert("Form contains errors, submission aborted.");
        }
    };
    // Add ref method
    const addRef = (name, ref) => {
        setRefs((prevRefs) => ({
            ...prevRefs,
            [name]: ref,
        }));
    };
    // Get ref method
    const getRef = (name) => {
        return refs[name]; // Return the specific ref based on name
    };
    return (_jsx(FormContext.Provider, { value: { formData, handleChange, handleSubmit, addRef, refs, getRef }, children: children }));
};
