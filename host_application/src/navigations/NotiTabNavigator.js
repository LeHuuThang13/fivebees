import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {NOTIFICATION, QRCODE} from '../constants/routeNames';
import Notification from '../screens/Notification';

const NotiTabNavigator = () => {
  const NotiStack = createNativeStackNavigator();
  return (
    <NotiStack.Navigator>
      <NotiStack.Screen name={NOTIFICATION} component={Notification} />
    </NotiStack.Navigator>
  );
};

export default NotiTabNavigator;
