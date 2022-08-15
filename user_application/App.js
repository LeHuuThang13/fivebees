import React from 'react';
import GlobalProvider from './src/context/Provider';
import AppNavigator from './src/navigations';

const App = () => {
  return (
    <GlobalProvider>
      <AppNavigator />
    </GlobalProvider>
  );
};

export default App;
