import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lineBreakMode: {
    width: 350,
  },
  header: {
    borderBottomColor: colors.border_input,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },

  body: {
    flex: 1,
  },
  itemWrapper: {
    paddingVertical: 10,
    flexDirection: 'row',
  },

  text: {
    fontSize: 20,
    color: colors.secondary,
  },

  textContentHeader: {
    fontSize: 15,
    fontWeight: '600',
  },

  contentTitle: {
    marginBottom: 20,
  },
});

export default styles;
