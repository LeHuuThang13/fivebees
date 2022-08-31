import React from 'react';
import {Text, View} from 'react-native';
import GlobalStyles from '../../../../globalStyles';
import styles from './styles';

const HeaderDetails = props => {
  const {
    textTitleOne,
    contentTextTitleOne,
    textTitleTwo,
    contentTextTitleTwo,
    textTitleThree,
    contentTextTitleThree,
    textTitleFour,
    contentTextTitleFour,
  } = props;

  return (
    <View style={[styles.headerWrapper, GlobalStyles.container]}>
      <View style={styles.contentView}>
        <View style={styles.titleView}>
          <Text style={[styles.textTitle]}>{textTitleOne} :</Text>
        </View>
        <Text style={[styles.textTitle]}>{contentTextTitleOne}</Text>
      </View>
      {textTitleTwo && (
        <View style={styles.contentView}>
          <View style={styles.titleView}>
            <Text style={[styles.textTitle]}>{textTitleTwo} :</Text>
          </View>
          <Text style={[styles.textTitle]}>{contentTextTitleTwo}</Text>
        </View>
      )}
      {textTitleThree && (
        <View style={styles.contentView}>
          <View style={styles.titleView}>
            <Text style={styles.textTitle}>{textTitleThree} :</Text>
          </View>
          <Text style={styles.textTitle}>{contentTextTitleThree}</Text>
        </View>
      )}
      {textTitleFour && (
        <View style={styles.contentView}>
          <View style={styles.titleView}>
            <Text style={styles.textTitle}>{textTitleFour} :</Text>
          </View>
          <Text style={styles.textTitle}>{contentTextTitleFour}</Text>
        </View>
      )}
    </View>
  );
};

export default HeaderDetails;
