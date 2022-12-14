import { Button, Input, Form } from "antd";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleButton from "react-google-button";
import { auth } from "../../firebase.config";
import { AuthContext } from "../../context/AuthContext";
export const Login = () => {
  const { googleSignIn, signedUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (signedUser) => {
          console.log(signedUser);
          navigate("/Home");
        }
      );
    } catch (e) {
      console.log(e.message);
      setError(true);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn().then((result) => {
        navigate("/Home");
        console.log(result.user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (signedUser) navigate("/Home");
  }, []);
  return (
    <div className="flex h-screen">
      <div className="m-auto h-1/2">
        <Form
          name="normal_login"
          className="w-48 h-48"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <p className="text-xl">Login</p>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              type="default"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%", fontWeight: "bold" }}
            >
              Login
            </Button>
            {error && "buruu mail or password"}
          </Form.Item>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <Button
              onClick={() => {
                navigate("/Register");
              }}
              type="text"
            >
              Register
            </Button>
          </div>
        </Form>
        <div>
          <GoogleButton onClick={() => handleGoogleSignIn()} />
        </div>
      </div>
    </div>
  );
};

export default Login;
