import {ActivityIndicator} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../../context/Provider';
import logout from '../../context/actions/auth/logout';

const Logout = ({}) => {
  const {authDispatch} = useContext(GlobalContext);

  console.log(123);

  useEffect(() => {
    logout()(authDispatch);
    console.log(123);
  }, []);

  return <ActivityIndicator />;
};

export default Logout;
