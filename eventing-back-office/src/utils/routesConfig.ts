import { TeamOutlined } from '@ant-design/icons';

export interface RouteConfig {
  name: string;
  icon: React.ElementType;
  path: string;
  allowedRoles?: string[];
}

const routes: RouteConfig[] = [
  {
    name: 'Users',
    icon: TeamOutlined,
    path: '/users',
    allowedRoles: ['admin'],
  },
  {
    name: 'Test',
    icon: TeamOutlined,
    path: '/test',
    allowedRoles: ['admin'],
  },
];

export default routes;
