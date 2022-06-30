import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import IconMenu from '../../assets/icons/menu_icon.svg';
import colors from '../../assets/themes/colors';

const Analyst = () => {
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
      <Text>Hi from Analyst</Text>
    </View>
  );
};

export default Analyst;
