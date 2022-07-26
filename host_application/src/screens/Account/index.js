import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import IconMenu from '../../assets/icons/menu_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import Container from '../../components/common/Container';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = ({navigation}) => {
  SettingHeaderNavigator.settingHeaderNavigator({
    MenuIcon: IconMenu,
    styles: {
      marginHorizontal: -6,
    },
  });
  const [userInfo, setUserInfo] = useState({});

  const getUser = async () => {
    try {
      user = await AsyncStorage.getItem('user');
      const userInfoObj = JSON.parse(user);
      setUserInfo(userInfoObj);
    } catch (err) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  const {id, email, name} = userInfo;

  return (
    <Container>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/images/avatar.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.bodyWrapper}>
        <View style={styles.contentWrapper}>
          <Text style={styles.content}>Tên: {name}</Text>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.content}>Email: {email}</Text>
        </View>
      </View>
    </Container>
  );
};

export default Account;
