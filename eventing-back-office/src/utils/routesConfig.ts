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

const routes: RouteConfig[] = [usersRoute];

export const routeRedirectsFromLogin = {
  [RoleNamesEnum.Admin]: '/users',
};

export function isPageAuthorized(pathname: string) {
  if (pathname === '/') {
    return false;
  }
  const route = routes.find((r) => r.path.includes(pathname));
  // meaning route does not have auth
  if (!route) {
    return false;
  }
  return true;
}

export default routes;
