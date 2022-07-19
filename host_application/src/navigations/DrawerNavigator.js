import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import colors from '../assets/themes/colors';
import {
  ANALYST,
  BUILDINGDETAILS,
  CREATING_ROOM,
  EDITING_DEVICE,
  HOME_NAVIGATOR,
  INTRODUCE,
  MANAGE,
  MANAGING_BUILDING,
  MANAGING_DEVICES,
  MANAGING_ROOMS,
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
import ManagingBuilding from '../screens/ManagingBuilding';
import ManagingDevices from '../screens/ManagingDevices';
import BottomTabNavigatior from './BottomTabNavigator';
// import NotifNavigator from './NotificationNavigator';
import BuildlingDetails from '../screens/EditBuildingDetails';
import SideMenu from './SideMenu';
import TotalFixingDevices from '../screens/TotalFixingDevices';
import ManagingRooms from '../screens/ManagingRooms';
import EditingDevice from '../screens/EditingDevice';
import CreatingRoom from '../screens/CreatingRoom';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  //Render Image on sidebar
  const getDrawerContent = navigation => {
    return <SideMenu navigation={navigation} />;
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
      drawerContent={({navigation}) => getDrawerContent(navigation)}>
      <Drawer.Screen
        name={HOME_NAVIGATOR}
        options={{headerShown: false}}
        component={BottomTabNavigatior}
      />
      <Drawer.Screen
        name={ROOM_LIST}
        // options={{headerShown: false}}
        component={RoomList}
      />
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
        name={EDITING_DEVICE}
        options={{swipeEnabled: false}}
        component={EditingDevice}
      />
      <Drawer.Screen
        name={ROOMDETAILS}
        options={{swipeEnabled: false}}
        component={RoomDetails}
      />
      <Drawer.Screen
        name={BUILDINGDETAILS}
        options={{swipeEnabled: false}}
        component={BuildlingDetails}
      />
      <Drawer.Screen
        name={MANAGING_BUILDING}
        options={{swipeEnabled: false}}
        component={ManagingBuilding}
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
        name={CREATING_ROOM}
        options={{swipeEnabled: false}}
        component={CreatingRoom}
      />
      <Drawer.Screen name={INTRODUCE} component={Introduce} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
