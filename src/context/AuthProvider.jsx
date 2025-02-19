//AuthContext

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")) || null);
 

  const login = (info) => {
    setUser(info);
   
  };
  const logout = () => {
    setUser(null);
  };
  useEffect(() => {
    sessionStorage.setItem("user",JSON.stringify(user))
  },[user])
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;