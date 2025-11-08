import React from 'react'
import {
     Breadcrumb,
     BreadcrumbItem,
     BreadcrumbLink,
     BreadcrumbList,
     BreadcrumbPage,
     BreadcrumbSeparator,
   } from "@/components/ui/breadcrumb"

const BreadCrumb = ({currentProduct, currentProject}) => {
  return (
     <Breadcrumb>
     <BreadcrumbList>
       <BreadcrumbItem>
         <BreadcrumbLink className='hover:text-secondary-500 text-slate-400 font-semibold' href="/dashboard">{currentProduct}</BreadcrumbLink>
       </BreadcrumbItem>
       <BreadcrumbSeparator className=' text-slate-400 font-semibold' />
       <BreadcrumbItem>
         <BreadcrumbPage className='text-primary-500 font-semibold'>{currentProject}</BreadcrumbPage>
       </BreadcrumbItem>
     </BreadcrumbList>
   </Breadcrumb>
  )
}

export default BreadCrumb
