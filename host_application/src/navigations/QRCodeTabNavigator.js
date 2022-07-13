import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {QRCODE} from '../constants/routeNames';
import QRCode from '../screens/QRCode';

const QRCodeTabNavigator = () => {
  const QRCodeStack = createNativeStackNavigator();
  return (
    <QRCodeStack.Navigator>
      <QRCodeStack.Screen name={QRCODE} component={QRCode} />
    </QRCodeStack.Navigator>
  );
};

export default QRCodeTabNavigator;
