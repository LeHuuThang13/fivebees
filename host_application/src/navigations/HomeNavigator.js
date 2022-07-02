import {useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import getCommon from '../components/common/Stack';
import {
  ACCOUNT,
  ANALYST,
  HOME_BOTTOM_NAVIGATOR,
  INTRODUCE,
  LOGOUT,
  NOTIFICATION,
  QRCODE,
  ROOM_LIST,
  SETTINGS,
} from '../constants/routeNames';
import Account from '../screens/Account';
import Analyst from '../screens/Analyst';
import Introduce from '../screens/Introduct';
import Notification from '../screens/Notification';
import QRCode from '../screens/QRCode';
import RoomList from '../screens/RoomList';
import Settings from '../screens/Settings';

const AppNavigator = () => {
  const HomeStack = createNativeStackNavigator();
  const common = getCommon(HomeStack);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={ROOM_LIST}
        component={RoomList}></HomeStack.Screen>
      {common}
    </HomeStack.Navigator>
  );
};

export default AppNavigator;
