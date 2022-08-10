import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LOGIN} from '../constants/routeNames';
import React from 'react';
import Login from '../screens/Login';
import QRcode from '../screens/QRcode/QRcode';

const AuthNavigator = () => {
  const CheckQRStack = createNativeStackNavigator();
  return (
    <CheckQRStack.Navigator screenOptions={{headerShown: false}}>
      <CheckQRStack.Screen
        name={LOGIN}
        component={QRcode}></CheckQRStack.Screen>
    </CheckQRStack.Navigator>
  );
};

export default AuthNavigator;
