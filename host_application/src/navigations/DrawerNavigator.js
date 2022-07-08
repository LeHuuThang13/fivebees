import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import colors from '../assets/themes/colors';
import {
  ANALYST,
  BUILDINGDETAILS,
  HOME_NAVIGATOR,
  INTRODUCE,
  MANAGE,
  MANAGING_BUILDING,
  MANAGING_DEVICES,
  QRCODE,
  ROOMDETAILS,
  ROOM_LIST,
  SETTINGS,
} from '../constants/routeNames';
import Analyst from '../screens/Analyst';
import Introduce from '../screens/Introduct';
import Managing from '../screens/Managing';
import RoomDetails from '../screens/RoomDetails';
import RoomList from '../screens/RoomList';
import Settings from '../screens/Settings';
import ManagingBuilding from '../screens/ManagingBuilding';
import ManagingDevices from '../screens/ManagingDevices';
import BottomTabNavigatior from './BottomTabNavigator';
// import NotifNavigator from './NotificationNavigator';
import BuildlingDetails from '../screens/EditBuildingDetails';
import SideMenu from './SideMenu';
import QRCode from '../screens/QRCode';

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
        drawerBackgroundColor: 'black',
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
      <Drawer.Screen name={SETTINGS} component={Settings} />
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
      <Drawer.Screen name={INTRODUCE} component={Introduce} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
