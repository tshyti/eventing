import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RouteType from '../routeConfigs/routeType';
import profileRoute from '../routeConfigs/profile';
import savedRoute from '../routeConfigs/saved';
import homeRoute from '../routeConfigs/home';
import categoriesRoute from '../routeConfigs/categories';
import theme from '../utils/theme';

const tabRoutes: RouteType[] = [
  homeRoute,
  categoriesRoute,
  savedRoute,
  profileRoute,
];

const Tab = createBottomTabNavigator();

const tabScreens = tabRoutes.map(route => {
  return (
    <Tab.Screen
      key={route.name}
      name={route.name}
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <MaterialCommunityIcons
            name={focused ? route.focusedIconName : route.unfocusedIconName}
            color={color}
            size={size}
          />
        ),
      }}
      component={route.component}
    />
  );
});

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: theme.primaryColor,
          inactiveTintColor: theme.primaryColor,
          style: {
            backgroundColor: theme.backgroundColor,
          },
          showLabel: false,
        }}
      >
        {tabScreens}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
