import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {HOME_NAVIGATOR} from '../constants/routeNames';
import BottomTabNavigatior from './BottomTabNavigator';
// import NotifNavigator from './NotificationNavigator';
import SideMenu from './SideMenu';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  //Render Image on sidebar
  const getDrawerContent = navigation => {
    return <SideMenu navigation={navigation} />;
  };
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerType="slide"
      drawerContent={({navigation}) => getDrawerContent(navigation)}>
      <Drawer.Screen name={HOME_NAVIGATOR} component={BottomTabNavigatior} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
