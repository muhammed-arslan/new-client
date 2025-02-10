//WpContext

import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const WpContext = createContext();

const WpProvider = ({ children }) => {
  const [phone, setPhone] = useState(JSON.parse(sessionStorage.getItem("phone")) || null);
 

  const wpData = async() => {
    const data = await axios.get(`${process.env.REACT_APP_API}contact`);

    setPhone(data.data.data[0].wp);
   
  };
   
  useEffect(() => {
    
    sessionStorage.setItem("phone",JSON.stringify(phone))
  },[phone])
  return (
    <WpContext.Provider value={{ phone,wpData }}>
      {children}
    </WpContext.Provider>
  );
};

export default WpProvider;