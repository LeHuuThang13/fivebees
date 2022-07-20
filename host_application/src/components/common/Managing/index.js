import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

const Managing = props => {
  const {
    MoreActions,
    managingName,
    totalDevices,
    onPress,
    IconBtn,
    titleBtn,
    IconManaging,
    totalManaging,
  } = props;

  return (
    <View style={[styles.roomContainer]}>
      {MoreActions && MoreActions}

      <View style={styles.headerRoom}>
        <Text style={styles.headerRoomLeft}>{managingName}</Text>
      </View>
      <View style={styles.bodyRoom}>
        <View style={styles.totalItem}>
          <Text style={styles.icon}>{IconManaging && IconManaging}</Text>
          <Text style={styles.textTotalDevices}>
            {totalManaging}: {totalDevices}
          </Text>
        </View>
        {titleBtn && (
          <View style={styles.btnRoomContainer}>
            <TouchableOpacity style={styles.btnRoom} onPress={() => onPress()}>
              {IconBtn && IconBtn}
              <Text style={styles.textBtn}>{titleBtn}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
export default Managing;
