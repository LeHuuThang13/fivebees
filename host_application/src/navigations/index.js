import React, {useContext, useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {GlobalContext} from '../context/Provider';
import {ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from './RootNavigator';
import {LOGIN_USER_SUCCESS} from '../constants/actionTypes';

const AppNavigator = () => {
  const {
    authState: {isLoggedIn},
    authDispatch,
  } = useContext(GlobalContext);

  console.log(123);

  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [authLoaded, setAuthLoaded] = useState(false);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setAuthLoaded(true);
        setIsAuthenticated(true);
        authDispatch({type: LOGIN_USER_SUCCESS});
      } else {
        setAuthLoaded(true);
        setIsAuthenticated(false);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  const CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 255, 255)',
      background: 'white',
    },
  };

  return (
    <>
      {authLoaded ? (
        <NavigationContainer theme={CustomTheme} ref={navigationRef}>
          <View style={{flex: 1, backgroundColor: 'blue'}}>
            {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
          </View>
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default AppNavigator;
