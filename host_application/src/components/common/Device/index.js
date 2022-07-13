import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import styles from './styles';
import EditIcon from '../../../assets/icons/edit.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';

const Device = props => {
  const {urlImage, title, name, amountTitle, amount, style} = props;

  const WIDTH = Dimensions.get('window').width / 2 - 40;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imgWrapper}>
        <Image source={urlImage} width={120} height={90} />
      </View>
      <View style={styles.contentWrapper}>
        <View style={[styles.titleWrapper]}>
          <Text style={styles.title}>{title}: </Text>
          <View>
            <Text
              numberOfLines={1}
              style={[styles.textContent, {width: WIDTH}]}>
              {name}
            </Text>
          </View>
        </View>

        <View style={[styles.titleWrapper]}>
          <Text style={styles.title}>{amountTitle}: </Text>
          <View>
            <Text numberOfLines={1} style={styles.textContent}>
              {amount}
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
