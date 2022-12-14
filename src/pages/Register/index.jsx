import { Button, Input, Form } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect  } from "firebase/auth";
import { addDoc, collection, setDoc, doc, set } from "firebase/firestore";
import GoogleButton from 'react-google-button'

import { auth, db } from "../../firebase.config";
import { AuthContext } from "../../context/AuthContext";


export const Register = () => {
  
  // signInWithRedirect(auth, provider);
  const [error, setError] = useState("");
  const [isUserCreated, setUserCreate] = useState(false);
  const { googleSignIn, signedUser } = useContext(AuthContext);
  const navigate = useNavigate();

   const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  
 useEffect(() => {
    if (signedUser != null) {
      navigate('/Login');
    }
  }, [signedUser]);

  // const signUpWithGoogle = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       console.log(user);
  //     }).catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });

  // }


  const handleSubmit = async (e) => {
    const displayName = e.username;
    const email = e.email;
    const password = e.password;
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(async (UserImpl) => {
        UserImpl.user.displayName = displayName;
        // photoURL - iig bas update hiih.
        const docRef = doc(db, "users", UserImpl.user.uid);
        await setDoc(docRef, {
          uid: UserImpl.user.uid,
          email,
          displayName,
          userImg: "",
          friends: {},
          friendRequests: {},
        });
      });
      navigate("/Home");
    } catch (e) {
      console.log(e.message);
      setError(true);
    }
  };
  return (
    <div className="flex h-screen">
      <div className="m-auto h-1/2">
        <Form
          name="normal_login"
          className="width-200px"
          initialValues={{ remember: true }}
          
          autoComplete="off"
        >
          <p className="text-xl">Register</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <p>zurgaa oruuldag yum Tuugoo agaa hiine bha</p>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              type="default"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%", fontWeight: "bold" }}
            >
              Register
            </Button>
          </Form.Item>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <Button onClick={() => navigate("/Login")} type="text">
              Login
            </Button>
             
          
          </div>
            <GoogleButton onClick={() => handleGoogleSignIn()}/>
          <div>
          </div>

          {isUserCreated ? "user created" : ""}
          {isUserCreated && error ? "davtaj daruulhiig boliulah" : ""}
        </Form>
      </div>
    </div>
  );
};

export default Register;
