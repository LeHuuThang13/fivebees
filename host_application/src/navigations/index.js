import React, {useContext, useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {GlobalContext} from '../context/Provider';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavigator = () => {
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  const CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 255, 255)',
      background: 'white',
    },
  };
  console.log();

  return (
    <NavigationContainer theme={CustomTheme}>
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        {isLoggedIn || isAuthenticated ? (
          <DrawerNavigator />
        ) : (
          <AuthNavigator />
        )}
      </View>
    </NavigationContainer>
  );
};

export default AppNavigator;
