import React,{useState,useContext} from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CookieContext } from '../../context/CookieProvider';
const CookieInfo = () => {
   const {isOpen,openFunc} = useContext(CookieContext)
   
   const handleBtn = () => {
    openFunc(true)

   }
   
   const [showBanner, setShowBanner] = useState(true);
   const [cookiesAccepted, setCookiesAccepted] = useState(false);
 
   const handleAccept = () => {
     setCookiesAccepted(true);
     setShowBanner(false);
     localStorage.setItem("cookiesAccepted", "true");
     // Burada çerezlerin etkinleşmesini sağlayabilirsiniz.
   };
 
   const handleReject = () => {
     setCookiesAccepted(false);
     setShowBanner(false);
     localStorage.setItem("cookiesAccepted", "false");
     // Çerezler etkinleştirilmeyecek.
   };
  if(isOpen != true){ 
  return (
    showBanner && (
      <div className="cookieInfo">
        <p>
          alparslanirtegun.com sizlere daha iyi hizmet sunmak için çerezleri kullanıyor.  
          Çerezleri kabul etmek için <strong>"Kabul Et"</strong> butonuna tıklayın.  
          Detaylı bilgi almak için <a href="/kvkk">KVKK metnimizi</a> inceleyebilirsiniz.
        </p>
        <div className="buttons">
        <button onClick={handleAccept}>Kabul Et</button>
        <button onClick={handleReject}>İsteğe Bağlı Çerezleri Reddet</button>
        </div>
      
      </div>
    )
  )
}
}

export default CookieInfo