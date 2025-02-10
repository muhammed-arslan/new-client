import React,{ useContext,useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import axios from 'axios'
const PropertiesUpdate = () => {
    const { user } = useContext(AuthContext)
    const [data,setData]  = useState("")
    const [title, setTitle] = useState(data.baslik)
    const [location, setLocation] = useState(data.konum)
    const [price, setPrice] = useState(data.fiyat)
    const [url, setUrl] = useState(data.url)
 
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (user === null) {
            navigate("/404")
        }
        const fetchData = async () => {
       
            const propertyData = await axios.get( `${process.env.REACT_APP_API}properties/${id}`)
           
            setTitle(propertyData.data.data.baslik)
            setLocation(propertyData.data.data.konum)
            setPrice(propertyData.data.data.fiyat)
            setUrl(propertyData.data.data.url)
        }
         fetchData()
       
      },[user])
     
    const handleProperty = async(e) => {
        e.preventDefault()
        await axios({
            method: 'put',
            url: `${process.env.REACT_APP_API}properties/update/${id}`,
            data: {
                baslik: title,
                konum: location,
                fiyat: price,
                url: url,
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
            <h4>İlanı Güncelle</h4>
            İlan Başlığı:
        
            <input type="text" value={title}  onChange={(e) => setTitle(e.target.value)} />
            İlan Konumu:
            <input type="text" value={location}  onChange={(e) => setLocation(e.target.value)} />
            İlan Fiyatı:
            <input type="text" value={price}  onChange={(e) => setPrice(e.target.value)} />
            İlan linki:
            <input type="text" value={url}  onChange={(e) => setUrl(e.target.value)} />
   
            <button onClick={(e) => handleProperty(e)}>İlanı Güncelle</button>
        </form>
    </div>
</div>
  )
}

export default PropertiesUpdate