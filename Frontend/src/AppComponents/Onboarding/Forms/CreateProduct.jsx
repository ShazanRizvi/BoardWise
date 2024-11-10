import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CardFooter } from "@/components/ui/card";
import { StepperControls } from "@/components/ui/animated-stepper";
import AppContext from "@/context/AppContext";
import { IoArrowBack } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  firstname: Yup.string().when({
    then: Yup.string().required("First name is required"),
  }),
  lastname: Yup.string().when({
    then: Yup.string().required("Last name is required"),
  }),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const CreateProduct = () => {
 

  const { currentStep, steps, handleStepChange } = useContext(AppContext);
   
  

     const handleNext = () => {
      if (currentStep < steps.length) handleStepChange(currentStep + 1);
    };
  
    const handlePrev = () => {
      if (currentStep > 1) handleStepChange(currentStep - 1);
    };



  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        //validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form values:", values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="grid w-full items-center gap-4">
            
             <div className="flex flex-col space-y-1.5">
               <Label htmlFor="productName">Project Name</Label>
               <Field
                 id="productName"
                 name="productName"
                 placeholder="Boardwise product 1"
                 type="text"
                 as={Input}
                 className={
                   touched.productName && errors.productName ? "border-red-500" : ""
                 }
               />
               <ErrorMessage
                 name="productName"
                 component="div"
                 className="text-red-500 text-sm"
               />
             </div>


            </div>

            <CardFooter className="flex w-full">
              <div className="flex justify-between gap-4 w-full">
              <button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className=" w-10 h-10 flex justify-center items-center rounded-full text-sm font-medium text-white border-primary-200 border hover:bg-primary-100/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IoArrowBack size={20} color="#8b5cf6" />
                </button>
                <button
                  onClick={handleNext}
                  // disabled={currentStep === totalSteps}
                  className="px-4 py-2 w-full flex justify-center items-center text-sm font-medium rounded-md text-white bg-primary  hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="gap-2">Next</span>
                  {"   "}
                  <FiChevronRight size={20} />
                </button>
              </div>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
