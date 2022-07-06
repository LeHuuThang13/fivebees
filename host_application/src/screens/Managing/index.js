import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MenuIcon from '../../assets/icons/menu_icon.svg';
import Container from '../../components/common/Container';
import styles from './styles';
import Setting from '../../assets/icons/setting_white.svg';
import Room from '../../assets/icons/room_outline.svg';
import Dots from '../../assets/icons/dots.svg';
import {BUILDINGDETAILS} from '../../constants/routeNames';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import MorePopupMenu from '../../components/common/MorePopupMenu';

const Managing = ({navigation, route}) => {
  SettingHeaderNavigator.settingHeaderNavigator({MenuIcon: MenuIcon});

  const Building = () => {
    return (
      <View style={[styles.roomContainer]}>
        <MorePopupMenu
          styles={{
            width: 30,
            flexDirection: 'row-reverse',
            position: 'absolute',
            right: 15,
            top: 10,
            zIndex: 1,
          }}
          actionNameEdit={'Chỉnh sửa'}
          actionNameDelete={'Xóa'}
          onPressEdit={() => {
            console.log('Chỉnh sửa');
          }}
          onPressDelete={() => {
            console.log('Xóa');
          }}
        />

        <View style={styles.headerRoom}>
          <Text style={styles.headerRoomLeft}>Tòa A</Text>
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
      <Building />
      <Building />
      <Building />
      <Building />
    </Container>
  );
};

export default Managing;
