import { Button, Input, Form } from 'antd';
import { useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';


  export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = () => {
    console.log('login');
  };
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
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '0px' }}>
            <Button
              onClick={()=>{navigate("/Home")}}
              type="default"
              htmlType="submit"
              className="login-form-button"
              style={{ width: '100%', fontWeight: 'bold' }}
            >
              Login
            </Button>
          </Form.Item>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Button onClick={() => {navigate("/Register")} } type="text">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
