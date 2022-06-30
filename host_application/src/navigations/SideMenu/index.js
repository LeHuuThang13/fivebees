import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import Container from '../../components/common/Container';
import ImgHeaderSidebarMenu from '../../assets/images/Header_bg_sidebar.svg';
import styles from './styles';
import {SETTINGS} from '../../constants/routeNames';

import HomeIcon from '../../assets/icons/home.svg';
import ChartIcon from '../../assets/icons/chart.svg';
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
        navigation.navigate(SETTINGS);
      },
    },
    {
      icon: <ChartIcon />,
      name: 'Thống Kê',
      onPress: () => {
        navigation.navigate(SETTINGS);
      },
    },
    {
      icon: <QRCodeIcon />,
      name: 'QR Code',
      onPress: () => {
        navigation.navigate(SETTINGS);
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
      icon: <AccountIcon />,
      name: 'Tài Khoản',
      onPress: () => {
        navigation.navigate(SETTINGS);
      },
    },
    {
      icon: <IntroduceIcon />,
      name: 'Hướng Dẫn Sử Dụng',
      onPress: () => {
        navigation.navigate(SETTINGS);
      },
    },
    {
      icon: <AccountIcon />,
      name: 'Đăng Xuất',
      onPress: () => {
        navigation.navigate(SETTINGS);
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
