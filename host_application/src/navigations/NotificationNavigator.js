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
// import IconMenu from '../assets/icons/menu_icon.svg';
// import colors from '../assets/themes/colors';
// import BottomTabNavigatior from './BottomTabNavigator';

const NotifNavigator = () => {
  const NotifStack = createNativeStackNavigator();
  return (
    <NotifStack.Navigator>
      <NotifStack.Screen
        name={NOTIFICATION}
        component={Notification}></NotifStack.Screen>
    </NotifStack.Navigator>
  );
};

export default NotifNavigator;
