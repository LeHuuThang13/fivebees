import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const InputButton = ({onPress,text}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

export default InputButton

const styles = StyleSheet.create({
container:{
    backgroundColor: '#e8eaf6',
    padding: 15,
    marginVertical:5, 
},

text:{
    paddingLeft: 205
},

})