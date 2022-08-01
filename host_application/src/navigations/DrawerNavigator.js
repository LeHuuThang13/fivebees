import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import colors from '../assets/themes/colors';
import {
  ANALYST,
  BUILDINGDETAILS,
  BUILDINGS_LIST,
  CREATING_BUILDING,
  CREATING_ROOM,
  EDITING_DEVICE,
  HOME_NAVIGATOR,
  INTRODUCE,
  LOGOUT,
  MANAGE,
  MANAGING_BUILDING,
  MANAGING_DEVICES,
  MANAGING_ROOMS,
  MANAGING_ROOM_DETAILS,
  QRCODE,
  ROOMDETAILS,
  ROOM_LIST,
  SETTINGS,
  TOTAL_FIXING_DEVICES,
} from '../constants/routeNames';
import Analyst from '../screens/Analyst';
import Introduce from '../screens/Introduct';
import Managing from '../screens/Managing';
import RoomDetails from '../screens/RoomDetails';
import RoomList from '../screens/RoomList';
import Settings from '../screens/Settings';
import QRCode from '../screens/QRCode';
import ManagingDevices from '../screens/ManagingDevices';
import BottomTabNavigatior from './BottomTabNavigator';
import BuildlingDetails from '../screens/EditBuildingDetails';
import SideMenu from './SideMenu';
import TotalFixingDevices from '../screens/TotalFixingDevices';
import ManagingBuildings from '../screens/ManagingBuildings';
import EditingDevice from '../screens/EditingDevice';
import BulidingsList from '../screens/BuildingsList';
import Logout from '../screens/Logout';
// import CreatingRoom from '../screens/CreatingRoom';
import CreatingBuilding from '../screens/CreatingBuilding';
import ManagingRoomDetails from '../screens/ManagingRoomDetails';
import {GlobalContext} from '../context/Provider';
import ManagingRooms from '../screens/ManagingRooms';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  const {authDispatch} = useContext(GlobalContext);

  //Render Image on sidebar
  const getDrawerContent = (navigation, authDispatch) => {
    return <SideMenu navigation={navigation} authDispatch={authDispatch} />;
  };
  return (
    <Drawer.Navigator
      drawerType="slide"
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          flexDirection: 'row-reverse',
        },
      }}
      drawerContent={({navigation}) =>
        getDrawerContent(navigation, authDispatch)
      }>
      <Drawer.Screen
        name={HOME_NAVIGATOR}
        options={{headerShown: false}}
        component={BottomTabNavigatior}
      />
      <Drawer.Screen name={ROOM_LIST} component={RoomList} />
      <Drawer.Screen name={ANALYST} component={Analyst} />
      <Drawer.Screen name={MANAGE} component={Managing} />
      <Drawer.Screen name={QRCODE} component={QRCode} />
      <Drawer.Screen name={SETTINGS} component={Settings} />
      <Drawer.Screen
        name={MANAGING_ROOMS}
        options={{swipeEnabled: false}}
        component={ManagingRooms}
      />
      <Drawer.Screen
        name={LOGOUT}
        options={{swipeEnabled: false}}
        component={Logout}
      />
      <Drawer.Screen
        name={EDITING_DEVICE}
        options={{swipeEnabled: false}}
        component={EditingDevice}
      />
      {/* Buildings screens */}
      <Drawer.Screen
        name={BUILDINGS_LIST}
        options={{swipeEnabled: false}}
        component={BulidingsList}
      />
      <Drawer.Screen
        name={BUILDINGDETAILS}
        options={{swipeEnabled: false}}
        component={BuildlingDetails}
      />
      <Drawer.Screen
        name={MANAGING_BUILDING}
        options={{swipeEnabled: false}}
        component={ManagingBuildings}
      />
      <Drawer.Screen
        name={CREATING_BUILDING}
        options={{swipeEnabled: false}}
        component={CreatingBuilding}
      />
      {/* Rooms Screens */}
      <Drawer.Screen
        name={ROOMDETAILS}
        options={{swipeEnabled: false}}
        component={RoomDetails}
      />
      <Drawer.Screen
        name={CREATING_ROOM}
        options={{swipeEnabled: false}}
        component={RoomDetails}
      />
      <Drawer.Screen
        name={MANAGING_DEVICES}
        options={{swipeEnabled: false}}
        component={ManagingDevices}
      />
      <Drawer.Screen
        name={TOTAL_FIXING_DEVICES}
        options={{swipeEnabled: false}}
        component={TotalFixingDevices}
      />
      <Drawer.Screen
        name={MANAGING_ROOM_DETAILS}
        options={{swipeEnabled: false}}
        component={ManagingRoomDetails}
      />
      <Drawer.Screen name={INTRODUCE} component={Introduce} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
