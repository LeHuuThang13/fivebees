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
  } = props;

  return (
    <View style={[styles.headerWrapper, GlobalStyles.paddingContainer]}>
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
    </View>
  );
};

export default HeaderDetails;
