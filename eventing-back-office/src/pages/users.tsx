import MainLayout from 'Layouts/MainLayout/MainLayout';
import { Table, Space, Breadcrumb } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { User } from 'slices/users/models';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import getAllUsers from 'slices/users/thunks';
import { RootState } from 'store';
import { createSelector } from 'reselect';

const columns: ColumnsType<User> = [
  {
    title: 'Firstname',
    dataIndex: 'firstname',
    key: 'name',
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
  {
    title: 'Created On',
    dataIndex: 'createdOn',
    key: 'createdOn',
    render: (date: string) => new Date(date).toLocaleString('sq'),
  },
];

const usersSelector = createSelector<RootState, User[], User[]>(
  (state) => state.users.userResponse?.result,
  (users) => users
);

export default function Users() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const loadingUsers = useSelector<RootState, boolean>(
    (state) => state.users.loading
  );
  const total = useSelector<RootState, number>(
    (state) => state.users.userResponse?.maxItems
  );
  const users = useSelector(usersSelector);

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
    </MainLayout>
  );
}
