import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../assets/themes/colors';
import styles from './styles';

const Managing = props => {
  const {
    MoreActions,
    managingName,
    totalManagingTitleText,
    onPress,
    managingBtnText,
    IconManagingBtn,
    IconManagingText,
    totalManagingContentText,
    disabled,
  } = props;
  return (
    <View style={[styles.roomContainer]}>
      {MoreActions && MoreActions}
      {/* Header */}
      <View style={styles.headerRoom}>
        <Text style={styles.headerRoomLeft}>{managingName}</Text>
      </View>
      {/* Body */}
      <View style={styles.bodyRoom}>
        <View style={styles.totalItem}>
          <Text style={styles.icon}>
            {IconManagingText && IconManagingText}
          </Text>
          <Text style={styles.textTotalManagingText}>
            {totalManagingTitleText}: {totalManagingContentText}
          </Text>
        </View>
        {/* Button */}
        {managingBtnText && (
          <View style={styles.btnRoomContainer}>
            <TouchableOpacity
              style={[styles.btnRoom]}
              disabled={disabled && !disabled}
              onPress={() => onPress()}>
              {IconManagingBtn && IconManagingBtn}
              <Text style={styles.textBtn}>{managingBtnText}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
export default Managing;
