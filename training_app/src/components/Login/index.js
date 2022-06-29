import {View, Text, Image, TouchableOpacity} from 'react-native';
import Input from '../common/Input';
import CustomButton from '../common/CustomButton';
import React from 'react';
import Container from '../common/Container';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {REGISTER} from '../../constants/routeNames';

const LoginComponent = () => {
  const {navigate} = useNavigation();
  return (
    <Container>
      <Image
        style={styles.logoImage}
        source={require('../../assets/images/logo.png')}
      />

      <View>
        <Text style={styles.title}>Welcome to RNContacts</Text>
        <Text style={styles.subTitle}>Please login here</Text>

        <View style={styles.form}>
          <Input label="Usename" placeholder="Enter Username" />
          <Input
            label="Password"
            placeholder="Password"
            icon={<Text>SHOW</Text>}
            secureTextEntry={true}
            iconPosition="right"
          />
        </View>
      </View>
      <CustomButton title="Submit" primary />

      <View style={styles.createSection}>
        <Text style={styles.infoText}>Need a new account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigate(REGISTER);
          }}>
          <Text style={styles.linkBtn}>Register</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default LoginComponent;
