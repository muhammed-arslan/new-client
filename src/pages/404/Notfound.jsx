import React from 'react'
import { Link } from 'react-router-dom'
const Notfound = () => {
  return (
    <div className='notfound'>
        <div className="notfoundtext">
        <span className='notfoundtitle'>404</span>
        <span className='notfoundesc'>Maalesef aradığın sayfa bulunamadı</span>
        </div>
        <div className="notfoundbtn">
        <button> <Link to={"/"}>Ana sayfaya dön</Link></button>
        </div>
    </div>
  )
}

export default Notfound