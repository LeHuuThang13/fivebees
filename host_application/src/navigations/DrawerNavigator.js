import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useContext, useEffect} from 'react';
import {
  ANALYST,
  ANALYST_DETAILS_BUILDINGS,
  ANALYST_DETAILS_DEVICE,
  ANALYST_DETAILS_ROOMS,
  BUILDINGDETAILS,
  BUILDINGS_LIST,
  CREATING_BUILDING,
  CREATING_FACILITY,
  CREATING_ROOM,
  UPDATING_FACILITY,
  HOME_NAVIGATOR,
  INTRODUCE,
  LOGOUT,
  MANAGE,
  MANAGING_BUILDING,
  MANAGING_FACILITIES,
  MANAGING_ROOMS,
  MANAGING_ROOM_DETAILS,
  QRCODE,
  ROOMDETAILS,
  ROOM_LIST,
  SETTINGS,
  TOTAL_FIXING_FACILITIES,
  UPDATING_BUILDING,
  UPDATING_ROOM,
  CREATING_MANAGING_FACILITY,
  UPDATING_DEVICE,
  ROOT,
} from '../constants/routeNames';
import Analyst from '../screens/Analyst';
import Introduce from '../screens/Introduct';
import Managing from '../screens/Managing';
import RoomDetails from '../screens/RoomDetails';
import QRCode from '../screens/QRCode';
import ManagingDevices from '../screens/ManagingDevices';
import BottomTabNavigatior from './BottomTabNavigator';
import BuildlingDetails from '../screens/EditBuildingDetails';
import SideMenu from './SideMenu';
import ManagingBuildings from '../screens/ManagingBuildings';
import UpdatingBuilding from '../screens/UpdatingBuilding';
import UpdatingFacility from '../screens/UpdatingFacility';
import BuildingsList from '../screens/BuildingsList';
import Logout from '../screens/Logout';
// import CreatingRoom from '../screens/CreatingRoom';
import CreatingBuilding from '../screens/CreatingBuilding';
import ManagingRoomDetails from '../screens/ManagingRoomDetails';
import {GlobalContext} from '../context/Provider';
import ManagingRooms from '../screens/ManagingRooms';
import CreatingRoom from '../screens/CreatingRoom';
import RoomsList from '../screens/RoomsList';
import CreatingFacility from '../screens/CreatingFacility';
import CreatingManagingFacility from '../screens/CreatingDevice';
import AnalystDetailsDevices from '../screens/AnalystDetailsDevices';
import AnalystDetailsBuildings from '../screens/AnalystDetailsBuildings';
import AnalystDetailsRooms from '../screens/AnalystDetailsRooms';
import UpdatingRoom from '../screens/UpdatingRoom';
import UpdatingDevice from '../screens/UpdatingDevice';
import {useNavigation} from '@react-navigation/native';
import ManagingNavigator from './ManagingNavigator';
import ManagingBuilding from '../screens/ManagingBuildings';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  const {authDispatch} = useContext(GlobalContext);

  const {navigate} = useNavigation();

  //Render Image on sidebar
  const getDrawerContent = (navigation, authDispatch) => {
    return <SideMenu navigation={navigation} authDispatch={authDispatch} />;
  };
  return (
    <Drawer.Navigator
      drawerType="slide"
      initialRouteName={HOME_NAVIGATOR}
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
      <Drawer.Screen
        name={ANALYST}
        options={{headerShown: false}}
        component={Analyst}
      />
      <Drawer.Screen
        name={QRCODE}
        options={{headerShown: false}}
        component={QRCode}
      />
      {/* Home */}
      <Drawer.Screen
        name={ROOM_LIST}
        options={{headerShown: true}}
        component={RoomsList}
      />
      {/* Manage */}
      <Drawer.Screen
        name={MANAGE}
        options={{headerShown: false}}
        component={ManagingNavigator}
      />
      <Drawer.Screen
        name={MANAGING_FACILITIES}
        options={{headerShown: false}}
        component={ManagingDevices}
      />
      <Drawer.Screen
        name={INTRODUCE}
        options={{headerShown: false}}
        component={Introduce}
      />
      <Drawer.Screen
        name={LOGOUT}
        options={{swipeEnabled: false}}
        component={Logout}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
