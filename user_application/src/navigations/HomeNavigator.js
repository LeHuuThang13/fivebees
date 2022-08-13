import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HOME} from '../constants/routeNames';
import BottomTabNavigatior from './BottomTabNavigator';

const AuthNavigator = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name={HOME}
        component={BottomTabNavigatior}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
