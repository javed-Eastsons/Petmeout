import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../Style';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Octicons'
import LottieView from 'lottie-react-native';
const CustomHeader = () => {
  const navigation = useNavigation();
  let iconNm = require('../Assets/img/icons/hamburger-green.png');
  let logo = require('../Assets/img/petmeout.png');
  let bell = require('../Assets/img/icons/bell-green.png');
  let profile = require('../Assets/img/icons/profile-green.png');

  return (
    <View
      style={{
        backgroundColor: Color.white,
        // backgroundColor: '',
       elevation:5,
        justifyContent: 'center',
        padding: 15,
      }}>
      <View
        style={{
          //backgroundColor: 'green',
          width: wp(90),
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            //backgroundColor: 'green',
            width: wp(20),
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            {/* Hamburger icon or any other icon you prefer */}
            <Icon1 name='three-bars' size={25} color='#000'/>
             {/* <Image source={iconNm} style={{ width: 25, height: 25 }} /> */}
          </TouchableOpacity>
        </View>
        <View
          style={{
            //backgroundColor: 'red',
            width: wp(50),
            //height: 10,
          }}>
          <Image
            source={logo}
            style={{ width: 200, height: 40 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            // backgroundColor: 'green',
            width: wp(22),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={{marginLeft:30}} onPress={()=>{navigation.navigate('Cart')}}>
            <Icon

              name="shopping-cart"
              size={25}
              
              color="black"
            />
          </TouchableOpacity>
          {/* <LottieView
                  source={require("../Assets/lottie/sms.json")}
                  style={{
                    width: 80,
                    height: 0,
                    alignSelf: 'center',

                  }}
                  autoPlay loop
                /> */}
         

        </View>
      </View>
    </View>
  );
};

export default CustomHeader;
