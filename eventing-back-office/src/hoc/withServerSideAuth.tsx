import { NextPage, NextPageContext } from 'next';
import store from 'store';

export default function withServerSideAuth(Component: NextPage) {
  function Wrapper(props) {
    return <Component {...props} />;
  }

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const { token } = store.getState().auth;
    if (!token) {
    }
    return Component.getInitialProps ? Component.getInitialProps(ctx) : {};
  };
  return Wrapper;
}
