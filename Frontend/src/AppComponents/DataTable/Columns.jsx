import React from "react";
import { Button } from "@/components/ui/Button";
import { IconCopy } from "@tabler/icons-react";

export const columns = (handleCopy, copiedUserId) => [
  {
    accessorKey: "username",
    header: "User Name",
    cell: ({ row }) => <span>{row.getValue("username")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="truncate max-w-xs">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <span>{row.getValue("role")}</span>,
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => <span>{row.getValue("position")}</span>,
  },
  {
    accessorKey: "inviteLink",
    header: "Invite Link",
    cell: ({ row }) => {
      const { inviteLink, inviteStatus, id } = row.original; // Extract relevant data from the row
      return inviteLink ? (
        inviteStatus !== "Used" ? (
          <Button variant="ghost" onClick={() => handleCopy(inviteLink, id)}>
            <IconCopy stroke={1} className="mr-2" />
            {copiedUserId === id ? "Copied!" : "Copy Invite"}
          </Button>
        ) : (
          <div className="w-2/3">
            <Button
              className=" bg-gray-100 mr-4 ml-4 text-primary-600 hover:bg-primary-100"
              onClick={() => console.log("Generate new link for user:", id)}
            >
              <IconCopy stroke={2} className="mr-1" />
              <h2 className="text-xs md:block hidden">Create Invite</h2>
            </Button>
          </div>
        )
      ) : null; // Render nothing if inviteLink is null
    },
  },
];
