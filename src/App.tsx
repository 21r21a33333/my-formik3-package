// import React from "react";
// // import "./App.css";
// import {
//   FormProvider,
//   MyForm,
//   TextField,
//   EmailField,
//   PhoneNumberField,
//   DropDownField,
//   NumberInputField,
//   SliderField,
//   DatePickerField,
//   TextAreaField,
//   Label,
// } from "my-formik3";
// const App: React.FC = () => {
//   const handleFormSubmit = (data: Record<string, string>) => {
//     console.log("Submitted Data: ", data);
//   };
//   const dropdownOptions = [
//     { value: "option1", label: "Option 1" },
//     { value: "option2", label: "Option 2" },
//     { value: "option3", label: "Option 3" },
//   ];

//   return (
//     <FormProvider>
//       <MyForm
//         onSubmit={handleFormSubmit}
//         buttonClasses="asdf"
//         buttonStyles={{ width: "100%" }}
//         formtitle="Form"
//       >
//         <Label For="firstname" text="Name" isRequired />
//         <TextField name="firstname" placeholder="Enter firstname" isRequired />
//         <Label For="lastname" text="Name" isRequired />
//         <TextField name="lastname" placeholder="Enter lastname" />
//         <Label For="email" text="Name" isRequired />
//         <EmailField
//           name="email"
//           placeholder="Enter email"
//           isRequired
//           styles={{ width: "50%" }}
//         />
//         <Label For="PhoneNumber" text="Name" isRequired />
//         <PhoneNumberField
//           name="phoneNumber"
//           placeholder="Enter phone number"
//           isRequired
//           styles={{ width: "50%" }}
//           className="asdfffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
//         />
//         <Label For="dropdown" text="Name" isRequired />
//         <DropDownField
//           name="dropdown"
//           isRequired
//           options={dropdownOptions}
//           placeholder="Select an option"
//         />
//         <Label For="age" text="Name" isRequired />
//         <NumberInputField
//           name="age"
//           placeholder="Enter your age"
//           isRequired
//           min={18}
//           max={99}
//         />
//         <Label For="age2" text="Name" isRequired />
//         <NumberInputField
//           name="age2"
//           placeholder="Enter your age"
//           isRequired
//           min={18}
//           max={99}
//         />
//         <Label For="slider1" text="Name" isRequired />
//         <SliderField
//           name="slider1"
//           min={0}
//           max={100}
//           initialValue={50}
//           className="mb-4"
//           // styles={{ width: "300px" }} // Custom styles if needed
//         />
//         <Label For="selectedDate" text="Name" isRequired />
//         <DatePickerField isRequired name="selectedDate" className="mb-4" />
//         <Label For="description" text="Name" isRequired />
//         <TextAreaField isRequired name="description" className="mb-4" />
//       </MyForm>
//     </FormProvider>
//   );
// };

// export default App;
// // export default App;

// // export default MyForm;
