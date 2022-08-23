import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DRAWER, HOME} from '../constants/routeNames';
import BottomTabNavigatior from './BottomTabNavigator';
import DrawerNavigator from './DrawerNavigator';

const AuthNavigator = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name={HOME}
        component={BottomTabNavigatior}></AuthStack.Screen>
      <AuthStack.Screen
        name={DRAWER}
        component={DrawerNavigator}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
