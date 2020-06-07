import { TeamOutlined } from '@ant-design/icons';
import RoleNamesEnum from './roleNamesEnum';

export interface RouteConfig {
  name: string;
  icon: React.ElementType;
  path: string;
  allowedRoles?: RoleNamesEnum[];
}

const usersRoute: RouteConfig = {
  name: 'Users',
  icon: TeamOutlined,
  path: '/users',
  allowedRoles: [RoleNamesEnum.Admin],
};

const testRoute: RouteConfig = {
  name: 'Test',
  icon: TeamOutlined,
  path: '/test',
  allowedRoles: [RoleNamesEnum.Admin],
};

const routes: RouteConfig[] = [usersRoute, testRoute];

export default routes;
