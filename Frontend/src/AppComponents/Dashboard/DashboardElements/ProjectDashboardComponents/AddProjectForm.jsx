import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import callAPI from "@/http/axios";
import LoaderWhite from "../../../../utils/LoaderWhite";
import {useParams} from "react-router-dom";

const AddProjectForm = () => {
  const [loading, setLoading] = useState(false);
  const {productId} = useParams();


  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await callAPI(
        "POST",
        `/projects/create_project/${productId}`,
        values,
        {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      );
      console.log("response", response);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Formik
      initialValues={{
        projectName: "",
        description: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div className="grid gap-4">
            {/* Product Name */}
            <div className="w-full">
              <Label htmlFor="projectName">Project Name</Label>
              <Field
                id="projectName"
                name="projectName"
                type="text"
                placeholder="Give Your Project a Name"
                as={Input}
              />
              <ErrorMessage
                name="projectName"
                component="div"
                className="col-span-4 text-red-500 text-sm"
              />
            </div>

            {/* Product Description */}
            <div className="w-full">
              <Label htmlFor="description">Project Description</Label>
              <Field
                id="description"
                name="description"
                placeholder="Give Your Product a Description"
                as={Textarea}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="col-span-4 text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="w-full">
              <Button type="submit" className="w-full">
                <span className="gap-2">
                  {loading ? (
                    <LoaderWhite width={20} height={20} />
                  ) : (
                    <div className="flex">Add Project</div>
                  )}
                </span>
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProjectForm;
