import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

const styles = StyleSheet.create({
  headerWrapper: {
    marginTop: 10,
    borderBottomColor: colors.border_input,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  paddingContainer: {
    paddingHorizontal: 15,
  },

  fullScreen: {
    flex: 1,
  },

  contentView: {
    flexDirection: 'row',
  },

  titleView: {
    width: 150,
  },

  textTitle: {
    fontSize: 16,
    color: colors.secondary,
  },
});

export default styles;
