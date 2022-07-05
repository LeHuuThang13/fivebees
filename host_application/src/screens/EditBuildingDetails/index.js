import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, Modal, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/themes/colors';
import MenuIcon from '../../assets/icons/menu_icon.svg';
import Container from '../../components/common/Container';
import styles from './styles';
import Setting from '../../assets/icons/setting_white.svg';
import Room from '../../assets/icons/room_outline.svg';
import Dots from '../../assets/icons/dots.svg';

const Managing = ({navigation, route}) => {
  const {setOptions, toggleDrawer} = useNavigation();
  const [elementVisible, setElementVisible] = useState(false);

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
          <View style={{marginHorizontal: 0}}>
            <MenuIcon />
          </View>
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: colors.bg_primary,
      },
      headerTintColor: colors.white,
    });
  }, []);

  return (
    <Container>
      <Text>Hi from eding building detials</Text>
    </Container>
  );
};

export default Managing;
