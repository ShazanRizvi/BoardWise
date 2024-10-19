import React from 'react'
import Navbar from '../AppComponents/Navbar'
import { Outlet, useLocation } from 'react-router-dom'

const Root = () => {
  const location = useLocation()
  console.log('location', location)

  const hideNavbarRoutes = ['/dashboard', '/dashboard/create_project']
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  console.log('shouldHideNavbar', shouldHideNavbar)
  return (
    <>
    {!shouldHideNavbar && <Navbar />}
    <Outlet/>
    </>
  )
}

export default Root
