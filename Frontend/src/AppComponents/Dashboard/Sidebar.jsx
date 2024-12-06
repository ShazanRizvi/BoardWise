"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import callAPI from "@/http/axios";
import { useNavigate } from "react-router-dom";

export function DashboardSidebar() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          // Call the API to get user details
          const response = await callAPI("GET", "/current_user/details", null, {
            Authorization: `Bearer ${token}`,
          });
          setUserDetails(response); // Set user details to state
          
        } catch (error) {
          console.error("Error fetching user details:", error);
          localStorage.removeItem("access_token"); // Remove token if it's invalid
          navigate("/login"); // Redirect to login if user details fetch fails
        }
      } else {
        navigate("/login"); // Redirect to login if no token is found
      }
    };

    fetchUserDetails(); // Call the async function
   
  }, [navigate]); 
  console.log("user details", userDetails);
  
  const links = [
    {
      label: "Products",
      href: "/dashboard/product_dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "People",
      href: "/dashboard/organization/people_of_org",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/onboarding",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
      <Sidebar open={open} setOpen={setOpen} className='bg-gradient-to-t from-purple-500/20 via-violet-500/10 to-pink-500/5'>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: (
                  <div className="flex flex-col">
                    <span className="text-base bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 font-bold ">{userDetails?.data?.username}</span>
                    <span className="text-sm text-gray-700 ">{userDetails?.data?.emailAddress}</span>
                    <span className="text-xs text-gray-400">{userDetails?.data?.organization?.organizationName}</span>
                  </div>
                ),
                href: "#",
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      
    
  );
}
export const Logo = () => {
  return (
    (<Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
        className="h-5 w-6 bg-gradient-to-tr from-primary-400 to-secondary-300 dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 dark:text-white whitespace-pre">
        BoardWise
      </motion.span>
    </Link>)
  );
};
export const LogoIcon = () => {
  return (
    (<Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
        className="h-5 w-6 bg-gradient-to-tr from-primary-400 to-secondary-300 dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>)
  );
};
