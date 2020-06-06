import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Menu } from 'antd';
import routes from 'utils/routesConfig';

export default function SiderMenu() {
  const router = useRouter();
  const menuItems = routes.map((r) => {
    return (
      <Menu.Item icon={<r.icon />} key={r.path}>
        <Link href={r.path}>
          <a>{r.name}</a>
        </Link>
      </Menu.Item>
    );
  });
  return (
    <Menu theme="dark" defaultSelectedKeys={[router.pathname]} mode="inline">
      {menuItems}
    </Menu>
  );
}
