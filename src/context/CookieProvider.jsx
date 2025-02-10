
import { createContext, useEffect, useState } from "react";
export const CookieContext = createContext();

const CookieProvider = ({ children }) => {
  const [isOpen, setisOpen] = useState(JSON.parse(localStorage.getItem("isOpen")) || null);
 

  const openFunc = (info) => {
    setisOpen(info);
   
  };
   
  useEffect(() => {
    
    localStorage.setItem("isOpen",JSON.stringify(isOpen))
  },[isOpen])
  return (
    <CookieContext.Provider value={{isOpen,openFunc }}>
      {children}
    </CookieContext.Provider>
  );
};

export default CookieProvider;