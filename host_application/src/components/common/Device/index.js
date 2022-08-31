import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import styles from './styles';

const Device = props => {
  const {
    urlImage,
    title,
    name,
    amountTitle,
    amount,
    style,
    EditIcon,
    DeleteIcon,
    onPressEdit,
    onPressDelete,
    titleOne,
    textOne,
    titleTwo,
    textTwo,
  } = props;

  const WIDTH = Dimensions.get('window').width / 2 - 50;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imgWrapper}>
        <Image
          source={urlImage}
          style={{
            width: 120,
            height: 90,
          }}
        />
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

        {titleOne && (
          <View style={[styles.titleWrapper]}>
            <Text style={styles.title}>{titleOne}: </Text>
            <View>
              <Text numberOfLines={1} style={styles.textContent}>
                {textOne}
              </Text>
            </View>
          </View>
        )}

        {titleTwo && (
          <View style={[styles.titleWrapper]}>
            <Text style={styles.title}>{titleTwo}: </Text>
            <View>
              <Text numberOfLines={1} style={styles.textContent}>
                {textTwo}
              </Text>
            </View>
          </View>
        )}

        {DeleteIcon && (
          <View style={styles.actionsWrapper}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => onPressEdit()}>
              {EditIcon}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => onPressDelete()}>
              {DeleteIcon}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Device;
