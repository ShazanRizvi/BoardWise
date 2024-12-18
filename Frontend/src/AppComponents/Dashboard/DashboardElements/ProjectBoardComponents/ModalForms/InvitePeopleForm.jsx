import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import callAPI from "@/http/axios";
import LoaderWhite from "../../../../../utils/LoaderWhite";
import { MultiSelect } from "../../../../../components/ui/multi-select";
import { RiMailSendLine } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AppContext from "../../../../../context/AppContext";

const InvitePeopleForm = () => {
  const [loading, setLoading] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const { setInvitedUserEmail } = useContext(AppContext);

  const handleTogglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
    setIsDropdownActive((prev) => !prev);
  };
  const userRoles = [
    { value: "Admin", label: "Admin" },
    { value: "TeamMember", label: "Team Member" },
  ];

  const handleSendInvite = async (values) => {
    setLoading(true);
    console.log("Form values for invite form:", values);
    try {
      const response = await callAPI("POST", "/auth/invite", values, {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      });
      console.log("Invite Response:", response);
      setInvitedUserEmail(response.email);
    } catch (error) {
      console.error("Error sending invite:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Formik
      initialValues={{
        emailAddress: "",
        userRole: "",
        userOrgPosition: "",
      }}
      onSubmit={handleSendInvite}
    >
      {({ isSubmitting }) => (
        <Form className=" flex flex-col h-full">
          <div className="mb-5">
            <h1 className="text-xl font-bold">Add Users</h1>
            <p className="text-sm font-normal text-slate-500">
              Enter the details of the user you want to invite to your
              Organization.
            </p>
          </div>
          {/* Form Content */}
          <div className="flex-grow p-2 overflow-y-auto">
            <div className="grid gap-4">
              {/* Email Address */}
              <div className="w-full">
                <Label htmlFor="emailAddress">Email Address</Label>
                <Field
                  id="emailAddress"
                  name="emailAddress"
                  placeholder="User email address (Organization)"
                  as={Input}
                />
                <ErrorMessage
                  name="emailAddress"
                  component="div"
                  className="col-span-4 text-red-500 text-sm"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="userOrgPosition">User Position</Label>
                <Field
                  id="userOrgPosition"
                  name="userOrgPosition"
                  placeholder="Position of the user in the organization"
                  as={Input}
                />
                <ErrorMessage
                  name="userOrgPosition"
                  component="div"
                  className="col-span-4 text-red-500 text-sm"
                />
              </div>

              {/* User Roles */}

              <div className="w-full">
                <Label htmlFor="userRole">User Roles</Label>
                <Field name="userRole">
                  {({ field, form }) => (
                    <Select
                      value={field.value} // Bind Formik value
                      onValueChange={(value) =>
                        form.setFieldValue("userRole", value)
                      } // Update Formik state
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Role for the user" />
                      </SelectTrigger>
                      <SelectContent className="z-50">
                        <SelectGroup>
                          <SelectLabel>User Roles</SelectLabel>
                          {userRoles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
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
                      <RiMailSendLine size={26} />
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
