import React, { useContext } from "react";
import { FormContext } from "../components/contexts/FormProvider"; // Adjust the import based on your folder structure

interface MyFormProps {
  children?: React.ReactNode;
  onSubmit: (data: Record<string, string>) => void; // Prop for the submit handler
  buttonClasses?: string;
  buttonStyles?: React.CSSProperties;
  styles?: React.CSSProperties;
  className?: string;
  formtitle?: string;
}

const MyForm: React.FC<MyFormProps> = ({
  onSubmit,
  children,
  buttonClasses = "",
  buttonStyles = {},
  styles = {},
  className = "",
  formtitle = "",
}) => {
  const { handleSubmit } = useContext(FormContext) || {
    handleSubmit: () => console.warn("FormContext is not available."),
  };
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(onSubmit); // Trigger form submission with the passed-in onSubmit function
  };

  return (
    <form
      className={
       `mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 ${className}`
      }
      onSubmit={onFormSubmit}
      style={styles}
      // style={{ width: "100%" }}
    >
      <h1 className="text-center text-2xl font-bold text-blue-600 sm:text-3xl">
        {formtitle}
      </h1>
      {children}
      <button
        type="submit"
        className={`w-full bg-blue-500 text-white p-2 rounded-lg ${buttonClasses}`}
        style={buttonStyles}
      >
        Submit
      </button>
    </form>
  );
};

export default MyForm;
