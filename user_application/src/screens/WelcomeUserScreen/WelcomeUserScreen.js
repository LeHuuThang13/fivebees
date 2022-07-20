import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import React, { useState } from 'react'

const WelcomeUserScreen = () => {
    const [show, setShow]= useState(false)
  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" animating={false}/>
        <Text style={styles.text} >WELCOME </Text>
        <Text style={styles.text} > TO </Text>
        <Text style={styles.text} >FIVE BEES</Text>
    </View>
  )
}

export default WelcomeUserScreen

const styles = StyleSheet.create({
container:{
    backgroundColor:'#80deea',
    width:'100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
},
text: {
    backgroundColor: 'transparent',
    fontSize: 70,
    fontWeight: "bold",
    color: '#fff',
    
  },

})