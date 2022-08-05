import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/themes/colors';
import IconMenu from '../../assets/icons/menu_icon.svg';
import Container from '../../components/common/Container';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import React, {Component, Fragment} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import PreviousIcon from '../../assets/icons/previous_icon';
import {TouchableOpacity, Text, Linking, View, Dimensions} from 'react-native';
import {HOME_NAVIGATOR} from '../../constants/routeNames';

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
    console.log('scanned data' + check);
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

          {ScanResult && (
            <Fragment>
              <Text style={styles.textTitle1}>Result !</Text>
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
                // bottomContent={
                //   <View>
                //     <TouchableOpacity
                //       style={styles.buttonTouchable}
                //       onPress={() => this.scanner.reactivate()}>
                //       <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                //     </TouchableOpacity>
                //   </View>
                // }
              />
            </View>
          )}
        </Fragment>
      </View>
    );
  }
}

export default Scan;
