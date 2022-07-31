import {useNavigation, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  ACCOUNT,
  DRAWER_NAVIGATION,
  QRCODE,
  ROOMDETAILS,
  ROOM_LIST,
  HOME_BOTTOM_NAVIGATOR,
  LOGOUT,
} from '../constants/routeNames';
import Account from '../screens/Account';
import QRCode from '../screens/QRCode';
import DrawerNavigator from './DrawerNavigator';
import BottomTabNavigatior from './BottomTabNavigator';
import RoomDetails from '../screens/RoomDetails';
import RoomList from '../screens/RoomList';
import Logout from '../screens/Logout';

const AppNavigator = ({navigation, route}) => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator
      initialRouteName={ROOM_LIST}
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name={HOME_BOTTOM_NAVIGATOR}
        component={BottomTabNavigatior}
      />
      <HomeStack.Screen name={ROOM_LIST} component={RoomList} />
      <HomeStack.Screen name={QRCODE} component={QRCode} />
      <HomeStack.Screen name={ACCOUNT} component={Account} />
      <HomeStack.Screen name={ROOMDETAILS} component={RoomDetails} />
      <HomeStack.Screen name={DRAWER_NAVIGATION} component={DrawerNavigator} />
      <HomeStack.Screen
        name={LOGOUT}
        options={{headerShown: false}}
        component={Logout}
      />
    </HomeStack.Navigator>
  );
};

export default AppNavigator;
