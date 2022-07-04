import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import colors from '../assets/themes/colors';
import {
  ANALYST,
  HOME_NAVIGATOR,
  INTRODUCE,
  MANAGE,
  ROOM_LIST,
  SETTINGS,
} from '../constants/routeNames';
import Analyst from '../screens/Analyst';
import Introduce from '../screens/Introduct';
import Managing from '../screens/Managing';
import RoomList from '../screens/RoomList';
import Settings from '../screens/Settings';
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
      drawerType="slide"
      screenOptions={{headerShown: true}}
      drawerContent={({navigation}) => getDrawerContent(navigation)}>
      <Drawer.Screen
        name={HOME_NAVIGATOR}
        options={{headerShown: false}}
        component={BottomTabNavigatior}
      />
      <Drawer.Screen name={ROOM_LIST} component={RoomList} />
      <Drawer.Screen name={ANALYST} component={Analyst} />
      <Drawer.Screen name={MANAGE} component={Managing} />
      <Drawer.Screen name={SETTINGS} component={Settings} />
      <Drawer.Screen name={INTRODUCE} component={Introduce} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
