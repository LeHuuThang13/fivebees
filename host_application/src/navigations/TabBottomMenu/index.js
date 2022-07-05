import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/common/Container';
import styles from './styles';
import colors from '../../assets/themes/colors';

const TabBottomMenu = props => {
  const {svgIcon, nameIcon, isFocused} = props;

  return (
    <SafeAreaView>
      <View
        style={[
          styles.iconBody,
          {
            borderBottomColor: isFocused
              ? colors.primary
              : colors.bg_transparent,
          },
        ]}>
        <Text style={[styles.icon]}>{svgIcon}</Text>
        <Text
          style={[
            styles.nameIcon,
            {color: isFocused ? colors.primary : colors.secondary},
          ]}>
          {nameIcon}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TabBottomMenu;
