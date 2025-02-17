import { useState } from "react";
import React from "react";
import { FloatingNav } from '../components/ui/floating-navbar';
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";



const Navbar = () => {
  const [active, setActive] = useState(null);
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/signup",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

     
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
    
  )
}


export default Navbar
