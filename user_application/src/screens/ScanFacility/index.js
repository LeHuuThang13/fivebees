import colors from '../../assets/themes/colors';
import React, {
  Component,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  TouchableOpacity,
  Text,
  Linking,
  View,
  Dimensions,
  Image,
} from 'react-native';
import styles from './styles';
import getRoom from '../../context/actions/room/getRoom';
import {GlobalContext} from '../../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HOME} from '../../constants/routeNames';
import PreviousIcon from '../../assets/icons/previous_icon';

const QRCode = ({navigation}) => {
  const HEIGHT = Dimensions.get('window').height;

  const [scan, setScan] = useState(true);
  const [scanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);

  const {
    roomDispatch,
    roomState: {isChecking},
  } = useContext(GlobalContext);

  const setValueItem = async id => {};

  useEffect(() => {
    const id = result?.data ? JSON.parse(result?.data) : undefined;
    if (id) {
      getRoom(id)(roomDispatch)(() => {
        setValueItem();
      });
    }
  }, [result]);
  let scanner = useRef(null);

  const onSuccess = e => {
    const check = e.data.substring(0, 4);

    setScan(false);
    setResult(e);
    setScanResult(true);

    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      setResult(e);
      setScan(false);
      setScanResult(true);
    }
  };

  const activeQR = () => {
    setScan(true);
  };

  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };

  return (
    <View style={{}}>
      <Fragment>
        {!scan && !scanResult && (
          <View style={styles.cardView}>
            <TouchableOpacity
              onPress={activeQR}
              style={{backgroundColor: colors.bg_primary, padding: 20}}>
              <Text style={{color: colors.white}}>Click to Scan !</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* {ScanResult && (
            <Fragment>
              <View style={{justifyContent: 'center'}}>
                <Text style={{}}>Result !</Text>
              </View>
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text>Type : {result.type}</Text>
                <Text>Result : {result.data}</Text>
                <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                <TouchableOpacity
                  onPress={this.scanAgain}
                  style={styles.buttonTouchable}>
                  <Text style={styles.buttonTextStyle}>
                    Click to Scan again!
                  </Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          )} */}

        {scan && (
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 100,
                marginLeft: 20,
                marginTop: 20,
              }}
              onPress={() => {
                navigation.navigate(HOME);
              }}>
              <PreviousIcon width={30} height={30} />
            </TouchableOpacity>
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={node => {
                scanner = node;
              }}
              onRead={onSuccess}
              cameraStyle={{height: HEIGHT}}
            />
          </View>
        )}
      </Fragment>
    </View>
  );
};

export default QRCode;
