import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/themes/colors';
import MenuIcon from '../../assets/icons/menu_icon.svg';
import Container from '../../components/common/Container';
import styles from './styles';
import Setting from '../../assets/icons/setting_white.svg';
import Room from '../../assets/icons/room_outline.svg';
import Dots from '../../assets/icons/dots.svg';
import {BUILDINGDETAILS} from '../../constants/routeNames';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';

const Managing = ({navigation, route}) => {
  const [elementVisible, setElementVisible] = useState(false);
  SettingHeaderNavigator.settingHeaderNavigator({MenuIcon: MenuIcon});

  const Building = () => {
    return (
      <View style={[styles.roomContainer]}>
        <TouchableOpacity
          onPress={() => setElementVisible(!elementVisible)}
          style={{
            position: 'absolute',
            width: 30,
            right: 10,
            top: 12,
            zIndex: 1,
            flexDirection: 'row-reverse',
          }}>
          <Text style={styles.headerRoomRight}>
            <Dots />
          </Text>
        </TouchableOpacity>
        {elementVisible ? (
          <View style={{position: 'absolute', right: 30}}>
            <View
              style={[
                styles.headerMore,
                {
                  width: 100,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: colors.border_input,
                  backgroundColor: colors.white,
                  zIndex: 1,
                  top: 10,
                  right: -20,
                },
              ]}>
              <Modal
                transparent={true}
                animationType="none"
                visible={elementVisible}
                onRequestClose={() => setElementVisible(false)}>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    setElementVisible(false);
                  }}>
                  <View style={{backgroundColor: colors.white}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(BUILDINGDETAILS)}
                      style={{marginBottom: 20}}>
                      <Text>Chỉnh sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setElementVisible(!elementVisible)}>
                      <Text>Xóa</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>
        ) : null}
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
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setElementVisible(false);
        }}>
        <Building />
        <Building />
        <Building />
        <Building />
        <Building />
      </TouchableOpacity>
    </Container>
  );
};

export default Managing;
