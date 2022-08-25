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
import PreviousColorIcon from '../../assets/icons/previous_color_icon.svg';

const QRCode = ({navigation}) => {
  const HEIGHT = Dimensions.get('window').height;

  const [scan, setScan] = useState(true);
  const [scanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);
  const [solveData, setSolveData] = useState({});

  const {
    roomDispatch,
    roomState: {isChecking},
  } = useContext(GlobalContext);

  const setValueItem = async id => {};

  let scanner = useRef(null);

  const onSuccess = e => {
    const check = e.data.substring(0, 4);

    setScan(false);
    setResult(e);
    setSolveData(JSON.parse(e?.data));
    setScanResult(true);

    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      setResult(e);
      setScan(false);
      setSolveData(JSON.parse(e?.data));
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

        {scanResult && (
          <Fragment>
            <View style={{padding: 20}}>
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
                <PreviousColorIcon width={30} height={30} />
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 30}}>Kết quả</Text>
              </View>
              <View style={result ? styles.scanCardView : styles.cardView}>
                {/* <Text>Type : {result.type}</Text> */}
                <View style={[styles.itemWrapper]}>
                  <Text style={styles.text}>Tên thiết bị : </Text>
                  <Text style={styles.text}>{solveData?.name}</Text>
                </View>
                <View style={[styles.itemWrapper]}>
                  <Text style={styles.text}>Mã thiết bị :</Text>
                  <Text style={styles.text}>{solveData?.code}</Text>
                </View>
                <View style={[styles.itemWrapper]}>
                  <Text style={styles.text}>Mô tả: </Text>
                  <Text style={styles.text}>{solveData?.description}</Text>
                </View>
                <View style={[styles.itemWrapper]}>
                  <Text style={styles.text}>Trạng thái: </Text>
                  <Text style={styles.text}>{solveData?.status}</Text>
                </View>
                <TouchableOpacity
                  onPress={scanAgain}
                  style={[
                    styles.buttonTouchable,
                    {justifyContent: 'center', flexDirection: 'row'},
                  ]}>
                  <Text style={[styles.buttonTextStyle, styles.text]}>
                    Tiếp tục quét mã
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Fragment>
        )}

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
