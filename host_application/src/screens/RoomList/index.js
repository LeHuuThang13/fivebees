import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Container from '../../components/common/Container';
import IconMenu from '../../assets/icons/menu_icon.svg';
import {TouchableOpacity} from 'react-native';
import colors from '../../assets/themes/colors';
import ArrowDown from '../../assets/icons/arrowDown.svg';
import {BuildingOptions} from '../../components/common/BuildingOptions/BuildingOptions';

const RoomList = () => {
  const {setOptions, toggleDrawer} = useNavigation();
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
          <View style={{marginHorizontal: 0}}>
            <IconMenu />
          </View>
        </TouchableOpacity>
        // <OptionsNavigator toggleDrawer={toggleDrawer} iconSvg={IconMenu} />
      ),
      headerStyle: {
        backgroundColor: colors.bg_primary,
      },
      headerTintColor: colors.white,
    });
  }, []);

  const [chooseBuilding, setChooseBuilding] = useState('Tòa A');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModelVisible = bool => {
    setIsModalVisible(bool);
  };

  const setData = option => {
    setChooseBuilding(option);
  };

  return (
    <Container>
      <View>
        <View style={[styles.selectOptionSection, styles.stylesText]}>
          <TouchableOpacity
            style={styles.opacityBtn}
            onPress={() => changeModelVisible(true)}>
            <Text style={[styles.textSelectColor, styles.stylesText]}>
              {chooseBuilding}
            </Text>
            <ArrowDown />
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          animationType="none"
          visible={isModalVisible}
          onRequestClose={() => changeModelVisible(false)}>
          <BuildingOptions
            changeModelVisible={changeModelVisible}
            setData={setData}
          />
        </Modal>
      </View>
    </Container>
  );
};

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
});

export default RoomList;
