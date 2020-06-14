import { TeamOutlined, ContactsOutlined } from '@ant-design/icons';
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

const eventsRoute: RouteConfig = {
  name: 'Events',
  icon: ContactsOutlined,
  path: '/events',
  allowedRoles: [RoleNamesEnum['Event Creator']],
};

const routes: RouteConfig[] = [usersRoute, eventsRoute];

export const routeRedirectsFromLogin = {
  [RoleNamesEnum.Admin]: '/users',
  [RoleNamesEnum['Event Creator']]: '/events',
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
