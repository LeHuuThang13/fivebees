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
  MANAGING_BUILDING,
  BUILDINGS_LIST,
  MANAGE,
  MANAGING_ROOMS,
  MANAGING_ROOM_DETAILS,
} from '../constants/routeNames';
import Account from '../screens/Account';
import QRCode from '../screens/QRCode';
import DrawerNavigator from './DrawerNavigator';
import BottomTabNavigatior from './BottomTabNavigator';
import RoomDetails from '../screens/RoomDetails';
import Logout from '../screens/Logout';
import ManagingBuilding from '../screens/ManagingBuildings';
import RoomsList from '../screens/RoomsList';
import BuildingsList from '../screens/BuildingsList';
import Managing from '../screens/Managing';
import ManagingRooms from '../screens/ManagingRooms';
import ManagingRoomDetails from '../screens/ManagingRoomDetails';

const AppNavigator = ({navigation, route}) => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator
      initialRouteName={BUILDINGS_LIST}
      screenOptions={{headerShown: true}}>
      <HomeStack.Screen name={BUILDINGS_LIST} component={BuildingsList} />
      <HomeStack.Screen name={ROOM_LIST} component={RoomsList} />
      <HomeStack.Screen name={QRCODE} component={QRCode} />
      <HomeStack.Screen name={ACCOUNT} component={Account} />
      <HomeStack.Screen name={ROOMDETAILS} component={RoomDetails} />
      <HomeStack.Screen name={MANAGING_BUILDING} component={ManagingBuilding} />
      <HomeStack.Screen name={MANAGING_ROOMS} component={ManagingRooms} />
      <HomeStack.Screen
        name={MANAGING_ROOM_DETAILS}
        component={ManagingRoomDetails}
      />
      <HomeStack.Screen name={MANAGE} component={Managing} />
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
