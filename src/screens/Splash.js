import { StyleSheet, Text, View, Image, Alert, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Color } from '../Style';
import SpinView from '../Component/Spin';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-community/async-storage";
import { LOGIN_DATA } from '../Redux/Actions/types';
import { useDispatch } from 'react-redux';
import { requestUserPermission, setupForegroundNotifications, triggerLocalNotification } from '../utils/notificationService';
import messaging from '@react-native-firebase/messaging';

const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const checkToken = async () => {
    let token = await AsyncStorage.getItem("token");
    let loginDetails = await AsyncStorage.getItem("Login_Data");
    if (loginDetails) {
      loginDetails = JSON.parse(loginDetails); // Parsing the string back into an object
      console.log('ParsedLogin_Data:', loginDetails);
    }

    console.log(loginDetails, 'loginDataloginDataloginData')
    console.log(token, 'tokentokentokentokentoken')

    if (token && loginDetails) {
      dispatch({
        type: LOGIN_DATA,
        payload: loginDetails,
      });
      navigation.navigate('Auth');
    } else {
      navigation.navigate('Login');

    }
  }
  // const checkFCMToken = async () => {
  //   const fcmToken = await messaging().getToken()
  //   if (fcmToken) {
  //     console.log(fcmToken,'fcmTokenfcmToken')
  //     // Alert.alert(fcmToken)
  //   }
  // }
  // useEffect(() => {
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log(remoteMessage, "setBackgroundMessageHandler")
  //   })

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log(remoteMessage, 'remoteMessageremoteMessage')
  //   })
  //   return unsubscribe;
  // }, [])
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     PushNotification.localNotification({
  //       message: remoteMessage.notification.body,
  //       title: remoteMessage.notification.title,
  //       bigPictureUrl: remoteMessage.notification.android.imageUrl,
  //       channelId: true,
  //       vibrate: true,
  //       vibrationPattern: [1000, 2000, 1000]
  //     });
  //   })
  //   return unsubscribe;
  // }, [])


  useEffect(() => {
    checkToken()
  }, []);
  useEffect(() => {
    requestUserPermission();
    // triggerLocalNotification();
    // checkFCMToken()
    setupForegroundNotifications()
    // notificationListner();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f8ee' }}>
      {/* // <SpinView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >*/}
      <View style={{ marginTop: 150 }}>
        <View style={styles.container}>
          {/* <Image source={require('../Assets/img/petmeout.png')} style={styles.logo} /> */}
        </View>
        <LottieView
          source={require("../Assets/lottie/lott.json")}
          style={{
            width: 370,
            height: 370,
            alignSelf: 'center',

          }}
          autoPlay loop
        />
      </View>

      {/* <TouchableOpacity style={{backgroundColor:'#335368',width:'50%',height:50,borderRadius:25,alignSelf:'center',marginTop:80}} onPress={gotoSignInScreen}>
            <Text style={{textAlign:'center',fontSize:15,marginTop:15,color:'#fff'}}>Continue</Text>
          </TouchableOpacity> */}


      {/* <LottieView
        source={require("../Assets/lottie/animPet.json")}
          // style={{ width: width * 0.5, height: height * 0.5 }}
        autoPlay loop
      /> */}
      {/* <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Loading...</Text>
    // </SpinView>
    //   <View style={styles.container}>
    //     <Image source={require('../Assets/img/petmeout.png')} style={styles.logo} />
    //   </View> */}
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: Color.white,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  content: {
    backgroundColor: '#fff',
    marginTop: 26,
    height: 70,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  logo: {
    height: 80,
    width: 100,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    marginLeft: 40
  },
});
