/* eslint-disable react/display-name */
import 'styles/users.less';
import MainLayout from 'Layouts/MainLayout/MainLayout';
import { Table, Popconfirm, Modal, Button, PageHeader } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import {
  User,
  UpdateUserRequest,
  CreateUserRequest,
} from 'slices/users/models';
import {
  getAllUsers,
  deleteUser,
  updateUser,
  createUser,
  getUserRoles,
} from 'slices/users/thunks';
import { setUserModalVisible } from 'slices/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from 'store';
import { createSelector } from 'reselect';
import UserForm from 'components/UserForm';
import { useForm } from 'antd/lib/form/util';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ValidationFormError from 'utils/models/ValidationFormError';

const { confirm } = Modal;

const usersSelector = createSelector<RootState, User[], User[]>(
  (state) => state.users.userResponse?.result,
  (users) => users
);

const createUserErrorSelector = createSelector<
  RootState,
  ValidationFormError,
  ValidationFormError
>(
  (state) => state.users.createUserError,
  (err) => err
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
      title: 'Role',
      dataIndex: 'role',
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
  const [isEditForm, setIsEditForm] = useState(false);

  const loadingUsers = useSelector<RootState, boolean>(
    (state) => state.users.loading
  );
  const loadingSubmitForm = useSelector<RootState, boolean>(
    (state) => state.users.loadingSubmitForm
  );
  const userModalVisible = useSelector<RootState, boolean>(
    (state) => state.users.userModalVisible
  );
  const haveAddedUser = useSelector<RootState, boolean>(
    (state) => state.users.haveAddedUser
  );
  const total = useSelector<RootState, number>(
    (state) => state.users.userResponse?.maxItems
  );
  const users = useSelector(usersSelector);
  const createUserError = useSelector(createUserErrorSelector);

  const [form] = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers({ pageNumber, pageSize }));
    dispatch(getUserRoles());
  }, []);

  useEffect(() => {
    if (createUserError) {
      form.setFields([
        { name: createUserError.field, errors: [createUserError.error] },
      ]);
    }
  }, [createUserError]);

  function showTableTotals(itemsTotal: number, itemsRange: [number, number]) {
    return (
      <span>
        Showing items {itemsRange[0]} to {itemsRange[1]} from {itemsTotal}
      </span>
    );
  }

  function onUserDelete(userId: string) {
    // check if user is last remaining in page
    if (total - 1 === pageSize * (pageNumber - 1)) {
      var pageNr = pageNumber === 1 ? pageNumber : pageNumber - 1;
    }
    setPageNumber(pageNr);
    dispatch(deleteUser(userId, pageNumber - 1, pageSize));
  }

  function onEditClick(user: User, userRowIndex: number) {
    setIsEditForm(true);
    setDefaultFormFields(user);
    dispatch(setUserModalVisible(true));
    setSelectedUserRowIndex(userRowIndex);
  }

  function setDefaultFormFields(user: User) {
    form.setFields([
      { name: 'firstname', value: user.firstname, touched: false },
      { name: 'lastname', value: user.lastname, touched: false },
      { name: 'email', value: user.email, touched: false },
      { name: 'role', value: user.role, touched: false },
      {
        name: 'organizationName',
        value: user.organizationName,
        touched: false,
      },
    ]);
  }

  async function onEditSubmit() {
    if (!form.isFieldsTouched()) {
      dispatch(setUserModalVisible(false));
      return;
    }
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

  function onCreateClick() {
    form.resetFields();
    setIsEditForm(false);
    dispatch(setUserModalVisible(true));
  }

  async function onCreateSubmit() {
    try {
      const {
        firstname,
        lastname,
        organizationName,
        role,
        email,
      } = await form.validateFields();

      const createUserRequest: CreateUserRequest = {
        firstname,
        lastname,
        organizationName,
        roleId: role,
        email,
      };

      dispatch(createUser(createUserRequest));
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
      <PageHeader
        style={{
          backgroundColor: '#ffffff',
          margin: '24px 0px',
          padding: '10px 24px',
        }}
        title="Users"
        extra={[
          <Button key="1" type="primary" onClick={onCreateClick}>
            Create User
          </Button>,
        ]}
      />
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
        rowClassName={(record, index) =>
          index === 0 && haveAddedUser && 'added-user'
        }
      />
      <Modal
        visible={userModalVisible}
        title={`${isEditForm ? 'Edit' : 'Create'} User`}
        onCancel={onFormClose}
        footer={[
          <Button key="back" onClick={onFormClose}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loadingSubmitForm}
            onClick={isEditForm ? onEditSubmit : onCreateSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <UserForm form={form} isEdit={isEditForm} />
      </Modal>
    </MainLayout>
  );
}
