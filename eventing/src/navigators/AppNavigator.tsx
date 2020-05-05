import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RouteType from '../routeConfigs/routeType';
import profileRoute from '../routeConfigs/profile';
import savedRoute from '../routeConfigs/saved';
import homeRoute from '../routeConfigs/home';
import categoriesRoute from '../routeConfigs/categories';

const tabRoutes: RouteType[] = [
  homeRoute,
  categoriesRoute,
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
        tabBarIcon: ({ color, size, focused }) => (
          <MaterialCommunityIcons
            name={focused ? route.focusedIconName : route.unfocusedIconName}
            color={color}
            size={size}
          />
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
          activeTintColor: 'white',
          inactiveTintColor: '#999',
          style: {
            backgroundColor: 'black',
          },
        }}
      >
        {tabScreens}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
