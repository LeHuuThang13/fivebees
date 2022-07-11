import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';

const Room = props => {
  const {
    roomName,
    status,
    totalDevices,
    totalBrokenDevices,
    navigationScreen,
    IconDevice,
    IconBrokenDevice,
    IconSetting,
    navigation,
  } = props;
  return (
    <View style={styles.roomContainer}>
      <View style={styles.headerRoom}>
        <Text style={[styles.headerRoomLeft, {color: 'red'}]}>{roomName}</Text>

        <Text style={styles.headerRoomRight}>
          <View>
            <Text style={styles.labelStatus}>Tình trạng:</Text>
          </View>
          <View style={styles.statusBlock}>
            <Text style={styles.status}>{status}</Text>
          </View>
        </Text>
      </View>

      <View style={styles.bodyRoom}>
        <View style={styles.totalItem}>
          <Text style={styles.iconItem}>{<IconDevice />}</Text>
          <Text style={styles.textTotalDevices}>
            Tổng thiết bị: {totalDevices}
          </Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.iconItem}>{<IconBrokenDevice />}</Text>
          <Text style={styles.textTotalDevices}>
            Thiết bị hư hỏng: {totalBrokenDevices}
          </Text>
        </View>
        {navigationScreen && (
          <View style={styles.btnRoomContainer}>
            <TouchableOpacity
              style={styles.btnRoom}
              onPress={() => {
                navigation.navigate(navigationScreen);
              }}>
              {<IconSetting />}
              <Text style={styles.textBtn}>Quản lý thiết bị</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Room;
