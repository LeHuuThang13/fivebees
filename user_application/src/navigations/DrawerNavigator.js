import {createDrawerNavigator} from '@react-navigation/drawer';
import {useContext} from 'react';
import {HOME_NAVIGATOR} from '../constants/routeNames';
import {GlobalContext} from '../context/Provider';
import BottomTabNavigatior from './BottomTabNavigator';
import React from 'react';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  const {authDispatch} = useContext(GlobalContext);

  const DrawerContents = (navigation, authDispatch) => {
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
        DrawerContents(navigation, authDispatch)
      }>
      <Drawer.Screen
        name={HOME_NAVIGATOR}
        options={{headerShown: false}}
        component={BottomTabNavigatior}
      />
      <Drawer.Screen
        name={HOME_}
        options={{headerShown: false}}
        component={BottomTabNavigatior}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
