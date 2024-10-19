import React from 'react'
import { DashboardSidebar } from '../AppComponents/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import { cn } from "@/lib/utils";

const Dashboard = () => {
  return (
     <div
     className={cn(
       "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
     )}>
    <DashboardSidebar/>
    <Outlet/>
    </div>
  )
}

export default Dashboard
