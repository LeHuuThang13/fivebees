import {TouchableOpacity} from 'react-native';
import React from 'react';
import PlusIcon from '../../assets/icons/plus_icon.svg';

const CustomCreatingButton = props => {
  const {onPress} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{
        position: 'absolute',
        right: 20,
        bottom: 20,
        padding: 0,
        zIndex: 3,
      }}>
      <PlusIcon />
    </TouchableOpacity>
  );
};

export default CustomCreatingButton;
