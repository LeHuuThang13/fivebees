import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

const styles = StyleSheet.create({
  headerRoomDetails: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border_input,
  },

  itemHeaderContainer: {
    flexDirection: 'row',
  },

  itemHeaderLabelBlock: {
    width: 150,
  },

  itemHeaderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  itemHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
