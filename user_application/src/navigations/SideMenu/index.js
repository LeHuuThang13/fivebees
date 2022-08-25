import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import Container from '../../components/commons/Container';
import ImgHeaderSidebarMenu from '../../assets/images/Header_bg_sidebar.svg';
import styles from './styles';
import {HOME, QRCODE, QRFACILITY} from '../../constants/routeNames';

import HomeIcon from '../../assets/icons/home.svg';
import ChartIcon from '../../assets/icons/chart.svg';
import ManageIcon from '../../assets/icons/manage.svg';
import QRCodeIcon from '../../assets/icons/QRCode.svg';
import LogoutIcon from '../../assets/icons/logout.svg';
import logout from '../../context/actions/auth/logout';

const SideMenu = ({navigation, authDispatch, roomDispatch}) => {
  const menuItems = [
    {
      icon: <HomeIcon />,
      name: 'Trang Chủ',
      onPress: () => {
        navigation.navigate(HOME);
      },
    },
    {
      icon: <QRCodeIcon />,
      name: 'Quét mã thiết bị',
      onPress: () => {
        navigation.navigate(QRFACILITY);
      },
    },

    {
      icon: <LogoutIcon />,
      name: 'Đăng Xuất',
      onPress: () => {
        logout()(authDispatch)(roomDispatch);
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
