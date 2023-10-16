import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CustomHeader = () => {
  const navigation = useNavigation();
  let iconNm = require('../Assets/img/icons/hamburger.png');
  return (
    <View
      style={{
        backgroundColor: '#2F4050',
        justifyContent: 'center',
        padding: 15,
      }}>
      <View
        style={{
          //backgroundColor: 'green',
          width: wp(90),
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          {/* Hamburger icon or any other icon you prefer */}
          <Image source={iconNm} style={{width: 25, height: 25}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
