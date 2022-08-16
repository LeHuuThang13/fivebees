import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LOGIN, QRCODE} from '../constants/routeNames';
import React from 'react';
import QRCode from '../screens/QRcode';

const AuthNavigator = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={QRCODE} component={QRCode}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
