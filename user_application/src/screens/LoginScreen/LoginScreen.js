import { StyleSheet, Text, TextInput, View,TouchableOpacity,Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
  const onLoginPress=() =>{
    navigation.replace('Home')
}
  
  const AcceptPress= () =>{
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tên người thuê phòng</Text>
      <View style={styles.placeholderinput}>
        <TextInput placeholder='Nhập tên ở đây' style={{fontSize:17}}/>
        <Icon name='account-box' size={30} style={{position:'absolute', left:20,bottom:8,color:'#3B71F3'}} />
      </View>
      <View style={styles.buttoncontainer}>
        {/* <Text style={styles.button}>Xác nhận</Text> */}
        <TouchableOpacity
        onPress={onLoginPress}
        >
          <Text style={styles.text}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        width:'100%',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text :{
        fontSize:17,
        fontWeight: "bold",
        color:'black'
    },
    placeholderinput:{
        borderColor:'#e8e8e8',
        borderWidth:1.5,
        borderRadius:5,
        width:280,
        top:26 ,
        paddingHorizontal:50
    },
    buttoncontainer:{
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:50,
      backgroundColor:'#3B71F3',
      width:280,
      height: 46
    },
    button:{
      fontSize:14,
        fontWeight: "bold",
        color:'#fff'
    }
})