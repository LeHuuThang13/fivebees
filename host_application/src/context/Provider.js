import React, {createContext, useReducer} from 'react';
import auth from './reducers/auth';
import authInitialState from './initialStates/authInitialState';
import rooms from './reducers/rooms';
import roomsInitialState from './initialStates/roomsInitialState';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  const [roomsState, roomsDispatch] = useReducer(rooms, roomsInitialState);

  return (
    <GlobalContext.Provider
      value={{authState, roomsState, roomsDispatch, authDispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
