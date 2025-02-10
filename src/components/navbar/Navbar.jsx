import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isNavbarOpen, setIsNavbarOpen] = useState("")
  useEffect(() => {

  }, [isNavbarOpen])

  return (

    <div className='navbar'>



      {user ?



        <div className="navs">   {isNavbarOpen == "openBar" ? <button className='mobileBtn' onClick={() => setIsNavbarOpen(isNavbarOpen == "openBar" ? "" : "openBar")}><IoClose /></button> : <button className='mobileBtn' onClick={() => setIsNavbarOpen(isNavbarOpen == "openBar" ? "" : "openBar")}><RxHamburgerMenu /></button>}
          <div className={`nav-items ${isNavbarOpen}`}  >
            <NavLink to="/" onClick={() => setIsNavbarOpen("none")} >Anasayfa</NavLink>
            <NavLink to="/ilanlar" onClick={() => setIsNavbarOpen("none")} >İlanlar</NavLink>
            <NavLink to="/hakkimda" onClick={() => setIsNavbarOpen("none")} >Hakkımda</NavLink>
            <NavLink to="/uzmanliklarim" onClick={() => setIsNavbarOpen("none")} >Uzmanlıklarım</NavLink>
            <NavLink to="/iletisim" onClick={() => setIsNavbarOpen("none")} >İletişim</NavLink>
            <button onClick={() => logout()}>Çıkış yap</button>
          </div>
        </div>
        :
        <div className="navs">  {isNavbarOpen == "openBar"  ? <button className='mobileBtn' onClick={() => setIsNavbarOpen(isNavbarOpen == "openBar" ? "" : "openBar")}><IoClose /></button> : <button className='mobileBtn' onClick={() => setIsNavbarOpen(isNavbarOpen == "openBar" ? "" : "openBar")}><RxHamburgerMenu /></button>}
          <div className={`nav-items ${isNavbarOpen}`}  >
            <NavLink to="/" onClick={() => setIsNavbarOpen("none")} >Anasayfa</NavLink>
            <NavLink to="/ilanlar" onClick={() => setIsNavbarOpen("none")} >İlanlar</NavLink>
            <NavLink to="/hakkimda" onClick={() => setIsNavbarOpen("none")} >Hakkımda</NavLink>
            <NavLink to="/uzmanliklarim" onClick={() => setIsNavbarOpen("none")} >Uzmanlıklarım</NavLink>
            <NavLink to="/iletisim" onClick={() => setIsNavbarOpen("none")} >İletişim</NavLink>
          </div>
        </div>}




    </div>
  )
}

export default Navbar