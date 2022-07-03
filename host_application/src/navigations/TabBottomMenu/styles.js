import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
  iconBody: {
    alignItems: 'center',
    borderBottomColor: colors.bg_primary,
    width: 70,
  },
  nameIcon: {
    color: colors.secondary,
    fontWeight: '400',
    fontSize: 14,
  },
});
