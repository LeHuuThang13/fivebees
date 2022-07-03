import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/themes/colors';
import IconMenu from '../../assets/icons/menu_icon.svg';

const History = () => {
  const {setOptions, toggleDrawer} = useNavigation();
  useEffect(() => {
    setOptions({
      headerStyle: {
        backgroundColor: colors.bg_primary,
      },
      headerTintColor: colors.white,
      headerTitleAlign: 'center',
    });
  }, []);
  return (
    <View>
      <Text>Hi from Notificatxxxion</Text>
    </View>
  );
};

export default History;
