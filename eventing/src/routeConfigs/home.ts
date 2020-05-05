import RouteType from './routeType';
import HomeScreen from '../screens/home/HomeScreen';

const homeRoute: RouteType = {
  name: 'Home',
  focusedIconName: 'home',
  unfocusedIconName: 'home-outline',
  component: HomeScreen,
};

export default homeRoute;
