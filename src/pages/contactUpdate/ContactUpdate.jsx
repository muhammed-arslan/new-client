import React,{ useContext,useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import axios from 'axios'
const ContactUpdate = () => {
       
    const { user } = useContext(AuthContext)
    const [data,setData]  = useState("")
    const [name, setName] = useState(data.name)
    const [mail, setMail] = useState(data.mail)
    const [phone, setPhone] = useState(data.phone)
    const [location, setLocation] = useState(data.location)
    const [mapLocation, setMapLocation] = useState(data.mapLocation)
    const [mapEmbedLocation, setMapEmbedLocation] = useState(data.mapEmbedLocation)
    const [wp, setWp] = useState(data.wp)
 
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (user === null) {
            navigate("/404")
        }
        const fetchData = async () => {
        
            const propertyData = await axios.get( `${process.env.REACT_APP_API}contact`)
            setName(propertyData.data.data[0].name)
            setMail(propertyData.data.data[0].mail)
            setPhone(propertyData.data.data[0].phone)
            setLocation(propertyData.data.data[0].location)
            setMapLocation(propertyData.data.data[0].mapLocation)
            setMapEmbedLocation(propertyData.data.data[0].mapEmbedLocation)
            setWp(propertyData.data.data[0].wp)
        }
         fetchData()
       
      },[user])
     
    const handleProperty = async(e) => {
        e.preventDefault()
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API}contact`,
            data: {
                name: name,
                mail: mail,
                phone: phone,
                location: location,
                mapLocation: mapLocation,
                mapEmbedLocation: mapEmbedLocation,
                wp: wp,
            },
            headers: {
                "Authorization" : `Token ${user}`
            }
          });
          window.location.reload();
    }
  return (
    <div className='guncellemeformu'>
    <div className="form">
        <form>
            <h4>iletişim Güncelle</h4>
            İsim:
        
            <input type="text" value={name}  onChange={(e) => setName(e.target.value)} />
            Mail adresi:
            <input type="text" value={mail}  onChange={(e) => setMail(e.target.value)} />
            Telefon numarası:
            <input type="text" value={phone}  onChange={(e) => setPhone(e.target.value)} />
            Adres:
            <input type="text" value={location}  onChange={(e) => setLocation(e.target.value)} />
            Adres "google haritalar linki"
            <input type="text" value={mapLocation}  onChange={(e) => setMapLocation(e.target.value)} />
            Embed "haritada gösterilen konum burası değişmesine gerek yok farklı tipte alınmalı haritalar konumu kopyalanırsa bozulur"
            <input type="text" value={mapEmbedLocation}  onChange={(e) => setMapEmbedLocation(e.target.value)} />
            Whatsapp kodu "wa.me linkleri" 
            <input type="text" value={wp}  onChange={(e) => setWp(e.target.value)} />
   
            <button onClick={(e) => handleProperty(e)}>Bilgileri Güncelle</button>
        </form>
    </div>
</div>
  )
}

export default ContactUpdate