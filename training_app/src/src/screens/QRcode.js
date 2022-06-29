import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const QRcode = () => {
  return (
    <View style={styles.qrcode}>
      <Image source={require('../../assets/images/QRcode.png')  } />
    </View>
  )
    
}

export default QRcode

const styles = StyleSheet.create({
qrcode:{
  position:'absolute',
  alignItems:'center',
  marginTop:150,
  marginLeft:85
  

}

})