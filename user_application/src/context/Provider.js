import React, {createContext, useReducer} from 'react';
import authInitialsState from './initialsStates/authInitialsState';
import roomInitialsState from './initialsStates/roomInitialsState';
import auth from './reducers/auth';
import room from './reducers/room';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(auth, authInitialsState);
  const [roomState, roomDispatch] = useReducer(room, roomInitialsState);

  return (
    <GlobalContext.Provider
      value={{authState, authDispatch, roomState, roomDispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
