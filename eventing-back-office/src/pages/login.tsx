import { Form, Input, Button, Row, Col, Avatar } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function Login() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  function onFinishFailed(values) {
    console.log(values);
  }

  return (
    <Row justify="center" align="middle" style={{ height: '75vh' }}>
      <Col span={24} style={{ maxWidth: '444px', padding: '16px' }}>
        <Avatar
          style={{
            display: 'block',
            margin: 'auto',
            backgroundColor: '#dc004e',
          }}
          size={64}
          icon={<LockOutlined />}
        />
        <h1 style={{ textAlign: 'center' }}>Sign In</h1>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              placeholder="Password"
              size="large"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button block size="large" type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password?
            </a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
