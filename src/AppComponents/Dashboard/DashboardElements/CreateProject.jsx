import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
const CreateProject = () => {
  return (
    <div className="m-5 w-full">
      <h1 className="text-4xl font-bold ">Create New Project</h1>
      <Formik
        initialValues={{
          projectname: "",
          projectdescription: "",
          projectmembers: "",
          projectmanager: "",
          projectdeadline: "",
        }}
        onSubmit={(values) => {
          console.log("Form values:", values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="mt-10 w-full">
            <div className="flex justify-between w-full gap-4">
              <div className="w-full">
                <Label>Project Name</Label>
                <Input
                  type="text"
                  placeholder="Give Your Project a Name"
                ></Input>
              </div>
              <div className="w-full">
                <Label>Project Alias</Label>
                <Input
                  type="text"
                  placeholder="Give Your Project an Alias for ease of access"
                ></Input>
              </div>
            </div>
            <div className="mt-5">
              <Label>Project Description</Label>
              <Textarea
                type="text"
                placeholder="Give Your Project a Description"
              ></Textarea>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProject;
