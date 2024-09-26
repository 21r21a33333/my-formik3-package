import React, { createContext, useState, ReactNode, useRef } from "react";

// Define the form context type
interface FormContextType {
  formData: Record<string, string>;
  handleChange: (name: string, value: string) => void;
  handleSubmit: (callback: (data: Record<string, any>) => void) => void;
  addRef: (
    name: string,
    ref: React.RefObject<
      HTMLInputElement | HTMLDivElement | HTMLTextAreaElement
    >
  ) => void;
  refs: Record<
    string,
    React.RefObject<HTMLInputElement | HTMLDivElement | HTMLTextAreaElement>
  >; // Store refs
  getRef: (
    name: string
  ) =>
    | React.RefObject<HTMLInputElement | HTMLDivElement | HTMLTextAreaElement>
    | undefined; // Get ref method
}

// Initialize the context
export const FormContext = createContext<FormContextType>({
  formData: {},
  handleChange: () => {},
  handleSubmit: () => {},
  addRef: () => {},
  refs: {},
  getRef: () => undefined, // Set default to return undefined
});

// Create the FormProvider
interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [refs, setRefs] = useState<
    Record<
      string,
      React.RefObject<HTMLInputElement | HTMLDivElement | HTMLTextAreaElement>
    >
  >({}); // Store refs

  // Handle field value changes
  const handleChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (callback: (data: Record<string, any>) => void) => {
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
    } else {
      alert("Form contains errors, submission aborted.");
    }
  };

  // Add ref method
  const addRef = (
    name: string,
    ref: React.RefObject<
      HTMLInputElement | HTMLDivElement | HTMLTextAreaElement
    >
  ) => {
    setRefs((prevRefs) => ({
      ...prevRefs,
      [name]: ref,
    }));
  };

  // Get ref method
  const getRef = (
    name: string
  ):
    | React.RefObject<HTMLInputElement | HTMLDivElement | HTMLTextAreaElement>
    | undefined => {
    return refs[name]; // Return the specific ref based on name
  };

  return (
    <FormContext.Provider
      value={{ formData, handleChange, handleSubmit, addRef, refs, getRef }}
    >
      {children}
    </FormContext.Provider>
  );
};
