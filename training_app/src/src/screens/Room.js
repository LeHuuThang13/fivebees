import { StyleSheet, Text, View,FlatList,TouchableOpacity, Button ,SafeAreaView,ScrollView} from 'react-native'
import React from 'react'
import ManagementRoom from './MangementRoom'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Stack = createNativeStackNavigator();

const onMangamentRoomPress=() =>{
  navigation.navigate('QRCode')
}

const Room = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='demo' component={Demo} options={{headerShown: false}}/>
      <Stack.Screen name='demo1' component={Demo1}/>
    </Stack.Navigator>
  )
}

const Demo = ({ navigation }) => {
  return (
    <SafeAreaView>
      
    <View >
      <Icon name='search' size={26} style={{top:10}}/>
      <ScrollView>
    <View style={{marginLeft:3,backgroundColor:'white'}}>
    <View style={{flex:1, backgroundColor:'white',height:180,position: 'absolute',
     marginVertical:8,borderRadius:5,borderWidth:2,borderColor:'#e0e0e0'
     ,shadowColor: "#000", shadowOpacity: 0.29, shadowRadius: 4.65,elevation: 7,top:10}}>
        <View style={{borderWidth:1,borderColor:'#e0e0e0',height:40, flexDirection:'row'}}>
          <Text style={{fontSize:20,left:5,color:'blue',fontWeight:'bold'}}>Phòng 101</Text>
          <Text style={{marginLeft:80,top:5,fontWeight:'bold',fontSize:15}}>Trình trạng:</Text>
          <Text style={{marginLeft:10,top:5,fontWeight:'bold',fontSize:15,color:'green'}}>Đang sử dụng</Text>
        </View>
       
       <View  style={{top:15}}>
        <Text 
        style={{fontSize:15,color:'grey',marginLeft:40,top:3,left:5, fontWeight:'bold'}}>
        Thống thiết bị: 10
        </Text>
        <Icon name='devices' size={26} style={{left:10,top:-20,bottom:18}}/>
        <Text 
        style={{fontSize:15,color:'grey',marginLeft:40,top:-20,fontWeight:'bold',left:5}}>
        Thiết bị hư hỏng: 0
        </Text>
        <Icon name='dangerous' size={26} style={{left:10,top:-40,bottom:18}}/>
       </View>
        
        <TouchableOpacity 
        onPress={() => navigation.navigate('Mangement')} style={styles.Managementbutton}
        >
          
          <Text style={{fontSize:16,color:'white',marginLeft:25,top:5 }}>
            Quản lí thiết bị
            
          </Text>
          <Icon name='settings' size={26} style={{right:55,bottom:18, color:'white'}}/>
        </TouchableOpacity>
        
    </View>
    </View >

    <View style={{marginTop:200}}>
    <View style={{marginLeft:3}}>
    <View style={{flex:1, backgroundColor:'white',height:180,position: 'absolute',
     marginVertical:8,borderRadius:5,borderWidth:2,borderColor:'#e0e0e0'
     ,shadowColor: "#000", shadowOpacity: 0.29, shadowRadius: 4.65,elevation: 7,top:10}}>
        <View style={{borderWidth:1,borderColor:'#e0e0e0',height:40, flexDirection:'row'}}>
          <Text style={{fontSize:20,left:5,color:'blue',fontWeight:'bold'}}>Phòng 102</Text>
          <Text style={{marginLeft:80,top:5,fontWeight:'bold',fontSize:15}}>Trình trạng:</Text>
          <Text style={{marginLeft:10,top:5,fontWeight:'bold',fontSize:15,color:'green'}}>Đang sử dụng</Text>
        </View>
       
       <View  style={{top:15}}>
        <Text 
        style={{fontSize:15,color:'grey',marginLeft:40,top:3,left:5, fontWeight:'bold'}}>
        Thống thiết bị: 10
        </Text>
        <Icon name='devices' size={26} style={{left:10,top:-20,bottom:18}}/>
        <Text 
        style={{fontSize:15,color:'grey',marginLeft:40,top:-20,fontWeight:'bold',left:5}}>
        Thiết bị hư hỏng: 0
        </Text>
        <Icon name='dangerous' size={26} style={{left:10,top:-40,bottom:18}}/>
       </View>
        
        <TouchableOpacity 
        onPress={() => navigation.navigate('Mangement')} style={styles.Managementbutton}
        >
          
          <Text style={{fontSize:16,color:'white',marginLeft:25,top:5 }}>
            Quản lí thiết bị
            
          </Text>
          <Icon name='settings' size={26} style={{right:55,bottom:18, color:'white'}}/>
        </TouchableOpacity>
        
    </View>
    </View >
    </View>
    
    <View style={{marginTop:200}}>
    <View style={{marginLeft:3}}>
    <View style={{flex:1, backgroundColor:'white',height:180,position: 'absolute',
     marginVertical:8,borderRadius:5,borderWidth:2,borderColor:'#e0e0e0'
     ,shadowColor: "#000", shadowOpacity: 0.29, shadowRadius: 4.65,elevation: 7,top:10}}>
        <View style={{borderWidth:1,borderColor:'#e0e0e0',height:40, flexDirection:'row'}}>
          <Text style={{fontSize:20,left:5,color:'blue',fontWeight:'bold'}}>Phòng 103</Text>
          <Text style={{marginLeft:80,top:5,fontWeight:'bold',fontSize:15}}>Trình trạng:</Text>
          <Text style={{marginLeft:10,top:5,fontWeight:'bold',fontSize:15,color:'green'}}>Đang sử dụng</Text>
        </View>
       
       <View  style={{top:15}}>
        <Text 
        style={{fontSize:15,color:'grey',marginLeft:40,top:3,left:5, fontWeight:'bold'}}>
        Thống thiết bị: 10
        </Text>
        <Icon name='devices' size={26} style={{left:10,top:-20,bottom:18}}/>
        <Text 
        style={{fontSize:15,color:'grey',marginLeft:40,top:-20,fontWeight:'bold',left:5}}>
        Thiết bị hư hỏng: 0
        </Text>
        <Icon name='dangerous' size={26} style={{left:10,top:-40,bottom:18}}/>
       </View>
        
        <TouchableOpacity 
        onPress={() => navigation.navigate('Mangement')} style={styles.Managementbutton}
        >
          
          <Text style={{fontSize:16,color:'white',marginLeft:25,top:5 }}>
            Quản lí thiết bị
            
          </Text>
          <Icon name='settings' size={26} style={{right:55,bottom:18, color:'white'}}/>
        </TouchableOpacity>
        
    </View>
    </View >
    </View>
    </ScrollView>
   </View>
   </SafeAreaView>
  )
}

const Demo1 = () => {
  return (
    <View>

    </View>
  )
}

export default Room

const styles = StyleSheet.create({
Managementbutton :{
  alignItems:'center',
    width:140,
    height:35,
    marginLeft:260,
    backgroundColor: '#2196f3' ,
    bottom:10,
    right:10
    ,fontWeight:'bold',
    borderRadius:8
    
    
    
}

})