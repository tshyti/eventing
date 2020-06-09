import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function FullPageLoading() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
    </div>
  );
}
