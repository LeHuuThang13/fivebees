import React, {useState} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import Input from '../common/Input';
import CustomButton from '../CustomButton';
import styles from './styles';
import IconUsernameSvg from '../../assets/icons/username_icon.svg';
import IconPswSgv from '../../assets/icons/password_icon.svg';
import IconShowPsw from '../../assets/icons/showPsw.svg';
import IconHidePsw from '../../assets/icons/hidePsw.svg';
import CustomButtomOpacityText from '../CustomButtomOpacityText';

const index = ({onChangeText, style, value}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
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
  };
  return (
    <View>
      <Image
        style={[styles.logoImage]}
        source={require('../../assets/images/logo.png')}
      />

      <View>
        <Text style={styles.title}>Welcome to FiveBees</Text>
        <Input
          label="Username"
          onChangeText={value => {
            onChange({name: 'username', value});
          }}
          placeholder="Tên đăng nhập"
          logo={<IconUsernameSvg style={styles.iconSgv} />}
          iconPosition="left"
          error={errors.username}
        />

        <Input
          label="Password"
          placeholder="Mật khẩu"
          logo={<IconPswSgv />}
          icon={
            <TouchableOpacity
              onPress={value => {
                setIsSecureEntry(prevState => !prevState);
              }}>
              <Text>{isSecureEntry ? <IconHidePsw /> : <IconShowPsw />}</Text>
            </TouchableOpacity>
          }
          onChangeText={value => {
            onChange({name: 'password', value});
          }}
          secureTextEntry={isSecureEntry}
          iconPosition="right"
          error={errors.password}
        />

        <View style={{flexDirection: 'row-reverse'}}>
          <CustomButtomOpacityText
            title={'Quên mật khẩu?'}
            styleBtn={{
              height: 20,
              zIndex: 2,
            }}
          />
        </View>

        <CustomButton
          onPress={onSubmit}
          primary
          title={'Đăng Nhập'}
          // loading={true}
          // disabled={true}
        />
      </View>
    </View>
  );
};

export default index;
