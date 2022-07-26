import React, {createContext, useReducer} from 'react';
import auth from './reducers/auth';
import authInitialState from './initialStates/authInitialState';
import rooms from './reducers/rooms';
import roomsInitialState from './initialStates/roomsInitialState';
import facilities from './reducers/facilities';
import facilitiesInitialState from './initialStates/facilitiesInitialState';
import buildings from './reducers/buildings';
import buildingsInitialState from './initialStates/buildingsInitialState';
import brokenFacilities from './reducers/brokenFacilities';
import brokenFacilitiesInitialState from './initialStates/brokenFacilitiesInitialState';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  const [roomsState, roomsDispatch] = useReducer(rooms, roomsInitialState);
  const [facilitiesState, facilitiesDispatch] = useReducer(facilities, facilitiesInitialState);
  const [buildingsState, buildingsDispatch] = useReducer(buildings, buildingsInitialState);
  const [brokenFacilitiesState, brokenFacilitiesDispatch] = useReducer(brokenFacilities, brokenFacilitiesInitialState);

  return (
    <GlobalContext.Provider
      value={{authState, roomsState, roomsDispatch, authDispatch, facilitiesState, facilitiesDispatch, buildingsState, buildingsDispatch, brokenFacilitiesState, brokenFacilitiesDispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
