import React from 'react';
import AppNavigator from './src/navigations';
import GlobalProvider from './src/context/Provider';
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  return (
    <GlobalProvider>
      <MenuProvider>
        <AppNavigator />
      </MenuProvider>
    </GlobalProvider>
  );
};

export default App;
