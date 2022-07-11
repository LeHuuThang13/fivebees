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
      marginHorizontal: -6,
    },
  });

  const onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };

  return (
    <Container>
      <QRCodeScanner
        onRead={onSuccess}
        topContent={
          <Text>
            Go to <Text>wikipedia.org/wiki/QR_code</Text> on your computer and
            scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity>
            <Text>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    </Container>
  );
};

export default QRCode;
