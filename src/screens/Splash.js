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

const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { width, height } = Dimensions.get('window');
  const gotoSignInScreen = async () => {
    // Alert.alert('hiii');

      navigation.navigate('Login');
  };

  // const checkToken=async()=>{
  //   let token = await  AsyncStorage.getItem("token");
  //   let Login_Details = await  AsyncStorage.getItem("Login_Details");
  //   console.log(Login_Details,'loginDataloginDataloginData')
  //   console.log(token,'tokentokentokentokentoken')

  //   if(token){
  //     dispatch({
  //       type: LOGIN_DATA,
  //       payload: Login_Details,
  //     });
  //     navigation.navigate('Auth');
  //   }else{
  //     navigation.navigate('Login');

  //   }
  // }

  // useEffect(() => {
  //   checkToken()
  // }, []);

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
      
          <TouchableOpacity style={{backgroundColor:'#335368',width:'50%',height:50,borderRadius:25,alignSelf:'center',marginTop:80}} onPress={gotoSignInScreen}>
            <Text style={{textAlign:'center',fontSize:15,marginTop:15,color:'#fff'}}>Continue</Text>
          </TouchableOpacity>


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
