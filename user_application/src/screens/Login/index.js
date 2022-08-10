import React, {useContext, useState} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import styles from './styles';
import {GlobalContext} from '../../context/Provider';
import Input from '../../components/commons/Input';
import UsernameIcon from '../../assets/icons/username_icon.svg';
import PasswordIcon from '../../assets/icons/password_icon.svg';
import BlindEyeIcon from '../../assets/icons/hidePsw.svg';
import EyeIcon from '../../assets/icons/showPsw.svg';
import CustomButton from '../../components/commons/CustomButton';
import globalStyles from '../../../globalStyles';
import login from '../../context/actions/auth/login';

const Login = ({navigation}) => {
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

    const INPUT_FIELDS = 2;
    const isInputLength = Object.values(form).every(
      item => item.trim().length > 0,
    );
    const isFilledAllInputs = Object.values(form).length === INPUT_FIELDS;
    const isNotError = Object.values(errors).every(item => !item);

    if (isInputLength && isFilledAllInputs && isNotError) {
      login(form)(authDispatch);
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
          <Text style={styles.title}>Chào Mừng Tới FiveBees</Text>
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

          <CustomButton
            onPress={onSubmit}
            primary
            title={'Đăng Nhập'}
            loading={loading}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
