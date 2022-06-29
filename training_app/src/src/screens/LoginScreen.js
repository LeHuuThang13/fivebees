import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import LoginInput from '../components/LoginInput'
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginButton from '../components/LoginButton';


const LoginScreen = ({ navigation }) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fogotPassword = () =>{
   
  }
  const onLoginPress=() =>{
      navigation.replace('Home')
  }
  return (
    
    <View style={styles.container}>
      <View style={styles.position}>
        <Image source={require('../../assets/images/logo.png') } />
      </View>
      
      <Icon name ='account-circle' size={30} style={styles.iconUser}/>
        <LoginInput 
        
        placeholder="Tên đăng nhập" 
        value={username}
        setValue = {setUsername} />
        <Icon name ='vpn-key' size={30} style={styles.iconpassword}/>
        <LoginInput 
        placeholder="Mật khẩu" 
        value={password} 
        setValue={setPassword}
        secureTextEntry={true} />
        
        <View>
       
        <TouchableOpacity
        style={styles.buttonForget}
        >
          <Text style={[styles.text, styles.forget]}>Quên mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={onLoginPress}
        style={styles.loginbutton}
        >
          <Text style={styles.text}>Đăng nhập</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 50,
    borderRadius:5
  },
  username: {
    marginVertical: 35,
    
  },
  iconUser: {
    position: 'absolute',
    top: 253,
    left: 5
  },
  iconpassword: {
    position: 'absolute',
    top: 320,
    left: 5
  },
  loginbutton:{
    alignItems:'center',
    marginTop:15,
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius:8
  },
  buttonForget: {
    alignItems:'flex-end',
    backgroundColor:'#F5F5F5',
    borderWidth:1,
    borderLeftColor:'white',
    borderRightColor:'white',
    borderTopColor:'white',
    width:110,left:242
    
  },
  text:{
    color:'black',
    fontSize:15,
    fontWeight:'bold'
    
  },
  forget:{
    textDecorationLine:'underline',
    borderEndColor:'black'
  }
})