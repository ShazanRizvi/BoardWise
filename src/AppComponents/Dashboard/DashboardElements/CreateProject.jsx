import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "../../../components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "../../../components/ui/datepicker";
import { Button } from "@/components/ui/button";
import SidePreview from "./SidePreview";
import { ScrollArea } from "@/components/ui/scroll-area";
const CreateProject = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedTeammates, setSelectedTeammates] = useState([]);

  const handleTogglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
    setIsDropdownActive((prev) => !prev);
  };
  console.log("isPopoverOpen", isPopoverOpen);
  console.log("isDropdownActive", isDropdownActive);


  const previousProjects = [
    { id: 1, name: "Project Alpha" },
    { id: 2, name: "Project Beta" },
    { id: 3, name: "Project Gamma" },
  ];

  const availableTeammates = [
    { value: "john", label: "John Doe" },
    { value: "jane", label: "Jane Smith" },
    { value: "alex", label: "Alex Johnson" },
    { value: "Anurag Goyal", label: "Anurag Goyal" },
  ];
  return (
    <div className="flex justify-between gap-4 w-full">
      <div className="m-5 mr-0 w-4/5  p-10 rounded-xl">
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
              <ScrollArea className="w-full  h-[700px]">
                <div className="p-4">
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
                  <div className="mt-10">
                    <Label>Project Headline</Label>
                    <Textarea
                      type="text"
                      placeholder="Give your project a display headline"
                    ></Textarea>
                  </div>
                  <div className=" mt-5 flex justify-between w-full gap-4">
                    <div className="flex flex-col gap-2 w-full">
                      <Label>Project Manager</Label>
                      <Select className="w-full">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your project manager" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Available Managers</SelectLabel>
                            {availableTeammates.map((teammate) => (
                              <SelectItem
                                key={teammate.value}
                                value={teammate.value}
                              >
                                {teammate.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <Label className="mr-5">Project Deadline</Label>
                      <DatePicker
                        date={selectedDate}
                        setDate={setSelectedDate}
                        placeholder="Select a deadline"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <Label>Project Description</Label>
                    <Textarea
                      type="text"
                      placeholder="Give Your Project a Description"
                    ></Textarea>
                  </div>

                  <div className="w-full mt-8">
                    <Label>Project Members</Label>
                    <MultiSelect
                      options={availableTeammates}
                      placeholder="Select Teammates"
                      animation={2}
                      maxCount={3}
                      isPopoverOpen={isPopoverOpen}
                      setIsPopoverOpen={setIsPopoverOpen}
                      handleTogglePopover={handleTogglePopover}
                    />
                  </div>
                  <div className="mt-8">
                    <Button type="submit">Create Project</Button>
                  </div>
                </div>
              </ScrollArea>
            </Form>
          )}
        </Formik>
      </div>

      <div className="m-5 ml-0 w-2/5 bg-gradient-to-t from-purple-500/20 via-violet-500/10 to-pink-500/5 p-5 shadow-xl shadow-slate-100 rounded-xl overflow-clip">
        <div className="w-full">
          <SidePreview isDropdownActive={isDropdownActive} />
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
