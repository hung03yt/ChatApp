import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import {images} from '@images/index';
import {styles} from './LogIn.styles';
import CustomInput from '@components/CustomInput/CustomInput';
import CustomButton from '@components/CustomButton/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '@theme/colors';
import {login} from '@redux/authSlice';
import {useEffect} from 'react';
import {useReveal} from '@hooks/useReveal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {validateEmail, validatePassword} from '@utils/validate';
import ContentLoader from 'react-native-easy-content-loader';
import {setAlert} from '@redux/alertSlice';

const LogIn = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const {passwordVisibility, rightIcon, handlePasswordVisibility} = useReveal();
  const auth = useSelector(state => state.auth);
  const loginError = useSelector(state => state.alert?.loginError);
  const loading = useSelector(state => state.alert?.loading);

  // Log initial auth state
  console.log('Initial auth state:', auth);

  const onLogInPressed = () => {
    if (!email && !password) {
      setErrors({
        ...errors,
        email: 'Please add your email.',
        password: 'Please add your password.',
      });
    } else if (!email) {
      setErrors({...errors, email: 'Please add your email.'});
    } else if (!password) {
      setErrors({...errors, password: 'Please add your password.'});
    }
    if (!errors.email && !errors.password) {
      console.log('Dispatching login action with:', {email, password});
      dispatch(login({email, password}))
        .unwrap()
        .then(result => {
          console.log('Login successful:', result);
        })
        .catch(error => {
          console.log('Login error:', error);
        });
    }
  };

  useEffect(() => {
    dispatch(setAlert({type: 'login', msg: ''}));
    console.log('Updated auth state:', auth);
    if (auth?.token) {
      console.log('Navigating to Home');
      navigation.navigate('Home');
    }
  }, [auth]);

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignInFacebook = () => {};

  const onSignInGoogle = () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(e => console.log(e));
  };

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  const validate = {
    email: function (email) {
      if (!email) {
        setErrors({...errors, email: 'Please do not leave the email empty.'});
      } else if (!validateEmail(email)) {
        setErrors({...errors, email: 'Invalid email, please enter again.'});
      } else {
        setErrors({...errors, email: ''});
      }
    },
    password: function (password) {
      if (!password) {
        setErrors({...errors, password: 'Please fill in the password.'});
      } else if (!validatePassword(password)) {
        setErrors({
          ...errors,
          password: 'Password must be at least 8 characters long.',
        });
      } else {
        setErrors({...errors, password: ''});
      }
    },
};

  return (
    <ScrollView>
      <View
        style={{
          paddingTop: 12,
        }}>
        <ContentLoader
          loading={false}
          active
          tHeight={40}
          tWidth={390}
          pRows={2}
          pWidth={[390, 390]}
          pHeight={[130, 350]}>
          <View style={styles.container}>
            <Image
              source={images.Logo}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.text}>Welcome to ChitChat</Text>

            <CustomInput
              placeholder="Email"
              value={email}
              setValue={text => {
                setEmail(text);
              }}
              handleBlur={e => {
                validate.email(e.nativeEvent.text);
              }}
            />

            {errors.email ? (
              <Text style={{color: '#ff3333', alignSelf: 'flex-start'}}>
                {errors.email}
              </Text>
            ) : null}

            <View style={styles.inputContainer}>
              <CustomInput
                placeholder="Password"
                value={password}
                setValue={text => {
                  setPassword(text);
                }}
                handleBlur={e => {
                  validate.password(e.nativeEvent.text);
                }}
                secureTextEntry={passwordVisibility ? true : false}
              />
              {password ? (
                <Pressable
                  style={styles.reveal}
                  onPress={handlePasswordVisibility}>
                  <Ionicons name={rightIcon} size={22} color="#232323" />
                </Pressable>
              ) : null}
            </View>

            {errors.password ? (
              <Text
                style={{
                  color: '#ff3333',
                  alignSelf: 'flex-start',
                  marginBottom: 10,
                }}>
                {errors.password}
              </Text>
            ) : null}

            {loginError ? (
              <Text
                style={{
                  backgroundColor: '#ffa00a',
                  color: '#fff',
                  borderRadius: 10,
                  padding: 10,
                  marginVertical: 10,
                }}>
                {loginError}
              </Text>
            ) : null}

            <CustomButton onPress={onLogInPressed} text="Login" />

            <CustomButton
              onPress={onSignInGoogle}
              text="Login with Google"
              bgColor={colors.redColor}
            />

            <CustomButton
              onPress={onForgotPasswordPressed}
              text="Forgot Password?"
              type="TERTIARY"
            />

            <CustomButton
              onPress={onSignUp}
              text="Don't have an account? Sign up"
              type="TERTIARY"
              fgColor={colors.secondColor}
            />
          </View>
        </ContentLoader>
      </View>
    </ScrollView>
  );
};

export default LogIn;
