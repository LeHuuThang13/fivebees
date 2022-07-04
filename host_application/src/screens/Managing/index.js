import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/themes/colors';
import MenuIcon from '../../assets/icons/menu_icon.svg';
import Container from '../../components/common/Container';
import styles from './styles';
import Setting from '../../assets/icons/setting_white.svg';
import Room from '../../assets/icons/room_outline.svg';
import Dots from '../../assets/icons/dots.svg';

const Managing = ({navigation, route}) => {
  const {setOptions, toggleDrawer} = useNavigation();

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

  const Building = () => {
    return (
      <View style={[styles.roomContainer]}>
        <View style={styles.headerRoom}>
          <Text style={styles.headerRoomLeft}>Tòa A</Text>
          <TouchableOpacity onPress={() => console.log('1e23')}>
            <Text style={styles.headerRoomRight}>
              <Dots />
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bodyRoom}>
          <View style={styles.totalItem}>
            <Text style={styles.iconItem}>
              <Room />
            </Text>
            <Text style={styles.textTotalDevices}>Tổng số phòng: 10</Text>
          </View>
          <View style={styles.btnRoomContainer}>
            <TouchableOpacity
              style={styles.btnRoom}
              onPress={() => {
                // navigation.navigate(ROOMDETAILS, {id: 'Phòng 33'});
              }}>
              <Setting />
              <Text style={styles.textBtn}>Quản lý phòng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Container>
      <Building />
    </Container>
  );
};

export default Managing;
