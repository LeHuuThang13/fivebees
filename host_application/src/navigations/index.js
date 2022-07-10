import React, {useContext} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {GlobalContext} from '../context/Provider';
import {View} from 'react-native';

const AppNavigator = () => {
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);

  const CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 255, 255)',
      background: 'white',
    },
  };

  return (
    <NavigationContainer theme={CustomTheme}>
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        {isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />}
      </View>
    </NavigationContainer>
  );
};

export default AppNavigator;