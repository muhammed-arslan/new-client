import React, { useContext, useEffect, useState } from 'react'
import { RiSofaLine } from "react-icons/ri";
import { PiBuildingApartment } from "react-icons/pi";
import { TbCurrencyLira } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { RiDeleteBin2Line } from "react-icons/ri";
import axios from 'axios';
const Card = (props) => {
  const {user} = useContext(AuthContext)


  const deleteFunc = async() => {
    await axios.delete(`${process.env.REACT_APP_API}properties/delete/${props.data[1]._id}`, {
      headers: {
        
          'Authorization': `Token ${user}`
      }
  })
  window.location.reload();

  }
  if(user){

  
  return (
    <div className='card'>
      <img src={props.data[1].path} alt="" />
      <div className="info">

          <span className='price'>{props.data[1].fiyat.toLocaleString()}<TbCurrencyLira /></span>
          <h2>{props.data[1].baslik}</h2>
          <span className='location'>{props.data[1].konum}</span>
          <div className="buttons">
          <a href={props.data[1].url} target="_blank" rel="noopener noreferrer"> <button>İlana git </button></a>
          <button><Link to={`/ilanguncelle/${props.data[1]._id}`}>İlanı Güncelle</Link> </button>
          <button className='delete' onClick={() => deleteFunc()}><RiDeleteBin2Line /></button>
          </div>


      </div>
    </div>
  )
}
else{
  return(
  <div className='card'>
  <img src={props.data[1].path} alt="" />
  <div className="info">

  <span className='price'>{props.data[1].fiyat.toLocaleString()}<TbCurrencyLira /></span>
      <h2>{props.data[1].baslik}</h2>
      <span className='location'>{props.data[1].konum}</span>
      <div className="buttons">
      <a href={props.data[1].url} target="_blank" rel="noopener noreferrer"> <button>İlana git </button></a>
      <Link to={"/iletisim"}><button> Bana ulaşın</button></Link> 
      </div>


  </div>
</div>
)
}
}

export default Card