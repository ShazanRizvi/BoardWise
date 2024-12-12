import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import callAPI from "@/http/axios";
import LoaderWhite from "../../../../../utils/LoaderWhite";
import { MultiSelect } from "../../../../../components/ui/multi-select";
import { RiMailSendLine } from "react-icons/ri";

const InvitePeopleForm = () => {
  const [loading, setLoading] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleTogglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
    setIsDropdownActive((prev) => !prev);
  };
  const userRoles = [
    { value: "Admin", label: "Admin" },
    { value: "Team Member", label: "TeamMember" },
  ];
  return (
    <Formik
      initialValues={{
        userName: "",
        email: "",
        userRole: "",
        userOrgPostion: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className=" flex flex-col h-full">
          <div className="mb-5">
            <h1 className="text-xl font-bold">Add Users</h1>
            <p className="text-sm font-normal text-slate-500">Enter the details of the user you want to invite to your Organization.</p>
          </div>
          {/* Form Content */}
          <div className="flex-grow p-2 overflow-y-auto">
            <div className="grid gap-4">
              {/* User Name */}
              <div className="w-full">
                <Label htmlFor="userName">User Name</Label>
                <Field
                  id="userName"
                  name="userName"
                  type="text"
                  placeholder="Name of the user"
                  as={Input}
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="col-span-4 text-red-500 text-sm"
                />
              </div>

              {/* Email Address */}
              <div className="w-full">
                <Label htmlFor="email">Email Address</Label>
                <Field
                  id="email"
                  name="email"
                  placeholder="User email address (Organization)"
                  as={Input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="col-span-4 text-red-500 text-sm"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="userOrgPostion">User Position</Label>
                <Field
                  id="userOrgPostion"
                  name="userOrgPostion"
                  placeholder="Position of the user in the organization"
                  as={Input}
                />
                <ErrorMessage
                  name="userOrgPostion"
                  component="div"
                  className="col-span-4 text-red-500 text-sm"
                />
              </div>

              {/* User Roles */}
              <div className="w-full">
                <Label htmlFor="roles">User Roles</Label>
                <MultiSelect
                  options={userRoles}
                  placeholder="Select the Role of this user"
                  animation={2}
                  maxCount={3}
                  isPopoverOpen={isPopoverOpen}
                  setIsPopoverOpen={setIsPopoverOpen}
                  handleTogglePopover={handleTogglePopover}
                />
                <ErrorMessage
                  name="roles"
                  component="div"
                  className="col-span-4 text-red-500 text-sm"
                />
              </div>
              
            </div>
          </div>

          {/* Sticky Footer Button */}
          <div className="flex  justify-end ">
            <Button type="submit" className="w-full">
              <span className="gap-2">
                {loading ? (
                  <LoaderWhite width={20} height={20} />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>
                      <RiMailSendLine size={26}/>
                    </span>{" "}
                    <span>Send Invite</span>
                  </div>
                )}
              </span>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InvitePeopleForm;
