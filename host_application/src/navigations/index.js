import React, {useContext} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {GlobalContext} from '../context/Provider';

const AppNavigator = () => {
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 255, 255)',
      background: 'white',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      {isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
