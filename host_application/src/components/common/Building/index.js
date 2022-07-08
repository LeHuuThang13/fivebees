import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MorePopupMenu from '../MorePopupMenu';
import styles from './styles';

const Building = props => {
  const {
    MoreActions,
    buildingName,
    totalDevices,
    onPress,
    IconBtn,
    titleBtn,
    IconRoom,
  } = props;

  return (
    <View style={[styles.roomContainer]}>
      {MoreActions && MoreActions}

      <View style={styles.headerRoom}>
        <Text style={styles.headerRoomLeft}>{buildingName}</Text>
      </View>
      <View style={styles.bodyRoom}>
        <View style={styles.totalItem}>
          {IconRoom && IconRoom}
          <Text style={styles.textTotalDevices}>
            Tổng số phòng: {totalDevices}
          </Text>
        </View>
        <View style={styles.btnRoomContainer}>
          <TouchableOpacity style={styles.btnRoom} onPress={() => onPress()}>
            {IconBtn && IconBtn}
            <Text style={styles.textBtn}>{titleBtn}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Building;
