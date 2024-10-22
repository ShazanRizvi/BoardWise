import React from 'react'
import { useParams } from 'react-router-dom'
import { FcParallelTasks } from "react-icons/fc";

const ProjectBoard = () => {
     const { projectId } = useParams();
  return (
    <div className='p-5'>
      <div className='flex justify-between items-center'>
      <div>
      <FcParallelTasks size={30} />
        </div>
        <div>
        <h1 className='text-2xl font-bold'>Project K</h1>
        </div>
        
        
      </div>
    </div>
  )
}

export default ProjectBoard
