import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import DeleteIcon from '../../../assets/icons/delete.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import colors from '../../../assets/themes/colors';

const Room = props => {
  const {
    roomName,
    status,
    totalDevices,
    totalBrokenDevices,
    IconDevice,
    IconBrokenDevice,
    IconSetting,
    actions,
    onPress,
    disabled,
    textTotalDevices,
    textBrokenDevice,
    btnTitle,
  } = props;

  const actionRoom = () => {
    return (
      <View style={styles.actionsWrapper}>
        <TouchableOpacity
          style={[styles.iconButton]}
          onPress={() => actions.edit()}>
          <EditIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.firstIcon, styles.iconButton]}
          onPress={() => actions.delete()}>
          <DeleteIcon />
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
            {status && <Text style={styles.labelStatus}>Tình trạng:</Text>}
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
            {textTotalDevices} {totalDevices}
          </Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.iconItem}>
            {IconBrokenDevice && <IconBrokenDevice />}
          </Text>
          <Text style={styles.textTotalDevices}>
            {textBrokenDevice} {totalBrokenDevices}
          </Text>
        </View>
        <View
          style={[
            styles.actionsContainer,
            {flexDirection: actions ? 'row' : 'row-reverse'},
          ]}>
          {actions && actionRoom()}
          {onPress && (
            <View style={styles.btnRoomContainer}>
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: disabled
                      ? colors.secondary
                      : colors.bg_primary,
                    width: 150,
                  },
                  styles.btnRoom,
                ]}
                disabled={disabled}
                onPress={() => onPress()}>
                {<IconSetting />}
                <Text style={styles.textBtn}>{btnTitle}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Room;
