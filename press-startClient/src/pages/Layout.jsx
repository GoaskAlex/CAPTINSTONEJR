import React from 'react'
import Navbar from '../components/Navbar'
import {Outlet} from "react-router-dom"


function Layout() {
  return (
 <>
      <Navbar/>
    <div className='p-4 flex-col min-h-fit'>
      <Outlet/>
    </div>
 </>
)
}

export default Layout