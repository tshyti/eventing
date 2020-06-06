import { Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { setIsDrawerCollapsed } from 'slices/global/globalSlice';
import CollapseSideIcon from './CollapseSiderIcon';
import SiderMenu from './SiderMenu';

const { Header, Content, Footer, Sider } = Layout;

export default function MainLayout({ children }) {
  const collapsed = useSelector<RootState, boolean>(
    (state) => state.global.isDrawerCollapsed
  );
  const dispatch = useDispatch();

  function dispatchCollapsed(status: boolean) {
    dispatch(setIsDrawerCollapsed(status));
  }

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div
          style={{
            height: '32px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            margin: '14px',
          }}
        />
        <SiderMenu />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, color: 'white' }}>
          <CollapseSideIcon
            collapsed={collapsed}
            setCollapsed={dispatchCollapsed}
          />
        </Header>
        <Content style={{ margin: '0 16px' }}>{children}Test</Content>
        <Footer style={{ textAlign: 'center' }}>
          Eventing ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}
