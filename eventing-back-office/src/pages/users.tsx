/* eslint-disable react/display-name */
import MainLayout from 'Layouts/MainLayout/MainLayout';
import { Table, Breadcrumb, Popconfirm, Modal, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { User, UpdateUserRequest } from 'slices/users/models';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, updateUser } from 'slices/users/thunks';
import { RootState } from 'store';
import { createSelector } from 'reselect';
import UserForm from 'components/UserForm';
import { useForm } from 'antd/lib/form/util';

const usersSelector = createSelector<RootState, User[], User[]>(
  (state) => state.users.userResponse?.result,
  (users) => users
);

export default function Users() {
  const columns: ColumnsType<User> = [
    {
      title: 'Firstname',
      dataIndex: 'firstname',
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Organization Name',
      dataIndex: 'organizationName',
    },
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      render: (date: string) => new Date(date).toLocaleString('sq'),
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (id: string, record, rowIndex) => (
        <>
          <Popconfirm
            title="Are you sure?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onUserDelete(id)}
          >
            <a>Delete</a>
          </Popconfirm>
          <a
            onClick={() => onEditClick(record, rowIndex)}
            role="button"
            tabIndex={0}
            style={{ marginLeft: '12px' }}
          >
            Edit
          </a>
        </>
      ),
    },
  ];

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editUsersModalVisible, setEditUsersModalVisible] = useState(false);
  const [selectedUserRowIndex, setSelectedUserRowIndex] = useState(0);

  const loadingUsers = useSelector<RootState, boolean>(
    (state) => state.users.loading
  );
  const total = useSelector<RootState, number>(
    (state) => state.users.userResponse?.maxItems
  );
  const loadingUpdateUser = useSelector<RootState, boolean>(
    (state) => state.users.loadingUpdateUser
  );
  const users = useSelector(usersSelector);

  const [form] = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers({ pageNumber, pageSize }));
  }, []);

  function showTableTotals(itemsTotal: number, itemsRange: [number, number]) {
    return (
      <span>
        Showing items {itemsRange[0]} to {itemsRange[1]} from {itemsTotal}
      </span>
    );
  }

  function onUserDelete(userId: string) {
    // check if user is last remaining in page
    if (total - 1 === pageSize) {
      setPageNumber(pageNumber - 1);
    }
    dispatch(deleteUser(userId, pageNumber - 1, pageSize));
  }

  function onEditClick(user: User, userRowIndex: number) {
    form.setFields([
      { name: 'firstname', value: user.firstname },
      { name: 'lastname', value: user.lastname },
      { name: 'email', value: user.email },
      { name: 'organizationName', value: user.organizationName },
    ]);
    setEditUsersModalVisible(true);
    setSelectedUserRowIndex(userRowIndex);
  }

  function onEditSubmit() {
    // const {
    //   firstname,
    //   lastname,
    //   organizationName,
    // } = selectedUserToEdit as UpdateUserRequest;

    const userRequest: UpdateUserRequest = {
      firstname: 'lest',
      lastname: 'lest',
      organizationName: 'least',
    };

    dispatch(
      updateUser(
        users[selectedUserRowIndex].id,
        userRequest,
        selectedUserRowIndex
      )
    );
  }

  function onPageChange(pNumber: number, pSize: number) {
    setPageNumber(pNumber);
    dispatch(getAllUsers({ pageNumber: pNumber, pageSize: pSize }));
  }

  function onSizeChange(current: number, size: number) {
    setPageSize(size);
    setPageNumber(1);
    dispatch(getAllUsers({ pageNumber: 1, pageSize: size }));
  }

  return (
    <MainLayout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>
      <Table
        rowKey={(record) => record.id}
        pagination={{
          current: pageNumber,
          pageSize,
          pageSizeOptions: ['10', '20', '50'],
          total,
          showSizeChanger: true,
          showTotal: showTableTotals,
          onChange: onPageChange,
          onShowSizeChange: onSizeChange,
        }}
        loading={loadingUsers}
        columns={columns}
        dataSource={users}
      />
      <Modal
        visible={editUsersModalVisible}
        title="Edit User"
        onCancel={() => setEditUsersModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setEditUsersModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loadingUpdateUser}
            onClick={onEditSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <UserForm form={form} isEdit />
      </Modal>
    </MainLayout>
  );
}
