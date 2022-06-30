import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {
  ACCOUNT,
  ANALYST,
  INTRODUCE,
  LOGOUT,
  QRCODE,
  ROOM_LIST,
  SETTINGS,
} from '../constants/routeNames';
import Account from '../screens/Account';
import Analyst from '../screens/Analyst';
import Introduce from '../screens/Introduct';
import QRCode from '../screens/QRCode';
import RoomList from '../screens/RoomList';
import Settings from '../screens/Settings';

const AppNavigator = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ROOM_LIST}>
      <HomeStack.Screen
        name={ROOM_LIST}
        component={RoomList}></HomeStack.Screen>
      <HomeStack.Screen name={ANALYST} component={Analyst}></HomeStack.Screen>
      <HomeStack.Screen name={QRCODE} component={QRCode}></HomeStack.Screen>
      <HomeStack.Screen name={SETTINGS} component={Settings}></HomeStack.Screen>
      <HomeStack.Screen name={ACCOUNT} component={Account}></HomeStack.Screen>
      <HomeStack.Screen
        name={INTRODUCE}
        component={Introduce}></HomeStack.Screen>
      {/* <HomeStack.Screen name={LOGOUT} component={Logout}></HomeStack.Screen> */}
    </HomeStack.Navigator>
  );
};

export default AppNavigator;
