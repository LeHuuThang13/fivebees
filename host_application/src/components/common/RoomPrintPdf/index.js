import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import DeleteIcon from '../../../assets/icons/delete.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import colors from '../../../assets/themes/colors';
import ExportPdf from '../PrintAnalystRooms';

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
    MoreActions,
    isNotManaging,
    BtnIcon,
    data,
  } = props;

  return (
    <View style={styles.roomContainer}>
      <View style={styles.headerRoom}>
        <Text
          style={[styles.headerRoomLeft, {width: isNotManaging ? 250 : 150}]}
          numberOfLines={1}>
          {roomName}
        </Text>

        <Text style={styles.headerRoomRight}>
          <View style={styles.labelWrapper}>
            {status && <Text style={styles.labelStatus}>Tình trạng: </Text>}
          </View>
          <View style={styles.statusBlock}>
            <Text style={styles.status} numberOfLines={1}>
              {status}
            </Text>
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
        {IconBrokenDevice && (
          <View style={styles.totalItem}>
            <Text style={styles.iconItem}>
              {IconBrokenDevice && <IconBrokenDevice />}
            </Text>
            <Text style={styles.textTotalDevices}>
              {textBrokenDevice} {totalBrokenDevices}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.actionsContainer,
            {flexDirection: actions ? 'row' : 'row-reverse'},
          ]}>
          <ExportPdf data={[data]} />
        </View>
      </View>
    </View>
  );
};

export default Room;
