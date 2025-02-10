import React,{useState,useContext} from 'react'
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios"
import { WpContext } from '../../context/WpProvider';
const Wpicon = () => {
 const {phone,wpData} = useContext(WpContext)


 if(!phone){
   wpData()
 }
  
  
 
  return (
    <div className='wpicon'>
        <a href={phone}>
        <FaWhatsapp />
        </a>
        </div>
  )
}

export default Wpicon