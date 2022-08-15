import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LOGIN} from '../constants/routeNames';
import React from 'react';
import Login from '../screens/Login';

const AuthNavigator = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={LOGIN} component={Login}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
