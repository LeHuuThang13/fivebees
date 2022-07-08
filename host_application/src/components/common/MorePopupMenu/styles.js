import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
  menuTrigger: {
    width: 30,
    flexDirection: 'row-reverse',
    paddingLeft: 5,
    paddingVertical: 5,
  },

  menuOptionsContainer: {
    padding: 10,
  },

  textOptions: {
    fontWeight: '600',
    fontSize: 16,
  },

  blockSeparate: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border_input,
  },

  disableHeightMenuOptions: {
    height: 0,
  },
});
