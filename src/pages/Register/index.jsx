import { Button, Input, Form } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { addDoc, collection, setDoc, doc, set } from "firebase/firestore";
import GoogleButton from "react-google-button";

import { auth, db } from "../../firebase.config";
import { AuthContext } from "../../context/AuthContext";

export const Register = () => {
  const [error, setError] = useState("");
  const [isUserCreated, setUserCreate] = useState(false);
  const { googleSignUp, signedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      await googleSignUp();
    } catch (error) {
      console.log(error);
    }
    console.log("haha")
  };
  useEffect(() => {
    if (signedUser != null) {
      navigate("/Login");
    }
  }, [signedUser]);

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
      // navigate("/Home");
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
          onFinish={(e)=>handleSubmit(e)}
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
         
          <Form.Item style={{ marginBottom: "8px" }}>
            <Button
              type="default"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%", fontWeight: "bold" }}
            >
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => navigate("/Login")} type="default" style={{ width: "100%", fontWeight: "bold" }}>
              Go back to login
            </Button>
          </Form.Item>
         
           <GoogleButton onClick={() => handleGoogleSignUp()}/>

          {isUserCreated ? "user created" : ""}
          {isUserCreated && error ? "davtaj daruulhiig boliulah" : ""}
        </Form>
      </div>
    </div>
  );
};

export default Register;
