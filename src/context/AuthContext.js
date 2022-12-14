import React, { useContext, createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../firebase.config";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [signedUser, setSignedUser] = useState({});
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    // signInWithRedirect(auth, provider);
  };
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
    <AuthContext.Provider value={{ signedUser, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};
