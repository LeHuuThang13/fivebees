import React from 'react';
import {Text, View} from 'react-native';
import GlobalStyles from '../../../GlobalStyles';
import styles from './styles';

const CustomHeaderDetails = props => {
  const {firstText, secondText, thirdText, fouthText} = props;

  const TextContentHeader = props => {
    const {text} = props;
    return (
      <View>
        <Text style={styles.textContentHeader}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.header}>
      <View style={[styles.wrapper, GlobalStyles.paddingContainer]}>
        <TextContentHeader text={'Tòa nhà: A'} />
        <TextContentHeader text={'Tổng số phòng: 12'} />
      </View>
    </View>
  );
};

export default CustomHeaderDetails;
