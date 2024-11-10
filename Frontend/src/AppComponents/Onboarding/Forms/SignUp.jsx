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

const SignUp = () => {
 

  const { currentStep, steps, handleStepChange } = useContext(AppContext);

  const handleNext = () => {
    if (currentStep < steps.length) handleStepChange(currentStep + 1);
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
                <Label htmlFor="username">Username</Label>
                <Field
                  id="firstname"
                  name="username"
                  placeholder="Tyler123"
                  type="text"
                  as={Input}
                  className={
                    touched.username && errors.username ? "border-red-500" : ""
                  }
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Field
                  id="email"
                  name="email"
                  placeholder="projectmayhem@fc.com"
                  type="email"
                  as={Input}
                  className={
                    touched.email && errors.email ? "border-red-500" : ""
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Field
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  as={Input}
                  className={
                    touched.password && errors.password ? "border-red-500" : ""
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <CardFooter className="flex w-full">
              <div className="flex justify-between gap-4 w-full">
                
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

export default SignUp;
