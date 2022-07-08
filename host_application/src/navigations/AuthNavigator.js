import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LOGIN} from '../constants/routeNames';
import Login from '../screens/Login';

const AuthNavigator = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={LOGIN} component={Login}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default AuthNavigator;
