import React from 'react'
import Navbar from '../AppComponents/Navbar'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default Root
