import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, Touchable, View} from 'react-native';
import Container from '../../components/common/Container';
import {TouchableOpacity} from 'react-native';
import colors from '../../assets/themes/colors';
import ArrowDown from '../../assets/icons/arrowDown.svg';
import {BuildingOptions} from '../../components/common/BuildingOptions/BuildingOptions';
import Device from '../../assets/icons/device.svg';
import Setting from '../../assets/icons/setting_white.svg';
import BrokenDevice from '../../assets/icons/broken.svg';
import styles from './styles';
import {ROOMDETAILS} from '../../constants/routeNames';
import Room from '../../components/common/Room';
import IconMenu from '../../assets/icons/menu_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';

const RoomList = ({navigation}) => {
  const [chooseBuilding, setChooseBuilding] = useState('Tòa A');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModelVisible = bool => {
    setIsModalVisible(bool);
  };

  const setData = option => {
    setChooseBuilding(option);
  };

  SettingHeaderNavigator.settingHeaderNavigator({MenuIcon: IconMenu});

  return (
    <Container>
      {/* Selecting options */}
      <View>
        <View style={[styles.selectOptionSection, styles.stylesText]}>
          <TouchableOpacity
            style={styles.opacityBtn}
            onPress={() => changeModelVisible(true)}>
            <Text style={[styles.textSelectColor, styles.stylesText]}>
              {chooseBuilding}
            </Text>
            <ArrowDown />
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          animationType="none"
          visible={isModalVisible}
          onRequestClose={() => changeModelVisible(false)}>
          <BuildingOptions
            changeModelVisible={changeModelVisible}
            setData={setData}
          />
        </Modal>
      </View>

      <Room
        roomName={'Phòng 101'}
        status={'Đang sử dụng'}
        totalDevices={10}
        totalBrokenDevices={0}
        navigationScreen={ROOMDETAILS}
        IconDevice={Device}
        IconBrokenDevice={BrokenDevice}
        IconSetting={Setting}
        navigation={navigation}
      />
    </Container>
  );
};

export default RoomList;
