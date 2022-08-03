import React, {createContext, useReducer} from 'react';
import authInitialsState from './initialsStates/authInitialsState';
import auth from './reducers/auth';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(auth, authInitialsState);

  return (
    <GlobalContext.Provider value={{authState, authDispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
