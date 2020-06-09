import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import { User } from 'slices/users/models';
import { FormInstance } from 'antd/lib/form';

export interface UserFormProps {
  isEdit?: boolean;
  form: FormInstance;
}

export default function UserForm(props: UserFormProps) {
  const { isEdit, form } = props;
  return (
    <Form form={form} layout="vertical" name="form_in_modal">
      <Row gutter={[16, 8]}>
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
          <Form.Item
            name="email"
            label="E-mail"
            rules={
              !isEdit && [
                {
                  required: true,
                  message: 'Please input the title of collection!',
                },
              ]
            }
          >
            <Input readOnly={isEdit} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="organizationName"
            label="Organization"
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
