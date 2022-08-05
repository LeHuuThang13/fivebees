import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import styles from './styles';

const DeviceAnalyst = props => {
  const {
    urlImage,
    title,
    name,
    amountTitle,
    amount,
    roomTitle,
    room,
    statusTitle,
    status,
    style,
  } = props;

  const WIDTH = Dimensions.get('window').width / 2 - 50;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imgWrapper}>
        <Image source={urlImage} width={120} height={90} />
      </View>
      <View style={styles.contentWrapper}>
        <View style={[styles.titleWrapper]}>
          <Text style={styles.title}>{title} </Text>
          <View>
            <Text
              numberOfLines={1}
              style={[styles.textContent, {width: WIDTH}]}>
              {name}
            </Text>
          </View>
        </View>

        <View style={[styles.titleWrapper]}>
          <Text style={styles.title}>{amountTitle} </Text>
          <View>
            <Text numberOfLines={1} style={styles.textContent}>
              {amount}
            </Text>
          </View>
        </View>

        <View style={[styles.titleWrapper]}>
          <Text style={styles.title}>{roomTitle} </Text>
          <View>
            <Text numberOfLines={1} style={styles.textContent}>
              {room}
            </Text>
          </View>
        </View>

        <View style={[styles.titleWrapper]}>
          <Text style={styles.title}>{statusTitle} </Text>
          <View>
            <Text numberOfLines={1} style={styles.textContent}>
              {status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeviceAnalyst;
