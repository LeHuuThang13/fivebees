import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const LoginInput = ({value, setValue, placeholder,secureTextEntry}) => {
    return (
        <View > 
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.input}
            secureTextEntry ={secureTextEntry}
            
            />
        </View>
    )
}

export default LoginInput

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#7F8C8D',
        marginVertical: 10,
        paddingLeft: '15%',
        fontSize:15,
        color:'black',
        fontWeight:'bold',
        borderRadius:5
    }
})