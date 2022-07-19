import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

const styles = StyleSheet.create({
  selectOptionSection: {
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    maxWidth: 100,
    marginTop: 16,
  },

  textSelectColor: {
    color: colors.secondary,
    flex: 1,
  },

  stylesText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  opacityBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  //   Room
  roomContainer: {
    borderColor: colors.border_input,
    borderWidth: 1,
    marginVertical: 24,
    borderRadius: 5,
  },

  headerRoom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: colors.border_input,
    borderBottomWidth: 1,
    alignItems: 'center',
  },

  headerRoomRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  labelStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  statusBlock: {
    width: 120,
    paddingLeft: 10,
  },

  headerRoomLeft: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
  },

  // room body

  bodyRoom: {
    padding: 10,
  },

  totalItem: {
    flexDirection: 'row',
  },

  iconItem: {
    marginRight: 10,
  },

  textTotalDevices: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  // room button
  btnRoomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  btnRoom: {
    padding: 10,
    backgroundColor: colors.bg_primary,
    flexDirection: 'row',
    borderRadius: 10,
  },

  textBtn: {
    marginLeft: 5,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },

  actionsWrapper: {
    flexDirection: 'row',
  },

  firstIcon: {},

  iconButton: {
    width: 30,
  },

  actionsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
