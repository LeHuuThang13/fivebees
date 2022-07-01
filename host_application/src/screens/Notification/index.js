import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/themes/colors';
import IconMenu from '../../assets/icons/menu_icon.svg';

const Notification = () => {
  const {setOptions, toggleDrawer} = useNavigation();
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
          <View style={{marginHorizontal: 15}}>
            <IconMenu />
          </View>
        </TouchableOpacity>
        // <OptionsNavigator toggleDrawer={toggleDrawer} iconSvg={IconMenu} />
      ),
      headerStyle: {
        backgroundColor: colors.bg_primary,
      },
      headerTintColor: colors.white,
    });
  }, []);
  return (
    <View>
      <Text>Hi from Notification</Text>
    </View>
  );
};

export default Notification;
