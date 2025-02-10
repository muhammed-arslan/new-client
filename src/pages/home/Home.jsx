import React from 'react'
import { Link } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { IKImage } from 'imagekitio-react';
const Home = () => {

  return (
    <div className='home'>
      <div className="left-side">
      <h3>Hayallerinizi  daha fazla  <span> ERTELEMEYİN! </span></h3>
    
      </div>
      <div className="right-side">
      
      <Link to={"/ilanlar"}><button className='propertyBtn'>İlanlar</button></Link>
      <Link to={"/iletisim"}><button className='contactBtn'>İletişim</button></Link>
  
     
      
      </div>
      <div className="down-side">
        <img className='homeImg' src={require('../../assets/logos/acp.webp')} alt="" />
        <img className='homeImg' src={require('../../assets/logos/ccim.png')} alt="" />
        <img className='homeImg' src={require('../../assets/logos/elevate.webp')} alt="" />
        <img className='homeImg' src={require('../../assets/logos/powerstart.webp')} alt="" />
      </div>
    </div>
  )
}

export default Home