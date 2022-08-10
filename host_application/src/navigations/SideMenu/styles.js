import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 16,
    paddingVertical: 12,
    paddingLeft: 20,
    fontWeight: '700',
    color: colors.secondary,
  },

  sideBarBody: {
    paddingHorizontal: 12,
  },

  iconSideBar: {
    paddingVertical: 12,
    width: 30,
  },
});
