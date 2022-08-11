import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/themes/colors';
import IconMenu from '../../assets/icons/menu_icon.svg';
import Container from '../../components/common/Container';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import React, {Component, Fragment} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import PreviousIcon from '../../assets/icons/previous_icon';
import {
  TouchableOpacity,
  Text,
  Linking,
  View,
  Dimensions,
  Image,
} from 'react-native';
import {HOME_NAVIGATOR} from '../../constants/routeNames';
import styles from './styles';

class Scan extends Component {
  HEIGHT = Dimensions.get('window').height;

  constructor(props) {
    super(props);
    this.state = {
      scan: true,
      ScanResult: false,
      result: null,
    };
  }

  onSuccess = e => {
    const check = e.data.substring(0, 4);
    this.setState({
      result: e,
      scan: false,
      ScanResult: true,
    });
    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      this.setState({
        result: e,
        scan: false,
        ScanResult: true,
      });
    }
  };

  activeQR = () => {
    this.setState({
      scan: true,
    });
  };
  scanAgain = () => {
    this.setState({
      scan: true,
      ScanResult: false,
    });
  };

  render() {
    const {scan, ScanResult, result} = this.state;

    console.log(result?.data);

    return (
      <View style={{}}>
        <Fragment>
          {!scan && !ScanResult && (
            <View style={styles.cardView}>
              <TouchableOpacity
                onPress={this.activeQR}
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

          {ScanResult && (
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
                  style={[ScanResult ? styles.scanCardView : styles.cardView]}>
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
                    onPress={this.scanAgain}
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
                  this.props.navigation.navigate(HOME_NAVIGATOR);
                }}>
                <PreviousIcon width={30} height={30} />
              </TouchableOpacity>
              <QRCodeScanner
                reactivate={true}
                showMarker={true}
                ref={node => {
                  this.scanner = node;
                }}
                onRead={this.onSuccess}
                cameraStyle={{height: this.HEIGHT}}
              />
            </View>
          )}
        </Fragment>
      </View>
    );
  }
}

export default Scan;
