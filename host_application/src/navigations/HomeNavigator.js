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
  NOTIFICATION,
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
import ManagingNavigator from './ManagingNavigator';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const AppNavigator = ({navigation, route}) => {
  const HomeStack = createNativeStackNavigator();
  const tabBarBottom = [BUILDINGS_LIST, NOTIFICATION, ACCOUNT, undefined];
  const curRoute = getFocusedRouteNameFromRoute(route);
  useEffect(() => {
    let isMounted = true;
    console.log(tabBarBottom.includes(getFocusedRouteNameFromRoute(route)));
    console.log(getFocusedRouteNameFromRoute(route));
    if (isMounted) {
      if (!tabBarBottom.includes(getFocusedRouteNameFromRoute(route))) {
        navigation.setOptions({tabBarStyle: {display: 'none'}});
      } else {
        navigation.setOptions({tabBarStyle: {display: 'flex'}});
      }
    }

    return () => (isMounted = false);
  }, [curRoute]);
  return (
    <HomeStack.Navigator
      initialRouteName={BUILDINGS_LIST}
      screenOptions={{headerShown: true}}>
      <HomeStack.Screen name={BUILDINGS_LIST} component={BuildingsList} />
      <HomeStack.Screen
        name={ROOM_LIST}
        options={{
          tabBarStyle: false,
        }}
        component={RoomsList}
      />
      <HomeStack.Screen name={QRCODE} component={QRCode} />
      <HomeStack.Screen name={ACCOUNT} component={Account} />
      <HomeStack.Screen name={ROOMDETAILS} component={RoomDetails} />
      <HomeStack.Screen
        name={MANAGE}
        component={ManagingNavigator}
        screenOptions={{headerShown: false}}
      />
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
