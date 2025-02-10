import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RiContactsFill } from 'react-icons/ri';
import { FaPhone } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { ImLocation } from 'react-icons/im';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import emailjs from '@emailjs/browser';
import Footer from '../../components/footer/Footer';

const Contact = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState({});
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_SERVICEID;
    const templateId = process.env.REACT_APP_TEMPLATEID;
    const publicKey = process.env.REACT_APP_PUBLICKEY;

    const templateParams = {
      name,
      mail,
      number,
      to_name: 'Alparslan irtegun',
      message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('Email sent successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}contact`);
        const data = response.data.data[0];
        setContactInfo({
          contactName: data.name,
          contactMail: data.mail,
          contactPhone: data.phone,
          contactLocation: data.location,
          contactMapLocation: data.mapLocation,
          contactMapEmbedLocation: data.mapEmbedLocation,
        });
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const phone = `tel:${contactInfo.contactPhone}`;
  const contactEmail = `mailto:${contactInfo.contactMail}`;

  if (isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="maindiv">
    <div className="contact">
      <div className="info">
        <div className="contacts">
          {user && (
            <button>
              <Link to="/iletisimguncelle">Bilgileri güncelle</Link>
            </button>
          )}
          <span>
            <RiContactsFill />
            {contactInfo.contactName}
          </span>
          <a href={phone}>
            <span>
              <FaPhone />
              {contactInfo.contactPhone}
            </span>
          </a>
          <a href={contactEmail}>
            <span>
              <IoMdMail />
              {contactInfo.contactMail}
            </span>
          </a>
          <a href={contactInfo.contactMapLocation}>
            <span>
              <ImLocation />
              {contactInfo.contactLocation}
            </span>
          </a>
        </div>
        <iframe
          src={contactInfo.contactMapEmbedLocation}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="form">
        <h4>Bize Ulaşın</h4>
        <form onSubmit={handleSubmit}>
          <span>İsminiz</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <span>Email</span>
          <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
          <span>Telefon Numarası</span>
          <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
          <span>Mesajınız</span>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit">Gönder</button>
        </form>
      </div>

    </div>
    {/* <Footer/> */}

    </div>
  );
};

export default Contact;
