import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View, ScrollView, Image} from 'react-native';
import colors from '../../assets/themes/colors';
import Container from '../../components/common/Container';
import styles from './styles';

const RoomDetails = ({navigation, route}) => {
  console.log(234);
  const {setOptions, toggleDrawer} = useNavigation();
  useEffect(() => {
    setOptions({
      headerStyle: {
        backgroundColor: colors.bg_primary,
      },
      headerTintColor: colors.white,
    });
  }, []);

  const Devices = () => {
    return (
      <View style={styles.deviceContainer}>
        <Image source={require('../../assets/images/tv_samsung.jpg')} />
        <View></View>
      </View>
    );
  };

  return (
    <Container>
      <View>
        <View style={styles.headerRoomDetails}>
          <View style={styles.itemHeaderContainer}>
            <View style={styles.itemHeaderLabelBlock}>
              <Text style={styles.itemHeaderLabel}>Tình trạng</Text>
            </View>
            <View style={styles.itemHeaderTextBlock}>
              <Text style={styles.itemHeaderText}>Đang sử dụng</Text>
            </View>
          </View>
          <View style={styles.itemHeaderContainer}>
            <View style={styles.itemHeaderLabelBlock}>
              <Text style={styles.itemHeaderLabel}>Tổng thiết bị:</Text>
            </View>
            <View style={styles.itemHeaderTextBlock}>
              <Text style={styles.itemHeaderText}>10</Text>
            </View>
          </View>
          <View style={styles.itemHeaderContainer}>
            <View style={styles.itemHeaderLabelBlock}>
              <Text style={styles.itemHeaderLabel}>Thiết bị hư hỏng:</Text>
            </View>
            <View style={styles.itemHeaderTextBlock}>
              <Text style={styles.itemHeaderText}>0</Text>
            </View>
          </View>
        </View>

        <ScrollView>
          <Devices />
        </ScrollView>
      </View>
    </Container>
  );
};

export default RoomDetails;
