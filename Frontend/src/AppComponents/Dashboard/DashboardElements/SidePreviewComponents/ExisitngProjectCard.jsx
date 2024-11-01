import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const people = [
     {
       id: 1,
       name: "John Doe",
       designation: "Software Engineer",
       image:
         "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
     },
     {
       id: 2,
       name: "Robert Johnson",
       designation: "Product Consultant",
       image:
         "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
     },
     {
       id: 3,
       name: "Jane Smith",
       designation: "Data Scientist",
       image:
         "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
     },
     {
       id: 4,
       name: "Emily Davis",
       designation: "UX Designer",
       image:
         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
     },
     {
       id: 5,
       name: "Tyler Durden",
       designation: "Soap Developer",
       image:
         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
     },
     {
       id: 6,
       name: "Dora",
       designation: "The Explorer",
       image:
         "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
     },
   ];

const ExisitngProjectCard = () => {
     
  return (
    <Card className="bg-white p-5 border-none rounded-3xl">
      <div className="flex gap-1 w-full">
        <Badge variant="secondary">Project</Badge>
        <Badge variant="secondary">Project</Badge>
        <Badge variant="secondary">Project</Badge>
      </div>
      <CardHeader className="p-0 space-y-0 mb-3">
        <CardTitle>
          <span className="text-base">Project K</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-0">
        <div className="flex justify-between">
          <div className=" flex flex-col justify-center rounded-lg p-2 shadow-md">
            <p className="text-sm text-gray-400">Project Deadline</p>
            <h1 className="text-lg font-bold text-primary-500">12/12/2021</h1>
          </div>
          <div className=" flex flex-col justify-center rounded-lg p-2 shadow-md">
            <p className="text-sm text-gray-400">Project Status</p>
            <h1 className="text-lg font-bold text-red-500">Pending</h1>
          </div>
          <div className=" flex flex-col justify-center rounded-lg p-2 shadow-md">
            <p className="text-sm text-gray-400">Project Manager</p>
            <h1 className="text-lg font-bold text-primary-500">Anurag goyal</h1>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0 mt-5">
        <Separator className="bg-gray-100 mb-3" />
        <div className="flex flex-row items-left justify-left w-full">
        <AnimatedTooltip items={people} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExisitngProjectCard;
