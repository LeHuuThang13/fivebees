import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import DeleteIcon from '../../../assets/icons/delete.svg';
import EditIcon from '../../../assets/icons/edit.svg';

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
    actions,
  } = props;

  const actionRoom = props => {
    return (
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.firstIcon, styles.iconButton]}
          onPress={() => actions.delete()}>
          <DeleteIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton]}
          onPress={() => actions.edit()}>
          <EditIcon />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.roomContainer}>
      <View style={styles.headerRoom}>
        <Text style={[styles.headerRoomLeft]}>{roomName}</Text>

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
        {actions && actionRoom()}
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
