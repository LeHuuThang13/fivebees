import {createDrawerNavigator} from '@react-navigation/drawer';
import {useContext} from 'react';
import {HOME, QRCODE, QRFACILITY} from '../constants/routeNames';
import {GlobalContext} from '../context/Provider';
import BottomTabNavigatior from './BottomTabNavigator';
import React from 'react';
import SideMenu from './SideMenu';
import HomeNavigator from './HomeNavigator';
import ScanFacility from '../screens/ScanFacility';

const DrawerNavigator = ({route}) => {
  const Drawer = createDrawerNavigator();
  const {authDispatch, roomDispatch} = useContext(GlobalContext);

  const DrawerContents = (navigation, authDispatch, roomDispatch) => {
    return (
      <SideMenu
        navigation={navigation}
        authDispatch={authDispatch}
        roomDispatch={roomDispatch}
      />
    );
  };

  return (
    <Drawer.Navigator
      drawerType="slide"
      initialRouteName={HOME}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          flexDirection: 'row-reverse',
        },
      }}
      drawerContent={({navigation}) =>
        DrawerContents(navigation, authDispatch, roomDispatch)
      }>
      <Drawer.Screen
        name={HOME}
        options={{headerShown: false}}
        component={BottomTabNavigatior}
      />
      <Drawer.Screen
        name={QRFACILITY}
        options={{headerShown: false}}
        component={ScanFacility}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
