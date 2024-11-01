import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";

// Validation Schema using Yup
// const validationSchema = Yup.object({
//   firstname: Yup.string().when("mode", {
//     is: (mode) => mode !== "login",
//     then: Yup.string().required("First name is required"),
//   }),
//   lastname: Yup.string().when("mode", {
//     is: (mode) => mode !== "login",
//     then: Yup.string().required("Last name is required"),
//   }),
//   email: Yup.string().email("Invalid email address").required("Email is required"),
//   password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
// });

const Auth = () => {
  const { mode } = useParams();
  const isLogin = mode === "login";

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Sign up"}</CardTitle>
          <CardDescription>
            {isLogin ? "Welcome Back!" : "Create your account."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              mode: mode,
            }}
            // validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form values:", values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="grid w-full items-center gap-4">
                  {!isLogin && (
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="firstname">First name</Label>
                      <Field
                        id="firstname"
                        name="firstname"
                        placeholder="Tyler"
                        type="text"
                        as={Input}
                        className={touched.firstname && errors.firstname ? "border-red-500" : ""}
                      />
                      <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm" />
                    </div>
                  )}

                  {!isLogin && (
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="lastname">Last name</Label>
                      <Field
                        id="lastname"
                        name="lastname"
                        placeholder="Durden"
                        type="text"
                        as={Input}
                        className={touched.lastname && errors.lastname ? "border-red-500" : ""}
                      />
                      <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm" />
                    </div>
                  )}

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="projectmayhem@fc.com"
                      type="email"
                      as={Input}
                      className={touched.email && errors.email ? "border-red-500" : ""}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Field
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      type="password"
                      as={Input}
                      className={touched.password && errors.password ? "border-red-500" : ""}
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <CardFooter className="flex w-full">
                  <Button className type="submit" variant='default'>{isLogin ? "Login" : "Sign up"}</Button>
                </CardFooter>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
