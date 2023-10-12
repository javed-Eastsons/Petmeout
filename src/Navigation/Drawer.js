import React, {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {TextInput} from 'react-native-gesture-handler';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const Drawer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>zfdgsdgs</Text>
    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 10,
  },
  head: {
    height: hp(10),
    // backgroundColor: "red"
    flexDirection: 'row',
  },
  subText: {
    color: '#fff',
  },
  logoicons: {
    height: 80,
    width: 80,
  },
  icons: {
    height: 25,
    width: 25,
  },
  MenuLIstContainer: {
    padding: 10,
    marginTop: 10,
  },
  LastText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-Italic',
    marginLeft: 20,
  },
  MenuLIst: {
    flexDirection: 'row',
    // padding: 10,
    // marginTop: 20
  },
  menusublist: {
    marginLeft: 50,
  },
  MenuHead: {
    padding: 5,
    fontSize: 16,
    color: 'yellow',
  },
  SocialMainContainer: {
    height: 40,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  SocialContainer: {
    height: 30,
    width: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  verticleLine: {
    height: 100,
    width: 2,
    backgroundColor: 'yellow',
  },
});
