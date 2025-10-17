import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CardFooter } from "@/components/ui/card";
import AppContext from "@/context/AppContext";
import { FiChevronRight } from "react-icons/fi";
import callAPI from "@/http/axios";
import { toast } from "react-hot-toast";

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
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) handleStepChange(currentStep + 1);
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Call the API for user creation
      const response = await callAPI("POST", "/auth/signup", values);

      if (response && response.token) {
        localStorage.setItem("access_token", response.token),
          toast.success("User created successfully");
        handleNext(); 
      }
    } catch (error) {
      toast.error("Error creating user");
      console.error("API Error:", error);
    } finally {
      const tokenFromStorage = localStorage.getItem("access_token");
      //console.log('token from storage', tokenFromStorage)
      setLoading(false);
    }
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
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Field
                  id="username"
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
                <Label htmlFor="emailAddress">Email Address</Label>
                <Field
                  id="emailAddress"
                  name="emailAddress"
                  placeholder="projectmayhem@fc.com"
                  type="email"
                  as={Input}
                  className={
                    touched.emailAddress && errors.emailAddress
                      ? "border-red-500"
                      : ""
                  }
                />
                <ErrorMessage
                  name="emailAddress"
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
                  type="submit"
                  // onClick={handleSubmit}
                  disabled={isSubmitting || loading}
                  // disabled={currentStep === totalSteps}
                  className="px-4 py-2 w-full flex justify-center items-center text-sm font-medium rounded-md text-white bg-primary  hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="gap-2">
                    {" "}
                    {loading ? "Creating..." : "Next"}
                  </span>
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
