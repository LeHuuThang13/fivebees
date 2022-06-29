import React, {createContext, useReducer} from 'react';
import auth from './reducers/auth';
import authInitialState from './initialsStates/authInitialState';
import contacts from './reducers/auth';
import contactsInitialState from './initialsStates/contactsInitialState';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  const [contactsState, contactsDispatch] = useReducer(
    contacts,
    contactsInitialState,
  );

  return (
    <GlobalContext.Provider
      value={{authState, authDispatch, contactsState, contactsDispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
