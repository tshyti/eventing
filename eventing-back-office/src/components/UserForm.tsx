import React from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;

export interface UserFormProps {
  isEdit?: boolean;
  form: FormInstance;
}

export default function UserForm(props: UserFormProps) {
  const { isEdit, form } = props;

  function RoleInput() {
    if (isEdit) {
      return (
        <Form.Item name="role" label="Role">
          <Input readOnly={isEdit} />
        </Form.Item>
      );
    }
    return (
      <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            required: true,
            message: 'Role is required!',
          },
        ]}
      >
        <Select style={{ width: '100%' }}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </Form.Item>
    );
  }

  return (
    <Form form={form} layout="vertical" name="form_in_modal">
      <Row gutter={[16, 8]}>
        <Col span={24}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={
              !isEdit && [
                {
                  required: true,
                  message: 'Email is required!',
                },
                {
                  pattern: new RegExp(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  ),
                  message: 'Email format is not correct!',
                  validateTrigger: 'onBlur',
                },
              ]
            }
            validateTrigger={['onBlur', 'onChange']}
          >
            <Input readOnly={isEdit} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="firstname"
            label="Firstname"
            rules={[
              {
                required: true,
                message: 'Firstname is required!',
              },
              {
                min: 3,
                message: 'Minimum 3 characters!',
              },
            ]}
          >
            <Input max={30} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastname"
            label="Lastname"
            rules={[
              {
                required: true,
                message: 'Lastname is required!',
              },
              {
                min: 3,
                message: 'Minimum 3 characters!',
              },
            ]}
          >
            <Input max={30} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <RoleInput />
        </Col>
        <Col span={12}>
          <Form.Item
            name="organizationName"
            label="Organization Name"
            rules={[
              {
                min: 2,
                message: 'Minimun 2 characters',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
