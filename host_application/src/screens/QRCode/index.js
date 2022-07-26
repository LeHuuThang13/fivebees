import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View, Linking} from 'react-native';
import colors from '../../assets/themes/colors';
import IconMenu from '../../assets/icons/menu_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import Container from '../../components/common/Container';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QRCode = () => {
  SettingHeaderNavigator.settingHeaderNavigator({
    MenuIcon: IconMenu,
    styles: {
      marginHorizontal: 10,
    },
  });

  const onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };

  return (
    <View style={{flex: 1}}>
      <QRCodeScanner
        cameraContainerStyle={{
          width: 275,
          borderWidth: 1,
          borderColor: 'white',
          alignSelf: 'center',
        }}
        cameraStyle={{height: '100%', alignSelf: 'center'}}
        onRead={onSuccess}
        topContent={<View style={{flex: 1, backgroundColor: 'red'}}></View>}
      />
    </View>
  );
};

export default QRCode;
