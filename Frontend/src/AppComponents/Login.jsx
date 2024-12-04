import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CardFooter } from "@/components/ui/card";
import AppContext from "@/context/AppContext";
import { FiChevronRight } from "react-icons/fi";
import callAPI from "@/http/axios";
import { toast } from "react-hot-toast";
import LoaderWhite from "../utils/LoaderWhite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log("loading", loading);
    try {
      const response = await callAPI("POST", "/auth/login", values);

      if (response && response.token) {
        localStorage.setItem("access_token", response?.token),
          toast.success(response?.message);
      }
    } catch (error) {
      toast.error("Error creating user");
      console.error("API Error:", error);
    } finally {
      const tokenFromStorage = localStorage.getItem("access_token");
      console.log("token from storage for login", tokenFromStorage);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div>
          <Tabs defaultValue="org_owner" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="org_owner">Organization Admin</TabsTrigger>
              <TabsTrigger value="org_employee">
                Organization Employee
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className=" w-96 p-8 rounded-2xl border border-primary-300"
              value="org_owner"
            >
              <div className="mb-4">
                <h1 className="text-3xl font-semibold mb-2">Welcome Back!</h1>
                <p className="text-sm font-normal text-gray-500">
                  Login if you are Owner of the Organization
                </p>
              </div>
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
                            touched.password && errors.password
                              ? "border-red-500"
                              : ""
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
                          //disabled={isSubmitting || loading}
                          // disabled={currentStep === totalSteps}
                          className="px-4 py-2 w-full flex justify-center items-center text-sm font-medium rounded-md text-white bg-primary  hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="gap-2">
                            {loading ? (
                              <LoaderWhite width={20} height={20} />
                            ) : (
                              <div className="flex">
                                Login <FiChevronRight size={20} />
                              </div>
                            )}
                          </span>
                        </button>
                      </div>
                    </CardFooter>
                  </Form>
                )}
              </Formik>
            </TabsContent>
            <TabsContent
              className=" w-96 p-8 rounded-2xl border border-primary-300"
              value="org_employee"
            >
              <div className="mb-4">
                <h1 className="text-3xl font-semibold mb-2">Welcome Back!</h1>
                <p className="text-sm font-normal text-gray-500">
                  Login if you are Employee of an Organization
                </p>
              </div>
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                }}
                //validationSchema={validationSchema}
                // onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div className="grid w-full items-center gap-4">
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
                            touched.password && errors.password
                              ? "border-red-500"
                              : ""
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
                          //disabled={isSubmitting || loading}
                          // disabled={currentStep === totalSteps}
                          className="px-4 py-2 w-full flex justify-center items-center text-sm font-medium rounded-md text-white bg-primary  hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="gap-2">
                            {loading ? (
                              <LoaderWhite width={20} height={20} />
                            ) : (
                              <div className="flex">
                                Login <FiChevronRight size={20} />
                              </div>
                            )}
                          </span>
                        </button>
                      </div>
                    </CardFooter>
                  </Form>
                )}
              </Formik>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Login;
