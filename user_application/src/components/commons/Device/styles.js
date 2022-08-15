import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  titleWrapper: {
    flexDirection: 'row',
    marginVertical: 0,
    marginBottom: 5,
  },

  contentWrapper: {
    marginLeft: 10,
  },

  title: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '600',
  },

  textContent: {
    width: 190,
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '600',
  },

  actionsWrapper: {
    flexDirection: 'row',
  },

  actionBtn: {
    width: 45,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '900',
  },
});
