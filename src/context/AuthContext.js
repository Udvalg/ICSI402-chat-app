import React, { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [signedUser, setSignedUser] = useState({});
  useEffect(() => {
    const sign = onAuthStateChanged(auth, (user) => {
      setSignedUser(user);
      console.log("Signed user: ", user);
    });

    return () => {
      sign();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signedUser }}>
      {children}
    </AuthContext.Provider>
  );
};
