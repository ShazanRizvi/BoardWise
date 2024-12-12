import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FiChevronRight } from "react-icons/fi";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoaderWhite from "../utils/LoaderWhite";
import callAPI from "@/http/axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

const ActivationForm = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const subtitle = "A new and innovative way to manage and create your boards";

  const token = searchParams.get("token");

  console.log("token", token);
  //   useEffect(() => {
  //      const fetchEmailFromToken = async () => {
  //        try {
  //          const response = await callAPI("POST", "/auth/validate_invite", { token });
  //          setEmail(response.email); // Assume the API returns the associated email
  //        } catch (error) {
  //          console.error("Error validating token:", error);
  //          alert("Invalid or expired activation token.");
  //          navigate("/login"); // Redirect if token is invalid
  //        }
  //      };

  //      if (token) {
  //        fetchEmailFromToken();
  //      }
  //    }, [token, navigate]);

  return (
    <BackgroundBeamsWithCollision>
      <div className="lg:flex  w-full p-10 gap-3 items-center justify-between h-screen">
        {/* Form Div */}
        <div className=" lg:w-1/2 h-full flex justify-center items-center">
          <div className="flex items-center justify-center ">
            <div className="p-8 rounded-2xl border border-primary-300">
              <div className="mb-4 ">
                <h1 className="text-3xl font-semibold mb-2">
                  Activate Account
                </h1>
                <p className="text-sm font-normal text-gray-500">
                  Activate your account to access your Organization.
                </p>
              </div>
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                }}
                //validationSchema={validationSchema}
                onSubmit={(values) => console.log(values)}
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
                          value={email}
                          disabled
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
                                Activate Account <FiChevronRight size={20} />
                              </div>
                            )}
                          </span>
                        </button>
                      </div>
                    </CardFooter>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div className=" hidden lg:block w-1/2 ">
          <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span className="">BoardWise</span>
              </div>
              <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                <span className="">BoardWise</span>
              </div>
            </div>
            <TextGenerateEffect
              words={subtitle}
              className="text-center text-black dark:text-white text-lg md:text-2xl font-semibold"
            />
            <div className="flex justify-center w-full mt-20"></div>
          </h2>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default ActivationForm;
