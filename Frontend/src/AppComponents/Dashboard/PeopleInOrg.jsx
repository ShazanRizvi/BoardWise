import React, { useState, useContext, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { IconCopy } from "@tabler/icons-react";
import toast from "react-hot-toast";
import AddEditTaskDialog from "./DashboardElements/ProjectBoardComponents/AddEditTaskDialog";
import { FcInvite } from "react-icons/fc";
import InvitePeopleForm from "./DashboardElements/ProjectBoardComponents/ModalForms/InvitePeopleForm";
import { GoPeople } from "react-icons/go";
import SideDrawer from "./DashboardElements/ProjectBoardComponents/SideDrawer";
import AppContext from "../../context/AppContext";
import callAPI from "@/http/axios";
import Loader from "@/utils/Loader";

const PeopleInOrg = () => {
  const { isDrawerOpen, closeDrawer, setIsDrawerOpen } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [usersOfOrg, setUsersOfOrg] = useState([]);
  const [copiedUserId, setCopiedUserId] = useState(null);

  useEffect(() => {
    const fetchallUsersofOrg = async () => {
      setLoading(true);
      try {
        const response = await callAPI("GET", `/organizations/users`, null, {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        });
        setUsersOfOrg(response?.users);
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchallUsersofOrg();
  }, [navigate]);

  const handleDrawrOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleCopy = async (inviteLink, userId) => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopiedUserId(userId);
      toast.success("Copied to clipboard");

      setTimeout(() => setCopiedUserId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="m-4 w-full flex justify-center ">
      <div className=" w-2/3">
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl font-bold">People</h1>
            <p className="text-base text-slate-400 font-normal">
              These are the people who belong to Organization
            </p>
          </div>
          <div>
            <Button variant="outline" onClick={handleDrawrOpen}>
              <span>
                <GoPeople />
              </span>{" "}
              <span>Invite People</span>
            </Button>
          </div>
        </div>
        <div>
          <SideDrawer isOpen={isDrawerOpen} closeDrawer={closeDrawer}>
            <InvitePeopleForm />
          </SideDrawer>
        </div>

        {loading ? (
          <div className=" flex justify-center items-center h-screen w-full">
            <Loader width={100} height={100} />
          </div>
        ) : (
          <div className="mt-4 max-w-7xl ">
            <Table className=" bg-primary-50">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead className="text-center">Invite Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersOfOrg.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell>{user.emailAddress}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.userOrgPosition}</TableCell>
                    <TableCell>
                      {user.inviteLink ? (
                        user.inviteStatus !== "Used" ? (
                          <Button
                            variant="ghost"
                            onClick={() => handleCopy(user.inviteLink, user.id)}
                          >
                            <IconCopy stroke={2} className="mr-2" />
                            {copiedUserId === user.id
                              ? "Copied!"
                              : "Copy Invite"}
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            onClick={() =>
                              console.log(
                                "Generate new link for user:",
                                user.id
                              )
                            }
                          >
                            <IconCopy stroke={2} className="mr-2" />
                            Generate Invite
                          </Button>
                        )
                      ) : (
                        <></> // Render nothing if inviteLink is null
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleInOrg;

// export const payments = [
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "489e1d42",
//     amount: 125,
//     status: "processing",
//     email: "example@gmail.com",
//   },
//   {
//     id: "6f8a4b3c",
//     amount: 200,
//     status: "success",
//     email: "user1@example.com",
//   },
//   {
//     id: "d92c1e8a",
//     amount: 75,
//     status: "failed",
//     email: "user2@example.com",
//   },
//   {
//     id: "9b7e3f2d",
//     amount: 50,
//     status: "pending",
//     email: "test@example.com",
//   },
//   {
//     id: "4a8c1d7e",
//     amount: 300,
//     status: "processing",
//     email: "client@example.com",
//   },
//   {
//     id: "2d7f3b9a",
//     amount: 450,
//     status: "success",
//     email: "customer@example.com",
//   },
//   {
//     id: "8e9a4d2c",
//     amount: 90,
//     status: "failed",
//     email: "another@example.com",
//   },
// ];
