import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddTaskForm.css";
import AppContext from "../../../../../context/AppContext";
import ReactMultiSelect from "../../../../../components/ui/multi-select-new";

const AddTaskForm = () => {

  const { usersOfOrg, projectId } = useContext(AppContext);
  console.log("users of org from add task form", usersOfOrg);

  const transformedPeople = usersOfOrg?.map(person => ({
    value: person.name.toLowerCase().replace(/\s+/g, ''), // Lowercased and spaces removed for value
    label: person.name
}));


  const [tags, setTags] =useState([
    { value: "Bug", label: "Bug" },
    { value: "Frontend", label: "Frontend" },
    { value: "Backend", label: "Backend" },
    { value: "Deployment", label: "Deployment" },
  ]) ;

  const handleCreateNewOption = (newValue) => {
    const isConfirmed = window.confirm(`Do you want to add "${newValue}" to the list?`);
    if (isConfirmed) {
      const newOption = { value: newValue.toLowerCase(), label: newValue };
      setTags((prev) => [...prev, newOption]);
    }
    console.log("New Option:", newValue);
  };
  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }], // Font and size dropdowns
      ["bold", "italic", "underline", "strike"], // Text styles
      [{ color: [] }, { background: [] }], // Text color and background color
      [{ script: "sub" }, { script: "super" }], // Subscript / superscript
      [{ header: "1" }, { header: "2" }, "blockquote", "code-block"], // Headers and blockquote
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }], // Indent and alignment
      ["link"], // Media
      ["clean"], // Remove formatting
    ],
  };
  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "super",
    "sub",
    "header",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
  ];
  console.log('Project ID from task form',projectId);

  return (
    <Formik
      initialValues={{
        taskName: "",
        taskDescription: "",
        dueDate: "",
      }}
      onSubmit={(values, { resetForm }) => {
        // Handle form submission here
        console.log("Form Submitted:", values);
        // Optionally reset the form after submission
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div className="grid gap-4">
            <div className="w-full">
              <Label>Task Name</Label>
              <Input type="text" placeholder="Development Task"></Input>
              <ErrorMessage
                name="taskName"
                component="div"
                className="col-span-4 text-red-500 text-sm"
              />
            </div>

            {/* <div className="w-full mt-2">
              <Label>Task Members</Label>
              
              <ReactMultiSelect selectOptions={transformedPeople} SelectName="TaskMembers"/>
            </div> */}
            <div className="w-full mt-2">
              <Label>Task Badges</Label>
              
              <ReactMultiSelect selectOptions={tags} SelectName="Task Badges" isCreatable={true} 
        onCreateOption={handleCreateNewOption}/>

            </div>
            <div className="mt-2">
              <Label>Task Details</Label>
              <ReactQuill
                theme="snow"
                id="richText"
                modules={modules} // Add custom toolbar
                formats={formats}
                value={undefined} // This will come from Formik's state
                placeholder="Write task details"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Add Task"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddTaskForm;
