import '../styles/global.less';
import { useRouter } from 'next/router';
import { wrapper, RootState } from 'store';
import routesConfig from 'utils/routesConfig';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { UserAuthDetails } from 'slices/auth/models';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { loginUserSuccess } from 'slices/auth/authSlice';
import useDidUpdate from 'hooks/didUpdateEffect';

function MyApp({ Component, pageProps }) {
  const { pathname, events } = useRouter();
  const userRole = useSelector<RootState, string>(
    (state) => state.auth.user?.role
  );

  const [appLoading, setAppLoading] = useState(isPageAuthorized());
  const didUpdate = useDidUpdate();
  const dispatch = useDispatch();

  // protect page on initial app load
  useEffect(() => {
    const user = restoreUserSession();
    if (isPageAuthorized()) {
      handleRouteChange(pathname, user?.role);
    }
  }, []);

  useEffect(() => {
    if (didUpdate) {
      events.on('routeChangeStart', (url) => handleRouteChange(url, userRole));
    }
    return () => {
      events.off('routeChangeStart', () => false);
    };
  }, [userRole]);

  function handleRouteChange(url: string, roleName?: string) {
    const route = routesConfig.find((r) => r.path.includes(url));

    // meaning route does not have auth
    if (!route) {
      setAppLoading(false);
      return;
    }

    const isUserAllowed = route.allowedRoles.find((r) => roleName === r);

    if (!isUserAllowed || !roleName) {
      window.location.href = '/login';
    } else {
      setAppLoading(false);
    }
  }

  function restoreUserSession() {
    const user: UserAuthDetails = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(loginUserSuccess(user));
    }
    return user;
  }

  function isPageAuthorized() {
    const route = routesConfig.find((r) => r.path.includes(pathname));
    // meaning route does not have auth
    if (!route) {
      return false;
    }
    return true;
  }

  if (appLoading) {
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
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
