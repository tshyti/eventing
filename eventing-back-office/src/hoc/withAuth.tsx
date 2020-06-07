import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Router from 'next/router';
import { RootState } from 'store';

export default function withAuth(Component: NextPage) {
  function Wrapper(props) {
    const token = useSelector<RootState>((state) => state.auth.user.token);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!token) {
        Router.push('/login');
      } else {
        setLoading(false);
      }
    }, []);

    if (loading) {
      return (
        
      );
    }

    return <Component {...props} />;
  }

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
}
