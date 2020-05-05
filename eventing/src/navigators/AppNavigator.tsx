import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import RouteType from '../routeConfigs/routeType';
import HomeRoute from '../routeConfigs/home';
import ProfileRoute from '../routeConfigs/profile';
import FavoritesRoute from '../routeConfigs/favorites';
import SearchRoute from '../routeConfigs/search';

const tabRoutes: RouteType[] = [
  HomeRoute,
  ProfileRoute,
  FavoritesRoute,
  SearchRoute,
];

const Tab = createBottomTabNavigator();

function test({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const tabScreens = tabRoutes.map(route => {
  return (
    <Tab.Screen
      key={route.name}
      name={route.name}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name={route.iconName} color={color} size={size} />
        ),
      }}
      component={test}
    />
  );
});

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        {tabScreens}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
