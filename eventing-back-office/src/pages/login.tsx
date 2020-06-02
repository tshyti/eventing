import { Form, Input, Button, Row, Col, Avatar } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { UserRequest, UserRequestFailed } from 'slices/auth/models';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'slices/auth/thunks';
import { useForm } from 'antd/lib/form/util';
import { RootState } from 'store';
import { useEffect } from 'react';

export default function Login() {
  const dispatch = useDispatch();

  const loadingLogin = useSelector<RootState, boolean>(
    (state) => state.auth.loadingLogin
  );
  const errors = useSelector<RootState, UserRequestFailed>(
    (state) => state.auth.userRequestFailed
  );

  const [form] = useForm();

  useEffect(() => {
    if (errors) {
      form.setFields([{ name: errors.field, errors: [errors.error] }]);
    }
  }, [errors]);

  function onFinish(values: UserRequest) {
    dispatch(loginUser(values));
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
        <Form name="normal_login" form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your Email!' },
              {
                pattern: new RegExp(
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ),
                message: 'Please input a correct Email!',
                validateTrigger: 'onBlur',
              },
            ]}
            validateTrigger={['onBlur', 'onChange']}
          >
            <Input size="large" prefix={<UserOutlined />} placeholder="Email" />
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
            <Button
              block
              size="large"
              type="primary"
              htmlType="submit"
              loading={loadingLogin}
            >
              Log In
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
