import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import EditIcon from '../../../assets/icons/edit.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';

const Device = props => {
  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={require('../../../assets/images/tv_samsung.jpg')}
          width={120}
          height={90}
        />
      </View>
      <View style={styles.contentWrapper}>
        <View style={[styles.titleWrapper]}>
          <Text style={styles.title}>Sản phẩm:</Text>
          <View>
            <Text numberOfLines={1} style={styles.textContent}>
              Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU8000KXXV
            </Text>
          </View>
        </View>

        <View style={[styles.titleWrapper]}>
          <Text style={styles.title}>Số lượng:</Text>
          <View>
            <Text numberOfLines={1} style={styles.textContent}>
              2
            </Text>
          </View>
        </View>

        <View style={styles.actionsWrapper}>
          <TouchableOpacity style={styles.actionBtn}>
            <EditIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <DeleteIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Device;
