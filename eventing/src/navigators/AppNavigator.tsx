import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import RouteType from '../routeConfigs/routeType';
import profileRoute from '../routeConfigs/profile';
import searchRoute from '../routeConfigs/search';
import savedRoute from '../routeConfigs/saved';
import homeRoute from '../routeConfigs/home';
import categoriesRoute from '../routeConfigs/categories';

const tabRoutes: RouteType[] = [
  homeRoute,
  categoriesRoute,
  searchRoute,
  savedRoute,
  profileRoute,
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
          <FontAwesome name={route.iconName} color={color} size={size} />
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
