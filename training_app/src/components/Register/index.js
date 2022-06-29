import {View, Text, Image, TouchableOpacity} from 'react-native';
import Input from '../common/Input';
import CustomButton from '../common/CustomButton';
import React from 'react';
import Container from '../common/Container';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {LOGIN} from '../../constants/routeNames';

const RegisterComponent = (props) => {
  const {onSubmit, onChange, form, errors, error, loading} = props;

  const {navigate} = useNavigation();
  return (
    <Container>
      <Image
        style={styles.logoImage}
        source={require('../../assets/images/logo.png')}
      />

      <View>
        <Text style={styles.title}>Welcome to RNContacts</Text>
        <Text style={styles.subTitle}>Create a free account</Text>
        <View style={styles.form}>
          {error && <Text>{error}</Text>}
          <Input
            label="Username"
            placeholder="Enter Username"
            onChangeText={(value) => onChange({name: 'userName', value})}
            error={errors.userName}
          />
          <Input
            label="First name"
            placeholder="Enter First name"
            onChangeText={(value) => onChange({name: 'firstName', value})}
            error={errors.firstName}
          />
          <Input
            label="Last name"
            placeholder="Enter Last name"
            onChangeText={(value) => onChange({name: 'lastName', value})}
            error={errors.lastName}
          />
          <Input
            label="Email"
            placeholder="Enter Email"
            onChangeText={(value) => onChange({name: 'email', value})}
            error={errors.email}
          />
          <Input
            label="Password"
            placeholder="Password"
            icon={<Text>SHOW</Text>}
            secureTextEntry={true}
            iconPosition="right"
            onChangeText={(value) => onChange({name: 'password', value})}
            error={errors.password}
          />
        </View>
      </View>
      <CustomButton
        loading={loading}
        disabled={loading}
        onPress={onSubmit}
        title="Submit"
        primary
      />

      <View style={styles.createSection}>
        <Text style={styles.infoText}>Already have account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigate(LOGIN);
          }}>
          <Text style={styles.linkBtn}>Login</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default RegisterComponent;
