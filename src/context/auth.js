import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isUser, setIsUser] = useLocalStorage("user-data", false);

  const login = (user) => {
    if (user.username && user.email) {
      setIsUser(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsUser(false);
  };

  const value = { isUser, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
