import React from 'react'
import { useParams } from 'react-router-dom'
import DashboardCard from './ProjectDashboardComponents/DashboardCard'

const ProjectDashboard = () => {
     const { productId } = useParams()
  return (
    <div className='m-4'>
      <h1 className='text-4xl font-bold'>Projects</h1>
       <p className='text-base text-slate-400 font-normal'>These are the projects which belong to product {productId}</p>
       <div><DashboardCard/></div>
    </div>
  )
}

export default ProjectDashboard
