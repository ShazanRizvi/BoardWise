import React from 'react'

const EmptyDashboard = ({Resource}) => {
  return (
    <div className='p-4 '>
     
     <h1 className='lg:text-5xl md:text-2xl font-bold mb-2 text-primary-700 '>Looks like there is nothing here!!</h1>
     
     
      <p className='lg:text-xl md:text-sm  text-center text-slate-400 font-normal' >Add {Resource} to view it here</p>
    </div>
  )
}

export default EmptyDashboard
