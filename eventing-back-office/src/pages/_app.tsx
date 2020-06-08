import '../styles/global.less';
import { useRouter } from 'next/router';
import { wrapper, RootState } from 'store';
import routesConfig from 'utils/routesConfig';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { UserAuthDetails } from 'slices/auth/models';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function MyApp({ Component, pageProps }) {
  const { pathname, events } = useRouter();
  const userRole = useSelector<RootState, string>(
    (state) => state.auth.user?.role
  );

  const [appLoading, setAppLoading] = useState(isPageAuthorized());
  const dispatch = useDispatch();

  useEffect(() => {
    if (isPageAuthorized()) {
      const user: UserAuthDetails = JSON.parse(localStorage.getItem('user'));
      handleRouteChange(pathname, user?.role);
    }
    // todo get user from localStorage and put to redux
  }, []);

  useEffect(() => {
    events.on('routeChangeStart', () => handleRouteChange(pathname, userRole));
    return () => {
      events.off('routeChangeStart', () =>
        handleRouteChange(pathname, userRole)
      );
    };
  }, [pathname]);

  function handleRouteChange(pathRouteName, roleName?) {
    const route = routesConfig.find((r) => r.path.includes(pathRouteName));
    // meaning route does not have auth
    if (!route) {
      setAppLoading(false);
      return;
    }

    const isUserAllowed = route.allowedRoles.find(
      (r) => r.toString() === roleName
    );
    if (!isUserAllowed || !roleName) {
      window.location.href = '/login';
    } else {
      setAppLoading(false);
    }
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
