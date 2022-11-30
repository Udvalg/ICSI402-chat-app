import { Button, Input, Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

export const Register = () => {
  const [error, setError] = useState("");
  const [isUserCreated, setUserCreate] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const userName = e.username;
    const email = e.email;
    const password = e.password;
    console.log(userName, email, password);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((UserImpl) => {
        UserImpl.user.displayName = userName;
        // photoURL - iig bas update hiih.
        // firestoreluu hadgalah.
        console.log(UserImpl.user);
      });
      setUserCreate(true);
      navigate("/Home");
    } catch (e) {
      // setError(e.message);
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

          {isUserCreated && !error ? "user created" : ""}
          {isUserCreated && error ? "davtaj daruulhiig boliulah" : ""}
        </Form>
      </div>
    </div>
  );
};

export default Register;
