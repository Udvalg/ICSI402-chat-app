import { Button, Input, Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, setDoc, doc, set } from "firebase/firestore";

import { auth, db } from "../../firebase.config";

export const Register = () => {
  const [error, setError] = useState("");
  const [isUserCreated, setUserCreate] = useState(false);
  const navigate = useNavigate();

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
        await setDoc(doc(db, "userChats", UserImpl.user.uid), {}).then(() => {
          console.log("userchats stored");
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
          onFinish={handleSubmit}
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
              type="primary"
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

          {isUserCreated ? "user created" : ""}
          {isUserCreated && error ? "davtaj daruulhiig boliulah" : ""}
        </Form>
      </div>
    </div>
  );
};

export default Register;
