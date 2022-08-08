import {ActivityIndicator} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../../context/Provider';
import logout from '../../context/actions/auth/logout';

const Logout = ({navigation}) => {
  const {authDispatch} = useContext(GlobalContext);

  useEffect(() => {
    logout()(authDispatch);
  }, [navigation]);

  return <ActivityIndicator />;
};

export default Logout;
