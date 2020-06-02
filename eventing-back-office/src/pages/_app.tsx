import 'antd/dist/antd.css';
import '../styles/vars.css';
import '../styles/global.css';
import { wrapper } from 'store';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
