/* eslint-disable react/display-name */
import MainLayout from 'Layouts/MainLayout/MainLayout';
import { Table, Breadcrumb, Popconfirm, Modal, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { User, UpdateUserRequest } from 'slices/users/models';
import { getAllUsers, deleteUser, updateUser } from 'slices/users/thunks';
import { setUserModalVisible } from 'slices/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from 'store';
import { createSelector } from 'reselect';
import UserForm from 'components/UserForm';
import { useForm } from 'antd/lib/form/util';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

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
  const [selectedUserRowIndex, setSelectedUserRowIndex] = useState(0);

  const loadingUsers = useSelector<RootState, boolean>(
    (state) => state.users.loading
  );
  const loadingUpdateUser = useSelector<RootState, boolean>(
    (state) => state.users.loadingUpdateUser
  );
  const userModalVisible = useSelector<RootState, boolean>(
    (state) => state.users.userModalVisible
  );
  const total = useSelector<RootState, number>(
    (state) => state.users.userResponse?.maxItems
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
    setDefaultFormFields(user);
    dispatch(setUserModalVisible(true));
    setSelectedUserRowIndex(userRowIndex);
  }

  function setDefaultFormFields(user: User) {
    form.setFields([
      { name: 'firstname', value: user.firstname, touched: false },
      { name: 'lastname', value: user.lastname, touched: false },
      { name: 'email', value: user.email, touched: false },
      {
        name: 'organizationName',
        value: user.organizationName,
        touched: false,
      },
    ]);
  }

  async function onEditSubmit() {
    try {
      const {
        firstname,
        lastname,
        organizationName,
      } = await form.validateFields();
      const userRequest: UpdateUserRequest = {
        firstname,
        lastname,
        organizationName,
      };

      dispatch(
        updateUser(
          users[selectedUserRowIndex].id,
          userRequest,
          selectedUserRowIndex
        )
      );
    } catch (err) {}
  }

  function onFormClose() {
    if (!form.isFieldsTouched()) {
      dispatch(setUserModalVisible(false));
    } else {
      const confirmModal = confirm({
        icon: <ExclamationCircleOutlined />,
        title: 'You will lose all your changes!',
        content: <p>Do you want to continue?</p>,
        onOk: () => {
          confirmModal.destroy();
          dispatch(setUserModalVisible(false));
        },
      });
    }
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
        visible={userModalVisible}
        title="Edit User"
        onCancel={onFormClose}
        footer={[
          <Button key="back" onClick={onFormClose}>
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
