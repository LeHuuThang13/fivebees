import React from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import Container from '../../components/common/Container';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import styles from './styles';
import {ROOM_LIST} from '../../constants/routeNames';

const RoomDetails = ({navigation, route}) => {
  SettingHeaderNavigator.settingChildHeaderBackToHomeNavigator({
    Icon: PreviousIcon,
    navigation: navigation,
  });

  const Devices = () => {
    return (
      <View style={styles.deviceContainer}>
        <Image source={require('../../assets/images/tv_samsung.jpg')} />
        <View></View>
      </View>
    );
  };

  return (
    <Container>
      <View>
        <View style={styles.headerRoomDetails}>
          <View style={styles.itemHeaderContainer}>
            <View style={styles.itemHeaderLabelBlock}>
              <Text style={styles.itemHeaderLabel}>Tình trạng</Text>
            </View>
            <View style={styles.itemHeaderTextBlock}>
              <Text style={styles.itemHeaderText}>Đang sử dụng</Text>
            </View>
          </View>
          <View style={styles.itemHeaderContainer}>
            <View style={styles.itemHeaderLabelBlock}>
              <Text style={styles.itemHeaderLabel}>Tổng thiết bị:</Text>
            </View>
            <View style={styles.itemHeaderTextBlock}>
              <Text style={styles.itemHeaderText}>10</Text>
            </View>
          </View>
          <View style={styles.itemHeaderContainer}>
            <View style={styles.itemHeaderLabelBlock}>
              <Text style={styles.itemHeaderLabel}>Thiết bị hư hỏng:</Text>
            </View>
            <View style={styles.itemHeaderTextBlock}>
              <Text style={styles.itemHeaderText}>0</Text>
            </View>
          </View>
        </View>

        <ScrollView>
          <Devices />
        </ScrollView>
      </View>
    </Container>
  );
};

export default RoomDetails;
