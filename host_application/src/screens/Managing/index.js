import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/themes/colors';

const Introduce = () => {
  const {setOptions, toggleDrawer} = useNavigation();
  useEffect(() => {
    setOptions({
      headerStyle: {
        backgroundColor: colors.bg_primary,
      },
      headerTintColor: colors.white,
    });
  }, []);
  return (
    <View>
      <Text>Hi from Manage</Text>
    </View>
  );
};

export default Introduce;