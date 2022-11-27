import { Button, Input, Form } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const onSubmit = () => {
    console.log('register click');
  };
  return (
    <div className="flex h-screen">
      <div className="m-auto h-1/2">
      <Form
        name="normal_login"
        className="width-200px"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <p className="text-xl">Register</p>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item style={{ marginBottom: '0px' }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%', fontWeight: 'bold' }}
          >
            Register
          </Button>
        </Form.Item>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Button onClick={() => navigate('/Login')} type="text">
            Login
          </Button>
        </div>
      </Form>
    </div>
    </div>
  );
};

export default Register;
