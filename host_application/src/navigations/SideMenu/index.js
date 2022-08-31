import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import Container from '../../components/common/Container';
import ImgHeaderSidebarMenu from '../../assets/images/Header_bg_sidebar.svg';
import styles from './styles';
import {
  ANALYST,
  HOME_NAVIGATOR,
  INTRODUCE,
  LOGOUT,
  MANAGE,
  QRCODE,
  SETTINGS,
} from '../../constants/routeNames';

import HomeIcon from '../../assets/icons/home.svg';
import ChartIcon from '../../assets/icons/chart.svg';
import ManageIcon from '../../assets/icons/manage.svg';
import QRCodeIcon from '../../assets/icons/QRCode.svg';
import Pdf from '../../assets/icons/pdf.svg';
import LogoutIcon from '../../assets/icons/logout.svg';
import logout from '../../context/actions/auth/logout';

const SideMenu = ({navigation, authDispatch}) => {
  const menuItems = [
    {
      icon: <HomeIcon />,
      name: 'Trang Chủ',
      onPress: () => {
        navigation.navigate(HOME_NAVIGATOR);
      },
    },
    {
      icon: <ChartIcon />,
      name: 'Thống Kê',
      onPress: () => {
        navigation.navigate(ANALYST);
      },
    },
    {
      icon: <QRCodeIcon />,
      name: 'Quét mã thiết bị',
      onPress: () => {
        navigation.navigate(QRCODE);
      },
    },
    {
      icon: <ManageIcon />,
      name: 'Quản Lý',
      onPress: () => {
        navigation.navigate(MANAGE);
      },
    },
    {
      icon: <Pdf />,
      name: 'Tiện Ích',
      onPress: () => {
        navigation.navigate(INTRODUCE);
      },
    },
    {
      icon: <LogoutIcon />,
      name: 'Đăng Xuất',
      onPress: () => {
        logout()(authDispatch);
      },
    },
  ];
  return (
    <SafeAreaView>
      <Container style={{paddingHorizontal: 0}}>
        <ImgHeaderSidebarMenu />
        <View style={styles.sideBarBody}>
          {menuItems.map(({name, icon, onPress}) => (
            <TouchableOpacity key={name} onPress={onPress} style={styles.item}>
              <Text style={styles.iconSideBar}>{icon}</Text>
              <Text style={styles.itemText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default SideMenu;
