import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, Touchable, View} from 'react-native';
import Container from '../../components/common/Container';
import IconMenu from '../../assets/icons/menu_icon.svg';
import {TouchableOpacity} from 'react-native';
import colors from '../../assets/themes/colors';
import ArrowDown from '../../assets/icons/arrowDown.svg';
import {BuildingOptions} from '../../components/common/BuildingOptions/BuildingOptions';
import Device from '../../assets/icons/device.svg';
import Setting from '../../assets/icons/setting_white.svg';
import BrokenDevice from '../../assets/icons/broken.svg';
import styles from './styles';
import {ROOMDETAILS} from '../../constants/routeNames';

const RoomList = ({navigation}) => {
  const {setOptions, toggleDrawer} = useNavigation();
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
          <View style={{marginHorizontal: 0}}>
            <IconMenu />
          </View>
        </TouchableOpacity>
        // <OptionsNavigator toggleDrawer={toggleDrawer} iconSvg={IconMenu} />
      ),
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: colors.bg_primary,
      },
      headerTintColor: colors.white,
    });
  }, []);

  const [chooseBuilding, setChooseBuilding] = useState('Tòa A');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModelVisible = bool => {
    setIsModalVisible(bool);
  };

  const setData = option => {
    setChooseBuilding(option);
  };

  const Room = () => {
    return (
      <View style={styles.roomContainer}>
        <View style={styles.headerRoom}>
          <Text style={styles.headerRoomLeft}>Phòng 101</Text>

          <Text style={styles.headerRoomRight}>
            <View>
              <Text style={styles.labelStatus}>Tình trạng:</Text>
            </View>
            <View style={styles.statusBlock}>
              <Text style={styles.status}>Đang sử dụng</Text>
            </View>
          </Text>
        </View>

        <View style={styles.bodyRoom}>
          <View style={styles.totalItem}>
            <Text style={styles.iconItem}>
              <Device />
            </Text>
            <Text style={styles.textTotalDevices}>Tổng thiết bị: 10</Text>
          </View>
          <View style={styles.totalItem}>
            <Text style={styles.iconItem}>
              <BrokenDevice />
            </Text>
            <Text style={styles.textTotalDevices}>Thiết bị hư hỏng: 0</Text>
          </View>
          <View style={styles.btnRoomContainer}>
            <TouchableOpacity
              style={styles.btnRoom}
              onPress={() => {
                navigation.navigate(ROOMDETAILS);
              }}>
              <Setting />
              <Text style={styles.textBtn}>Quản lý thiết bị</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

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

      {/* rooms */}
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
    </Container>
  );
};

export default RoomList;
