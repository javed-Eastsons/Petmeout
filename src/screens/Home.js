import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Button,
  Alert,
  FlatList,
  Animated,
  Easing,
  BackHandler, ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../Style';
import { useDispatch, useSelector } from 'react-redux';
import { clientInfo, deleteRegisterPet, ManagerInfo } from '../Redux/Actions/Petmeout';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Loader } from '../Component/Loader';
import SpinView from '../Component/Spin';
import { petListing } from '../Redux/Actions/Petmeout';
import LottieView from 'lottie-react-native';
import CustomBottomTab from '../Component/CustomBottomTab';
import Modal from "react-native-modal";
import { useFocusEffect } from '@react-navigation/native';
import { LOGIN_PET } from '../Redux/Actions/types';



const HomeScreen = () => {
  const width = Dimensions.get('window').width;
  const { LOGIN_DATA } = useSelector(state => state.PetmeOutReducer);
  const { PET_LIST } = useSelector(state => state.PetmeOutReducer);
  const [showDelModal, setShowDelModal] = useState(false)
  const [petId, setPetId] = useState()
  // const [backPressedOnce, setBackPressedOnce] = useState(false);


  console.log(LOGIN_DATA?.email, 'LOGIN_DATALOGIN_DATALOGIN_DATA')
  const gotTOPost = (item) => {
    dispatch({
      type: LOGIN_PET,
      payload: item,
    });
    navigation.navigate('Posts', { petDetails: item })

    setIsVibrating(false)
  }
  const openModal = (id) => {
    setPetId(id)
    setShowDelModal(true)
    setIsVibrating(false)
  }
  const dispatch = useDispatch();
  const navigation = useNavigation();


  console.log(PET_LIST?.length, 'PET_LIST')



  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    dispatch(petListing(LOGIN_DATA?.email, navigation));
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const deletePet = () => {
    setLoader(true);
    dispatch(deleteRegisterPet(petId, LOGIN_DATA?.email, navigation));
    dispatch(petListing(LOGIN_DATA?.email, navigation));
    setShowDelModal(false)
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }

  const bgImage = require('../Assets/images/pawBG.jpg');

  const [isVibrating, setIsVibrating] = useState(false);

  // useEffect(() => {
  //   const onBackPress = () => {
  //     if (backPressedOnce) {
  //       BackHandler.exitApp();
  //     } else {
  //       setBackPressedOnce(true);
  //       ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
  //       setTimeout(() => setBackPressedOnce(false), 2000);
  //     }
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //   return () => {
  //     backHandler.remove();
  //   };
  // }, [backPressedOnce]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImage}
        style={styles.bgImg}
        resizeMode="cover">
        <Loader flag={loader} />


        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {/* <Text style={styles.heading}>
          Thank you for being our client since 2023
        </Text> */}


          <View style={{ alignSelf: 'center', padding: 20, borderRadius: 10 }}>

            <Text style={{ fontSize: 17, color: '#ec4390', marginTop: 10, textAlign: 'center', fontFamily: 'Poppins-Regular' }}><Text style={{ color: '#000', fontFamily: 'Poppins-Regular' }}>Hello, </Text>{LOGIN_DATA?.Username}</Text>
            <Text style={{ fontSize: 19, marginTop: 20, textAlign: 'center', fontFamily: 'Poppins-Regular', color: '#000' }}>Welcome To “SocialZoo Network”</Text>
            {
              LOGIN_DATA?.No_of_pet == 0 ?
                <Text style={{ color: '#000', fontSize: 16, textAlign: 'center', marginTop: 10, fontFamily: 'Poppins-Regular' }}>Register Your Pet To Continue</Text>
                :
                <>
                  <Text style={{ color: '#000', fontSize: 16, textAlign: 'center', marginTop: 10, fontFamily: 'Poppins-Regular' }}>Choose Your Pet To Continue</Text>
                  <Text style={{ color: '#000', fontSize: 16, textAlign: 'center', marginVertical: 10, fontFamily: 'Poppins-Regular' }}>"Use a long press to delete pets"</Text>
                </>
            }

            <View style={{ flexDirection: 'row' }}>

              <FlatList
                // contentContainerStyle={{ paddingBottom: 200 }}
                data={PET_LIST}
                contentContainerStyle={{
                  alignSelf: 'center',
                  alignItems: 'center',
                }}
                columnWrapperStyle={{ flexWrap: 'wrap' }}
                // numColumns={2}
                numColumns={3}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => { gotTOPost(item) }} onLongPress={() => { setIsVibrating(true) }}>
                    <View>
                      {
                        isVibrating ?
                          <TouchableOpacity onPress={() => { openModal(item?.pet_id) }} style={{ zIndex: 1, backgroundColor: '#fff' }}>
                            <Image
                              source={require("../Assets/img/icons/close.png")}
                              style={{
                                width: 28,
                                height: 28,
                                alignSelf: 'center',
                                position: 'absolute',
                                left: 70,

                              }} />
                            {/* <LottieView
                              source={require("../Assets/lottie/cross.json")}
                              style={{
                                width: 28,
                                height: 28,
                                alignSelf: 'center',
                                position: 'absolute',
                                left: 70,

                              }}
                              autoPlay loop
                            /> */}
                          </TouchableOpacity>
                          : null
                      }
                      <Image
                        source={{
                          uri: item.image_path,
                        }}
                        style={styles.profileImg1}
                      />
                    </View>
                    <Text style={{ fontSize: 14, color: '#000', textAlign: 'center', fontFamily: 'Poppins-Regular' }}>{item.pet_name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>


            {/* <View></View>
                <View style={{ alignSelf: 'center' }}>
                  <Image
                    source={require('../Assets/dog.png')}
                    style={styles.profileImg}
                  />
                  <Text style={{ fontSize: 18, color: '#000', textAlign: 'center' }}>Dog</Text>
                </View> */}

            {
              PET_LIST?.length < 5 || PET_LIST?.length == undefined ?
                <TouchableOpacity onPress={() => { navigation.navigate('RegisterPet') }} style={{ alignSelf: 'center' }}>
                  {/* <Image
                  source={require('../Assets/createNew.png')}
                  style={styles.profileImg}
                /> */}
                  <LottieView
                    source={require("../Assets/lottie/addNew.json")}
                    style={{
                      width: 100,
                      height: 100,
                      alignSelf: 'center',

                    }}
                    autoPlay loop
                  />
                  <Text style={{ fontSize: 15, color: '#000', textAlign: 'center', fontFamily: 'Poppins-Regular', marginLeft: 10 }}>Create New</Text>
                </TouchableOpacity>
                : null
            }

          </View>
        </ScrollView >

      </ImageBackground>


      <Modal
        //  backdropColor={'transparent'}
        backdropOpacity={0.5}
        animationType="slide"
        transparent={true}
        visible={showDelModal}
        onRequestClose={() => {
          setShowDelModal(false)

        }}
      >
        <View style={styles.modalWrapper2}>
          <View style={styles.modalWrapp1}>
            <View style={styles.content}>
              <LottieView
                source={require("../Assets/lottie/delete.json")}
                style={{
                  width: 150,
                  height: 120,
                  alignSelf: 'center',

                }}
                autoPlay loop
              />
              <Text style={{ fontSize: 17, color: '#000', fontFamily: 'Poppins-Regular', textAlign: 'center', marginTop: 15 }}>Are You Sure ?</Text>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <TouchableOpacity style={styles.cancel} onPress={() => setShowDelModal(false)}>
                  <Text style={{ color: '#000', textAlign: 'center', marginTop: 6, fontFamily: 'Poppins-Regular' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.delete} onPress={deletePet}>
                  <Text style={{ color: '#fff', textAlign: 'center', marginTop: 6, fontFamily: 'Poppins-Regular' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </Modal>
    </View >
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.screenBg
  },
  profileImg: {
    width: 90,
    borderRadius: 80,
    height: 90,
    marginTop: 30,
    // alignSelf: 'center',
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#ec4390',
    resizeMode: 'contain'
  },
  profileImg1: {
    width: 90,
    borderRadius: 80,
    height: 90,
    // marginTop: 30,
    // alignSelf: 'center',
    marginLeft: 10,
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: '#ec4390',

  },
  bgImg: {
    flex: 1,
    justifyContent: 'center',
  },
  modalWrapp1: {
    height: hp(35), width: wp(85), position: 'absolute',
    bottom: 195, backgroundColor: '#fff',
    borderRadius: 20
  },
  modalWrapper2: {
    flex: 1,
    // backgroundColor: "#00000040",
    alignItems: "center",
    justifyContent: "flex-end",

  },
  content: {
    alignSelf: 'center'
  },
  cancel: {
    width: wp(25),
    borderRadius: 120,
    height: hp(5),
    borderWidth: 1
  },
  delete: {
    width: wp(25),
    borderRadius: 120,
    height: hp(5),
    borderWidth: 1,
    marginLeft: 15,
    backgroundColor: 'red'
  }

});
