import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ACCOUNT} from '../constants/routeNames';
import Account from '../screens/Account';

const ProfileNavigator = () => {
  const NotifStack = createNativeStackNavigator();
  return (
    <NotifStack.Navigator>
      <NotifStack.Screen name={ACCOUNT} component={Account} />
    </NotifStack.Navigator>
  );
};

export default ProfileNavigator;
