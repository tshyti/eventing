import RouteType from './routeType';
import CategoriesScreen from '../screens/categories/CategoriesScreen';

const categoriesRoute: RouteType = {
  name: 'Categories',
  focusedIconName: 'view-dashboard',
  unfocusedIconName: 'view-dashboard-outline',
  component: CategoriesScreen,
};

export default categoriesRoute;
