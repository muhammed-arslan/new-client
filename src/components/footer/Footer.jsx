import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footerInfos"> 
            <div className="footerAdress">
                <span>Adres</span>
                <br />
                <strong><a href="https://www.google.com/maps/place/Alparslan+%C4%B0rteg%C3%BCn+-+Remax+Arma/@38.3699768,27.1763076,17z/data=!3m1!4b1!4m6!3m5!1s0x14b961f5abe7c35f:0xc0017f19c92b018!8m2!3d38.3699726!4d27.1788825!16s%2Fg%2F11vszl0hw2?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"> Buca Koop., Ahmet Piriştina Blv Numara:2/A, 35390 Buca/İzmir</a></strong>
            </div>
            <div className="footerContact">
                <span>Telefon</span>
                <br />

                <strong><a href="tel:+905522450568">0552 245 05 68</a></strong>

            </div>
            <div className="footerMail">
                <span>E-mail</span>
                <br />

                <strong><a href="mailto:alparslanirtegun@gmail.com">alparslanirtegun@gmail.com</a></strong>

            </div>
          
        </div>
        <div className="footerSitemap">
            <h2>Site Haritası</h2>
        <Link to="/" className="hover:text-gray-400">Anasayfa</Link>
        <Link to="/ilanlar" className="hover:text-gray-400">İlanlar</Link>
        <Link to="/hakkimda" className="hover:text-gray-400">Hakkımda</Link>
        <Link to="/uzmanliklarim" className="hover:text-gray-400">Uzmanlıklarım</Link>
        <Link to="/iletisim" className="hover:text-gray-400">İletişim</Link>
        <Link to="/kvkk" className="hover:text-gray-400">KVKK Politikası</Link>
        
        </div>
        
        <div className="footerSocials">
         
        </div>
    </div>
  )
}

export default Footer