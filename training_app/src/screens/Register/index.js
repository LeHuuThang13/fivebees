import React, {useContext, useEffect, useState} from 'react';
import RegisterComponent from '../../components/Register';
import register from '../../context/actions/auth/register';
import {GlobalContext} from '../../context/Provider';
import axiosInstance from '../../helpers/axiosInterceptor';

const Register = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const {
    authDispatch,
    authState: {data, error, loading},
  } = useContext(GlobalContext);

  console.log(error);

  useEffect(() => {
    axiosInstance.post('/contacts').catch((error) => {
      console.log('err: >>', error);
    });
  }, []);

  const onChange = ({name, value}) => {
    setForm({
      ...form,
      [name]: value,
    });

    if (value !== '') {
      if (name === 'password') {
        if (value.length < 6) {
          setErrors((prevState) => {
            //[name] : value === password : value
            //name : value === name : value
            return {...prevState, [name]: 'Password must be larger than 6'};
          });
        } else {
          setErrors((prevState) => {
            // the reason why I use null instead of empty string ''
            // https://github.com/facebook/react-native/issues/29980
            return {...prevState, [name]: null};
          });
        }
      } else {
        setErrors((prevState) => {
          // the reason why I use null instead of empty string ''
          // https://github.com/facebook/react-native/issues/29980
          return {...prevState, [name]: null};
        });
      }
    } else {
      setErrors((prevState) => {
        return {...prevState, [name]: 'This field is required'};
      });
    }
  };

  const onSubmit = () => {
    if (!form.userName) {
      setErrors((prevState) => {
        return {...prevState, userName: 'This field is required'};
      });
    }
    if (!form.firstName) {
      setErrors((prevState) => {
        return {...prevState, firstName: 'This field is required'};
      });
    }
    if (!form.lastName) {
      setErrors((prevState) => {
        return {...prevState, lastName: 'This field is required'};
      });
    }
    if (!form.email) {
      setErrors((prevState) => {
        return {...prevState, email: 'This field is required'};
      });
    }
    if (!form.password) {
      setErrors((prevState) => {
        return {...prevState, password: 'This field is required'};
      });
    }

    const isValidLength = Object.values(form).every(
      (item) => item.trim().length > 0,
    );
    const numberOfField = 5;
    const arrInputLength = Object.values(form).length;
    // Item has emtry string return false
    const isError = Object.values(errors).every((item) => !item);

    if (isValidLength && arrInputLength === numberOfField && isError) {
      register(form)(authDispatch);
    }
  };

  return (
    <RegisterComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
      // error={error}
      loading={loading}
    />
  );
};

export default Register;
