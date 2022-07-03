import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {HISTORY} from '../constants/routeNames';
import History from '../screens/History';

const HistoryTabNavigator = () => {
  const NotifStack = createNativeStackNavigator();
  return (
    <NotifStack.Navigator>
      <NotifStack.Screen name={HISTORY} component={History} />
    </NotifStack.Navigator>
  );
};

export default HistoryTabNavigator;
