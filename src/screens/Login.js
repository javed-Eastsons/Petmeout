import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Button,
  Alert
} from 'react-native';
import { LoginUser } from '../Redux/Actions/Petmeout';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { TextInput } from 'react-native-gesture-handler';
import { TextInput } from "react-native-paper";
import messaging from '@react-native-firebase/messaging';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Loader } from '../Component/Loader';
import RadioButtonRN from 'radio-buttons-react-native';
import FbLogin from '../Component/FbLogin';
import GoogleLogin from '../Component/GoogleLogin';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  // const bgImage = require('../Assets/img/login-mainbg.jpg');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('')
  console.log(email, pass, 'value')
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    }
    if (!pass) {
      newErrors.pass = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const data = [
    {
      label: 'Remember me'
    },

  ];
  const onLogin = async () => {
    const fcmToken = await messaging().getToken()
    console.log(fcmToken, 'fcmTokenfcmToken')

    if (validate()) {
      setLoader(true);
      if (email && pass) {
        // navigation.navigate('Auth');

        dispatch(LoginUser(email, pass, fcmToken, navigation));
        setEmail('')
        setPass('')

      } else {
        Alert.alert('Please Enter Email Address')
      }

      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  };



  const image = require('../Assets/images/BG7.jpg');
  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.bgImage}>
          <Loader flag={loader} />
          <Image
            source={require('../Assets/img/petmeout.png')}
            resizeMode='contain'
            style={styles.profileImg}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: '90%', alignSelf: 'center' }}>
            <View style={{ height: 50, backgroundColor: '#fbd349', width: '55%', borderTopLeftRadius: 25, borderBottomLeftRadius: 25 }}>
              <Text style={{ color: '#000', fontSize: 14, marginTop: 15, textAlign: 'center', fontFamily: 'Poppins-Regular' }}>Sign in</Text>

            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ height: 50, backgroundColor: '#e5e5e5', width: 160, borderTopRightRadius: 25, borderBottomRightRadius: 25 }}>
              <Text style={{ color: '#000', fontSize: 14, marginTop: 15, textAlign: 'center', fontFamily: 'Poppins-Regular' }}>Sign up</Text>

            </TouchableOpacity>
          </View>
          {/* <View style={styles.btn}>
          <Text style={{ fontSize: 20, color: '#000', fontWeight: '600', borderBottomWidth: 2, borderBottomColor: '#ec4390', width: 65 }}>Sign In</Text>

        </View> */}
          <View style={{ backgroundColor: '#fff', borderRadius: 20, width: '90%', alignSelf: 'center', marginTop: 20, elevation: 10 }}>
            <View style={{ marginTop: 40 }}>
              <Text style={{ color: '#000', marginLeft: 20, marginBottom: 10, fontWeight: '500' }}>Email</Text>
              <TextInput
                autoCompleteType="email"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                textContentType="emailAddress"
                placeholder="Enter Email Id"
                value={email}
                placeholderTextColor={'gray'}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
              {errors.email && <Text style={[styles.error]}>{errors.email}</Text>}

              <Text style={{ color: '#000', marginLeft: 20, marginBottom: 10, fontWeight: '500', marginTop: 10 }}>Password</Text>
              <TextInput
                secureTextEntry
                autoCompleteType="password"
                placeholder="Password"
                placeholderTextColor={'gray'}
                underlineColorAndroid="transparent"
                textContentType="password"
                value={pass}
                onChangeText={(text) => setPass(text)}
                style={styles.input}
              />
              {errors.pass && <Text style={[styles.error]}>{errors.pass}</Text>}

            </View>

            <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop: 20 }}>
              <View style={{ width: '61%' }}>
                {/* <RadioButtonRN
                  data={data}
                  box={false}
                  circleSize={12}
                  textStyle={{ color: '#000', fontSize: 13 }}
                  selectedBtn={(e) => console.log(e)}
                /> */}
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={{ marginTop: 10, fontFamily: 'Poppins-Regular', fontSize: 12, marginLeft: 10 }}>Forget Password?</Text>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={{ marginTop: 10, fontFamily: 'Poppins-Regular', fontSize: 12, marginLeft: 10 }}>Forget Password?</Text>
              </TouchableOpacity> */}

            </View>


            <View style={styles.btn}>
              <Button title="Sign In" color={'#fbd349'} onPress={onLogin} />

            </View>
          </View>
          <View />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, width: '90%', alignSelf: 'center' }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            <View>
              <Text style={{ width: 50, textAlign: 'center', fontFamily: 'Poppins-Regular', color: '#000' }}>OR</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          </View>
          {/* <GoogleLogin/> */}
          <View style={styles.btn1}>

            <FbLogin />

            <View style={{ height: 40, backgroundColor: '#dd4b39', marginBottom: 10, flexDirection: 'row', justifyContent: 'center', borderRadius: 20 }}>
              <Image
                source={require('../Assets/googleIcon.png')}
                style={[styles.iconsLogin, { marginTop: 10, marginRight: 5 }]}
              />
              <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Poppins-SemiBold', marginTop: 10, textAlign: 'center' }}>Login Via Google</Text>

            </View>
            <View style={{ height: 40, backgroundColor: '#4099ff', flexDirection: 'row', justifyContent: 'center', borderRadius: 20 }}>
              <Image
                source={require('../Assets/instagramIcon.png')}
                style={[styles.iconsLogin, { marginTop: 10, marginRight: 5 }]}
              />
              <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Poppins-SemiBold', marginTop: 10, textAlign: 'center' }}>Login Via Instagram</Text>

            </View>

          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0.5,
    marginBottom: 10,
    borderRadius: 5,
    color: '#000',
    height: 50
    // borderColor:'gray',
    // borderLeftColor:'gray'
  },
  btn: {
    width: '30%',
    alignSelf: 'flex-start',
    height: 70,
    borderStartColor: 'red',
    marginLeft: 20,
    marginTop: 20
  },
  btn1: {
    width: '90%',
    alignSelf: 'center',
    height: 80,
    borderStartColor: 'red',
    // marginLeft:20,
    marginTop: 10
  },
  profileImg: {
    alignSelf: 'center',
    marginBottom: 10,
    height: 70,
    marginTop: -60,
    width: 110
  },
  iconsLogin: {
    width: 18,
    height: 18
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    marginLeft: 20,
    fontFamily: 'Poppins-Regular'
    // marginTop: 5,
  },
});
