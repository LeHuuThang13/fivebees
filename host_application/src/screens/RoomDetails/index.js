import React from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import HeaderDetails from '../../components/common/HeaderDetails';
import Device from '../../components/common/Device';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import {EDITING_DEVICE, ROOM_LIST} from '../../constants/routeNames';

const RoomDetails = ({navigation}) => {
  SettingHeaderNavigator.settingChildHeaderBackToHomeNavigator({
    Icon: PreviousIcon,
    previousBtn: () => {
      navigation.goBack();
    },
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
            DeleteIcon={<DeleteIcon />}
            EditIcon={<EditIcon />}
            onPressEdit={() => {
              navigation.navigate(EDITING_DEVICE);
            }}
            onPressDelete={() => {
              console.log('hello');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default RoomDetails;
