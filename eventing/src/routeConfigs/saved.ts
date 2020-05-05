import RouteType from './routeType';
import SavedScreen from '../screens/saved/SavedScreen';

const savedRoute: RouteType = {
  name: 'Saved',
  focusedIconName: 'heart',
  unfocusedIconName: 'heart-outline',
  component: SavedScreen,
};

export default savedRoute;
