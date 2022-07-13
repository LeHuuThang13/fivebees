import React from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import Container from '../../components/common/Container';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import styles from './styles';
import {ROOM_LIST} from '../../constants/routeNames';
import GlobalStyles from '../../../GlobalStyles';
import HeaderDetails from '../../components/common/HeaderDetails';
import Device from '../../components/common/Device';

const RoomDetails = ({navigation, route}) => {
  SettingHeaderNavigator.settingChildHeaderBackToHomeNavigator({
    Icon: PreviousIcon,
    navigation: navigation,
  });

  return (
    <View style={[styles.container, GlobalStyles.fullScreen]}>
      <HeaderDetails
        textTitleOne={'Tình trạng'}
        contentTextTitleOne={'Đang sử dụng'}
        textTitleTwo={'Tổng thiết bị'}
        contentTextTitleTwo={10}
        textTitleThree={'Thiết bị hư hỏng'}
        contentTextTitleThree={0}
      />
      <ScrollView style={GlobalStyles.paddingContainer}>
        <View>
          <Device
            urlImage={require('../../assets/images/tv_samsung.jpg')}
            title={'Sản phẩm'}
            name={'Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU8000KXXV/'}
            amountTitle={'Số lượng'}
            amount={2}
            style={{
              marginVertical: 12,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default RoomDetails;
