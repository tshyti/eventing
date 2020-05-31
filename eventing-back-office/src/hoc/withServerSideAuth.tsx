import { NextPage, NextPageContext } from 'next';
import store from 'store';
import redirect from 'utils/redirect';

export default function withServerSideAuth(Component: NextPage) {
  function Wrapper(props) {
    return <Component {...props} />;
  }

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const { token } = store.getState().auth;
    if (!token) {
      redirect('/', ctx.res);
    }
    return Component.getInitialProps ? Component.getInitialProps(ctx) : {};
  };
  return Wrapper;
}
