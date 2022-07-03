import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import Container from '../../components/common/Container';
import ImgHeaderSidebarMenu from '../../assets/images/Header_bg_sidebar.svg';
import styles from './styles';
import {
  ACCOUNT,
  ANALYST,
  HOME_NAVIGATOR,
  INTRODUCE,
  LOGOUT,
  QRCODE,
  ROOM_LIST,
  SETTINGS,
} from '../../constants/routeNames';

import HomeIcon from '../../assets/icons/home.svg';
import ChartIcon from '../../assets/icons/chart.svg';
import ManageIcon from '../../assets/icons/manage.svg';
import QRCodeIcon from '../../assets/icons/QRCode.svg';
import SettingIcon from '../../assets/icons/setting.svg';
import AccountIcon from '../../assets/icons/account.svg';
import IntroduceIcon from '../../assets/icons/introduce.svg';
import LogoutIcon from '../../assets/icons/logout.svg';

const SideMenu = ({navigation}) => {
  const menuItems = [
    {
      icon: <HomeIcon />,
      name: 'Trang Chủ',
      onPress: () => {
        navigation.navigate(ROOM_LIST);
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
      icon: <ManageIcon />,
      name: 'Quản Lý',
      onPress: () => {
        navigation.navigate(ANALYST);
      },
    },
    {
      icon: <QRCodeIcon />,
      name: 'QR Code',
      onPress: () => {
        navigation.navigate(QRCODE);
      },
    },
    {
      icon: <SettingIcon />,
      name: 'Tùy Chỉnh',
      onPress: () => {
        navigation.navigate(SETTINGS);
      },
    },
    {
      icon: <IntroduceIcon />,
      name: 'Hướng Dẫn Sử Dụng',
      onPress: () => {
        navigation.navigate(INTRODUCE);
      },
    },
    {
      icon: <LogoutIcon />,
      name: 'Đăng Xuất',
      onPress: () => {
        navigation.navigate(LOGOUT);
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
