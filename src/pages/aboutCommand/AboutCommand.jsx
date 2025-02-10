import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AboutCommand = () => {
    const { user } = useContext(AuthContext)
    const [about, setAbout] = useState("")
  
    const navigate = useNavigate()
    useEffect(() => {
        if (user === null) {
            navigate("/404")
        }
    }, [user])


    const handleAbt = async (e) => {
        e.preventDefault()

     

       
        await axios.post(`${process.env.REACT_APP_API}about`, {
            about: about
           
           },{
             headers: {
                 'Authorization': `Token ${user}`
             }
         })
           window.location.reload();
    }
    return (
        <div className='ilanyonetim'>
            <div className="form">
                <form>
                    <h4>Hakkımda Ekle</h4>
                    Hakkımda Metni:
                    <input type="text" onChange={(e) => setAbout(e.target.value)} />
                 
                    <button onClick={(e) => handleAbt(e)}>Hakkımda ekle</button>
                </form>
            </div>
        </div>
    )
}

export default AboutCommand