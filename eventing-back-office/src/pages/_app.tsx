import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import '../styles/vars.css';
import '../styles/global.css';
import store from '../store';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
