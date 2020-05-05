import RouteType from './routeType';
import ProfileScreen from '../screens/profile/ProfileScreen';

const profileRoute: RouteType = {
  name: 'Profile',
  focusedIconName: 'account',
  unfocusedIconName: 'account-outline',
  component: ProfileScreen,
};

export default profileRoute;
