import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import colors from '../../../assets/themes/colors';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import MoreIcon from '../../../assets/icons/dots.svg';
import styleSheet from './styles';

const MorePopupMenu = props => {
  const {styles, onPressEdit, onPressDelete, actionNameEdit, actionNameDelete} =
    props;

  return (
    <View style={styles}>
      <Menu>
        <MenuTrigger
          style={styleSheet.menuTrigger}
          triggerTouchable={{activeOpacity: 0}}>
          <MoreIcon />
        </MenuTrigger>

        <MenuOptions style={[styleSheet.menuOptionsContainer]}>
          <MenuOption onSelect={() => onPressEdit()}>
            <Text style={styleSheet.textOptions}>{actionNameEdit}</Text>
          </MenuOption>
          <View style={styleSheet.blockSeparate}></View>
          <MenuOption onSelect={() => onPressDelete()}>
            <Text style={styleSheet.textOptions}>{' ' + actionNameDelete}</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default MorePopupMenu;
