import React, {useContext, useState} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import styles from './styles';
import {GlobalContext} from '../../context/Provider';
import Input from '../../components/commons/Input';
import UsernameIcon from '../../assets/icons/username_icon.svg';
import PasswordIcon from '../../assets/icons/password_icon.svg';
import BlindEyeIcon from '../../assets/icons/hidePsw.svg';
import MailIcon from '../../assets/icons/mail.svg';
import EyeIcon from '../../assets/icons/showPsw.svg';
import CustomButton from '../../components/commons/CustomButton';
import globalStyles from '../../../globalStyles';
import register from '../../context/actions/auth/register';
import {LOGIN} from '../../constants/routeNames';

const Register = ({navigation}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const {
    authDispatch,
    authState: {loading},
  } = useContext(GlobalContext);

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
    if (value !== '') {
      setErrors(prevState => {
        return {...prevState, [name]: null};
      });
    }
  };

  const onSubmit = () => {
    // validations
    if (!form.username) {
      setErrors(prevState => {
        return {...prevState, username: 'This field is required'};
      });
    }
    if (!form.password) {
      setErrors(prevState => {
        return {...prevState, password: 'This field is required'};
      });
    }
    if (!form.email) {
      setErrors(prevState => {
        return {...prevState, email: 'This field is required'};
      });
    }

    if (!form.password_confirmation) {
      setErrors(prevState => {
        return {...prevState, password_confirmation: 'This field is required'};
      });
    }

    const INPUT_FIELDS = 4;
    const isInputLength = Object.values(form).every(
      item => item.trim().length > 0,
    );
    const isFilledAllInputs = Object.values(form).length === INPUT_FIELDS;
    const isNotError = Object.values(errors).every(item => !item);

    if (isInputLength && isFilledAllInputs && isNotError) {
      register(form)(authDispatch);
    }
  };

  return (
    <View>
      <ScrollView style={globalStyles.container}>
        <Image
          style={[styles.logoImage]}
          source={require('../../assets/images/logo.png')}
        />
        <View>
          <Text style={styles.title}>Đăng ký</Text>
          <Input
            label="Username"
            onChangeText={value => {
              onChange({name: 'username', value});
            }}
            placeholder="Tên đăng nhập"
            logo={<UsernameIcon style={styles.iconSgv} />}
            iconPosition="left"
            error={errors.username}
          />

          <Input
            label="Email"
            onChangeText={value => {
              onChange({name: 'email', value});
            }}
            placeholder="Tên đăng nhập"
            logo={<MailIcon style={styles.iconSgv} />}
            iconPosition="left"
            error={errors.email}
          />

          <Input
            label="Password"
            placeholder="Mật khẩu"
            logo={<PasswordIcon />}
            icon={
              <TouchableOpacity
                onPress={value => {
                  setIsSecureEntry(prevState => !prevState);
                }}>
                <Text>{isSecureEntry ? <BlindEyeIcon /> : <EyeIcon />}</Text>
              </TouchableOpacity>
            }
            onChangeText={value => {
              onChange({name: 'password', value});
            }}
            secureTextEntry={isSecureEntry}
            iconPosition="right"
            error={errors.password}
          />

          <Input
            label="Password_confirmation"
            placeholder="Nhập lại mật khẩu"
            logo={<PasswordIcon />}
            icon={
              <TouchableOpacity
                onPress={value => {
                  setIsSecureEntry(prevState => !prevState);
                }}>
                <Text>{isSecureEntry ? <BlindEyeIcon /> : <EyeIcon />}</Text>
              </TouchableOpacity>
            }
            onChangeText={value => {
              onChange({name: 'password_confirmation', value});
            }}
            secureTextEntry={isSecureEntry}
            iconPosition="right"
            error={errors.password_confirmation}
          />

          <CustomButton
            onPress={onSubmit}
            primary
            title={'Đăng Ký'}
            loading={loading}
            disabled={loading}
          />

          <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                width: 200,
                flexDirection: 'row-reverse',
                height: 100,
              }}
              onPress={() => {
                navigation.navigate(LOGIN);
              }}>
              <Text>Quay lại đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
