import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color} from '../Style';
const CustomHeader = () => {
  const navigation = useNavigation();
  let iconNm = require('../Assets/img/icons/hamburger-green.png');
  let logo = require('../Assets/img/logo.png');
  let bell = require('../Assets/img/icons/bell-green.png');
  let profile = require('../Assets/img/icons/profile-green.png');

  return (
    <View
      style={{
        backgroundColor: Color.white,
        // backgroundColor: '',
        borderWidth: 0.8,
        borderBottomColor: Color.geen,
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
            <Image source={iconNm} style={{width: 25, height: 25}} />
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
            style={{width: 200, height: 40}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            // backgroundColor: 'green',
            width: wp(20),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('MyInfo')}>
            {/* Hamburger icon or any other icon you prefer */}
            <Image source={profile} style={{width: 20, height: 20}} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => navigation.openDrawer()}>
            {/* Hamburger icon or any other icon you prefer */}

            <Image source={bell} style={{width: 20, height: 20}} />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              top: -2,
              right: 0,
              height: 25,

              width: 25,
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: Color.white,
              backgroundColor: Color.geen,
              borderRadius: 50,
            }}>
            <Text
              style={{
                color: Color.white,
                alignSelf: 'center',
                fontSize: 12,
              }}>
              0
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;
