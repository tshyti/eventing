import MainLayout from 'Layouts/MainLayout/MainLayout';
import { Table, Space, Breadcrumb } from 'antd';

const columns = [
  {
    title: 'Firstname',
    dataIndex: 'firstname',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Lastname',
    dataIndex: 'lastname',
    key: 'lastname',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Organization Name',
    key: 'organizationName',
    dataIndex: 'organizationName',
  },
];

const data = [];

export default function Users() {
  return (
    <MainLayout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>
      <Table columns={columns} dataSource={data} />
    </MainLayout>
  );
}
