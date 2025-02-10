import React, { useContext,useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { BiError } from "react-icons/bi";
import axios from 'axios'
const Login = () => {
    const {user,login,logout} = useContext(AuthContext)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState()
    const [isCredentialsTrue,setIsCredentialsTrue] = useState(true)
   
    const navigate = useNavigate()
    const handleLogin = async(e) => {
      e.preventDefault()
       const credentials = await axios.post(`${process.env.REACT_APP_API}auth/login`, {
        username: username,
        password: password
       })   
       if(!credentials.data.token){
        setIsCredentialsTrue(false)
       }else{
         await login(credentials.data.token);
         setIsCredentialsTrue(true)
         navigate("/")
       }
       
    }
    { if(isCredentialsTrue == true ){

    
  return (
    <div className='login'>
    
         
    
     <div className="form">
      <h4>Giriş yapın</h4>
      <form>
        <span>Kullanıcı Adı:</span>
        <input type="text"   onChange={(e) => setUsername(e.target.value)} />
        <span>Şifre:</span>
        <input type="password"  onChange={(e) => setPassword(e.target.value)}  />
    
      
        <button onClick={(e) => handleLogin(e)}>Giriş yap</button>
      </form>
      </div>
    </div>
  )
}
else if(isCredentialsTrue == false){
  return (
  <div className='login'>
    
         
    
  <div className="form">
   <h4>Giriş yapın</h4>
   <span className='error'><BiError className='errorIcon' />   Erişim reddedildi</span>
   <form>
     <span>Kullanıcı Adı:</span>
     <input type="text"   onChange={(e) => setUsername(e.target.value)} />
     <span>Şifre:</span>
     <input type="password"  onChange={(e) => setPassword(e.target.value)}  />
 
   
     <button onClick={(e) => handleLogin(e)}>Giriş yap</button>
   </form>
   </div>
 </div>
  )
}
}
}
export default Login