import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Container from '../../components/common/Container';
import IconMenu from '../../assets/icons/menu_icon.svg';
import {TouchableOpacity} from 'react-native';
import colors from '../../assets/themes/colors';
import OptionsNavigator from '../../components/common/OptionsNavigator';

const RoomList = () => {
  const {setOptions, toggleDrawer} = useNavigation();
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
          <View style={{marginHorizontal: 15}}>
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

  return (
    <Container>
      <Text>Hi from RoomList</Text>
    </Container>
  );
};

export default RoomList;
