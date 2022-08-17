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
  CREATING_BUILDING,
  CREATING_ROOM,
  CREATING_FACILITY,
  CREATING_MANAGING_FACILITY,
  UPDATING_BUILDING,
  UPDATING_DEVICE,
  UPDATING_FACILITY,
  UPDATING_ROOM,
  MANAGING_FACILITIES,
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
import CreatingBuilding from '../screens/CreatingBuilding';
import CreatingRoom from '../screens/CreatingRoom';
import CreatingFacility from '../screens/CreatingFacility';
import CreatingDevice from '../screens/CreatingDevice';
import UpdatingBuilding from '../screens/UpdatingBuilding';
import UpdatingDevice from '../screens/UpdatingDevice';
import UpdatingFacility from '../screens/UpdatingFacility';
import UpdatingRoom from '../screens/UpdatingRoom';
import ManagingDevices from '../screens/ManagingDevices';

const ManagingNavigator = ({navigation, route}) => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName={MANAGE} screenOptions={{}}>
      <HomeStack.Screen
        name={MANAGING_ROOM_DETAILS}
        component={ManagingRoomDetails}
      />
      <HomeStack.Screen
        name={MANAGE}
        component={Managing}
        options={{
          headerShown: true,
        }}
      />
      <HomeStack.Screen
        name={MANAGING_BUILDING}
        component={ManagingBuilding}
        options={{
          headerShown: true,
        }}
      />
      <HomeStack.Screen name={MANAGING_ROOMS} component={ManagingRooms} />
      <HomeStack.Screen name={CREATING_BUILDING} component={CreatingBuilding} />
      <HomeStack.Screen name={CREATING_ROOM} component={CreatingRoom} />
      <HomeStack.Screen name={CREATING_FACILITY} component={CreatingFacility} />
      <HomeStack.Screen
        name={CREATING_MANAGING_FACILITY}
        component={CreatingDevice}
      />
      <HomeStack.Screen name={UPDATING_BUILDING} component={UpdatingBuilding} />
      <HomeStack.Screen name={UPDATING_DEVICE} component={UpdatingDevice} />
      <HomeStack.Screen
        name={MANAGING_FACILITIES}
        component={ManagingDevices}
      />
      <HomeStack.Screen name={UPDATING_FACILITY} component={UpdatingFacility} />
      <HomeStack.Screen name={UPDATING_ROOM} component={UpdatingRoom} />
      {/* <HomeStack.Screen name={DRAWER_NAVIGATION} component={DrawerNavigator} /> */}
    </HomeStack.Navigator>
  );
};

export default ManagingNavigator;
