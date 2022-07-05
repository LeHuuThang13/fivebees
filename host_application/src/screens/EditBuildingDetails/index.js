import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/themes/colors';
import Container from '../../components/common/Container';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import {MANAGE} from '../../constants/routeNames';

// import styles from './styles';

const Managing = ({navigation, route}) => {
  const {setOptions, toggleDrawer} = useNavigation();
  const [elementVisible, setElementVisible] = useState(false);

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(MANAGE);
          }}>
          <View style={{marginHorizontal: 0}}>
            <Text>
              <PreviousIcon />
            </Text>
          </View>
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: colors.bg_primary,
      },
      headerTintColor: colors.white,
    });
  }, []);

  const EditBuildingDetailsContainer = () => {
    
  }

  return (
    <Container>
      <Text>Hi from eding building detials</Text>
    </Container>
  );
};

export default Managing;
