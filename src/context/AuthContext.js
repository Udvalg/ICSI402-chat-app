import React, { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import { delay } from "q";
import { isCompositeComponent } from "react-dom/test-utils";
import { useNavigate } from "react-router";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [signedUser, setSignedUser] = useState({});
  const [signedUserDoc, setSignedUserDoc] = useState({});

  let dd = {};
  const googleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (res) => {
      const docRef = doc(db, "users", res?.user.uid);
      await setDoc(docRef, {
        uid: res?.user.uid,
        email: res?.user.email,
        displayName: res?.user.displayName,
        userImg: res?.user.photoURL,
        friends: {},
        friendRequests: {},
      })
        .then(() => setSignedUser(res?.user))
        .then(async () => {
          console.log("end", res?.user.uid);
          const docRef = doc(db, "users", res?.user.uid);
          const docSnap = await getDoc(docRef);

          dd = docSnap.data();
          console.log("dd", dd);
          setSignedUserDoc(dd);
        })
        .then(() => console.log(signedUserDoc));
    });
  };

  const googleSignIn = async () => {
    console.log("google sign in");
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider).then(async (res) =>
      setSignedUser(res?.user)
    );
  };

  useEffect(() => {
    const sign = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      setSignedUser(user);
    });

    return () => {
      sign();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ signedUser, googleSignIn, googleSignUp, signedUserDoc }}
    >
      {children}
    </AuthContext.Provider>
  );
};
