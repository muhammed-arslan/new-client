import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Wpicon from '../../components/wpicon/Wpicon'
import CookieInfo from '../../components/cookieinfo/CookieInfo'
import Footer from '../../components/footer/Footer'

function Layout() {
  return (
    <div className="layout">
      <div className="layout-navbar">
        <Navbar />
      </div>
      <div className="layout-content">
        <div className="outlet">
        <Outlet />
        </div>
        <div><CookieInfo /></div>
         <Footer/>
        <Wpicon />
      </div>

    </div>
  )
}


export { Layout }