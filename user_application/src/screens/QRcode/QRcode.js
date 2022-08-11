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

const QRCode = () => {
  const HEIGHT = Dimensions.get('window').height;

  const [scan, setScan] = useState(true);
  const [scanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);

  const {
    roomDispatch,
    roomState: {isChecking},
  } = useContext(GlobalContext);

  useEffect(() => {
    const id = result?.data ? JSON.parse(result?.data) : undefined;
    console.log('isChecking,isChecking', isChecking);
    if (id) {
      getRoom(id)(roomDispatch)(() => {
        console.log('thành công rùi');
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

        {scanResult && (
          <Fragment>
            <View style={{paddingHorizontal: 15}}>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginVertical: 20,
                }}>
                <Text style={{fontSize: 30}}>Kết quả:</Text>
              </View>
              <View
                style={[scanResult ? styles.scanCardView : styles.cardView]}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignSelf: 'center',
                      marginRight: 30,
                    }}>
                    <Text>Hình ảnh : </Text>
                  </View>
                  <Image
                    source={{uri: result.data?.photos?.[0]}}
                    style={{width: 200, height: 200}}
                  />
                </View>
                <View style={{marginTop: 20}}>
                  <View style={styles.contentTitle}>
                    <Text>Tên : </Text>
                  </View>
                  <View style={styles.contentTitle}>
                    <Text>Mô tả : </Text>
                  </View>
                  <View style={styles.contentTitle}>
                    <Text>Trạng thái : </Text>
                  </View>
                  <View style={styles.contentTitle}>
                    <Text>Vị trí : </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={scanAgain}
                  style={[
                    styles.buttonTouchable,
                    {justifyContent: 'center', flexDirection: 'row'},
                  ]}>
                  <Text style={styles.buttonTextStyle}>Tiếp tục quét mã</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Fragment>
        )}

        {scan && (
          <View style={{flex: 1}}>
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
