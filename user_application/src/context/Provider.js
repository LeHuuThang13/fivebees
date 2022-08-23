import React, {createContext, useReducer} from 'react';
import authInitialsState from './initialsStates/authInitialsState';
import facilitiesInitialsState from './initialsStates/facilitiesInitialsState';
import roomInitialsState from './initialsStates/roomInitialsState';
import auth from './reducers/auth';
import facility from './reducers/facility';
import room from './reducers/room';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(auth, authInitialsState);
  const [roomState, roomDispatch] = useReducer(room, roomInitialsState);
  const [facilitiesState, facilitiesDispatch] = useReducer(
    facility,
    facilitiesInitialsState,
  );

  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        roomState,
        roomDispatch,
        facilitiesState,
        facilitiesDispatch,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
