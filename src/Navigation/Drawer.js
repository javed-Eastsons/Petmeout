import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Animated

} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/SimpleLineIcons';
import Icon5 from 'react-native-vector-icons/AntDesign';
import { categoryList, logout } from '../Redux/Actions/Petmeout';
import { Globals } from '../Config/index';
import LottieView from 'lottie-react-native';

const Drawer = (props) => {
  const navigation = useNavigation();
  const [isFocus, setIsFocus] = useState('');
  const { CATEGORY_LIST } = useSelector(state => state.PetmeOutReducer);
  const [loader, setLoader] = useState(false);
  const { USER_DATA } = useSelector(state => state.PetmeOutReducer);
  const { LOGIN_PET } = useSelector(state => state.PetmeOutReducer);

  console.log(LOGIN_PET, 'LOGIN_PETLOGIN_PETLOGIN_PET')
  const dispatch = useDispatch();
  useEffect(() => {
    setLoader(true);
    dispatch(categoryList());
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);


  const { LOGIN_DATA } = useSelector(state => state.PetmeOutReducer);



  const handleLogout = () =>
    Alert.alert('Are you Sure', '', [

      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => logoutApp() },
    ]);

  const logoutApp = () => {
    setLoader(true);

    dispatch(logout(LOGIN_DATA?.email, navigation));
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };
  console.log(CATEGORY_LIST, 'CATEGORY_LIST_DRAWER')
  const image = require('../Assets/images/BG7.jpg');

  return (

    <View style={{ flex: 1 }}>
      <ImageBackground
        source={image}
        style={styles.bgImage}
        resizeMode="cover">
        <View style={{ padding: 10, alignSelf: 'center',paddingTop:20 }}>
          <View>
            <View style={{ borderWidth: 3, borderColor: '#fbd349', padding: 5, borderRadius: 10 }}>
              {LOGIN_PET ? (
                <TouchableOpacity onPress={() => { navigation.navigate('Profile', { petDetails: LOGIN_PET }) }}>
                  <Image
                    source={{ uri: LOGIN_PET?.image_path }}
                    resizeMode='contain'
                    style={{ height: 100, width: 110, borderRadius: 10 }}
                  />
                </TouchableOpacity>

              ) : (
                <Image
                  source={require("../Assets/profileImg.png")}
                  resizeMode='cover'
                  style={{ height: 80, width: 80, borderRadius: 40 }}
                />
              )}
            </View>


            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  fontFamily: 'Poppins-SemiBold',
                  marginLeft: 15
                }}>
                {LOGIN_PET?.pet_name}
              </Text>

            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{ flexDirection: 'row', marginLeft: 15 }}>
            <Text style={{ fontFamily: 'Poppins-MediumItalic', color: '#000', marginTop: 2 }}>[Switch Pets</Text>

            {/* <LottieView
              source={require("../Assets/lottie/rightArrow.json")}
              style={{
                width: 40,
                height: 40,
                alignSelf: 'center',

              }}
              autoPlay loop
            /> */}
            <Image source={require('../Assets/img/icons/rightArrow.png')}
              style={{
                width: 25,
                height: 25,

              }}
            />
          </TouchableOpacity>
        </View>
        <DrawerContentScrollView
          showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ backgroundColor: '#fbd349' }}
        >





          <View style={{ flex: 1, paddingTop: 20 }}>
            <View style={styles.part}></View>
            <View>
              <TouchableOpacity
                style={[styles.screenName, { backgroundColor: isFocus == 'Newsfeed' ? '#e5e5e5' : 'transparent' }]}
                onPress={() => {
                  navigation.navigate('Posts');
                  setIsFocus('Newsfeed')
                }}>
                <Image
                  source={require("../Assets/img/icons/newspaper.png")}
                  style={{
                    width: 20,
                    height: 20,
                    alignSelf: 'center',
                    marginLeft: 24,
                    marginBottom: 10

                  }} />
                <Text style={styles.screenNameText}>Newsfeed</Text>
              </TouchableOpacity>
              <View style={styles.part}></View>
            </View>

            <View>
              <TouchableOpacity
                style={[styles.screenName, { backgroundColor: isFocus == 'Categories' ? '#e5e5e5' : 'transparent' }]}
                onPress={() => {
                  navigation.navigate('viewAllCategories')
                    setIsFocus('Categories')
                  
                  // navigation.navigate('ClientInfo');
                }}>
                <Image
                  source={require("../Assets/img/icons/categories.png")}
                  style={{
                    width: 21,
                    height: 21,
                    alignSelf: 'center',
                    marginLeft: 24,
                    marginBottom: 10

                  }} />
                <Text style={styles.screenNameText}>Categories</Text>
                {/* <Icon5 style={[styles.icon, { marginLeft: 80 }]} name={isFocus == 'Categories' ? 'down' : 'right'} size={15} color='#000' /> */}
              </TouchableOpacity>
              {/* <View >
                {
                  isFocus == 'Categories' ?
                    <TouchableOpacity style={{ marginLeft: 58, marginVertical: 15 }} onPress={() => { navigation.navigate('viewAllCategories') }}>
                      <Text style={{ fontFamily: 'Poppins-Regular', color: '#000' }}>View All Categories</Text>
                    </TouchableOpacity>
                    :
                    null
                }



              </View> */}
              <View style={styles.part}></View>
            </View>

            <View>

              <TouchableOpacity
                style={[styles.screenName, { backgroundColor: isFocus == 'Store' ? '#e5e5e5' : 'transparent' }]}
                onPress={() => {
                  setIsFocus('Store')
                  navigation.navigate('productCategories');
                }}>
                <Image
                  source={require("../Assets/img/icons/store.png")}
                  style={{
                    width: 18,
                    height: 18,
                    alignSelf: 'center',
                    marginLeft: 26,
                    marginBottom: 10

                  }} />
                <Text style={styles.screenNameText}>Store</Text>
              </TouchableOpacity>

              <View style={styles.part}></View>
            </View>
            {/* <View>

              <TouchableOpacity
                style={[styles.screenName, { backgroundColor: isFocus == 'Subscription' ? '#e5e5e5' : 'transparent' }]}
                onPress={() => {
                  setIsFocus('Subscription')
                  // navigation.navigate('Payments');
                }}>
                <Image
                  source={require("../Assets/img/icons/subscription.png")}
                  style={{
                    width: 24,
                    height: 24,
                    alignSelf: 'center',
                    marginLeft: 24,
                    marginBottom: 10

                  }} />
                <Text style={styles.screenNameText}>Subscription</Text>
              </TouchableOpacity>

              <View style={styles.part}></View>
            </View> */}
            <View>
              <TouchableOpacity
                style={[styles.screenName, { backgroundColor: isFocus == 'Setting' ? '#e5e5e5' : 'transparent' }]}
                onPress={() => {
                  setIsFocus('Setting')
                  // navigation.navigate('FileCabinet');
                }}>
                <Image
                  source={require("../Assets/img/icons/setting.png")}
                  style={{
                    width: 21,
                    height: 21,
                    alignSelf: 'center',
                    marginLeft: 24,
                    marginBottom: 10

                  }} />

                <Text style={styles.screenNameText}>Setting</Text>
              </TouchableOpacity>
              <View style={styles.part}></View>
            </View>
            <View>
              <TouchableOpacity
                style={[styles.screenName, { backgroundColor: isFocus == 'Adaptation' ? '#e5e5e5' : 'transparent' }]}
                onPress={() => {
                  setIsFocus('Adaptation')
                  // navigation.navigate('FileCabinet');
                }}>
                {/* <Icon5
                  name="file1"
                  style={styles.icon}
                  size={20}
                  color='#000'
                // color="rgba(161,165,159,255)"
                /> */}
                <Image
                  source={require("../Assets/img/icons/adopt.png")}
                  style={{
                    width: 23,
                    height: 23,
                    alignSelf: 'center',
                    marginLeft: 25,
                    marginBottom: 10

                  }} />
                <Text style={styles.screenNameText}>Adaptation</Text>
              </TouchableOpacity>
              <View style={styles.part}></View>
            </View>
            <View>
              <TouchableOpacity
                style={[styles.screenName, { backgroundColor: isFocus == 'Vaccination' ? '#e5e5e5' : 'transparent' }]}
                onPress={() => {
                  setIsFocus('Vaccination')
                  navigation.navigate('Vaccination');
                }}>
                <Image
                  source={require("../Assets/img/icons/vaccine.png")}
                  style={{
                    width: 23,
                    height: 23,
                    alignSelf: 'center',
                    marginLeft: 24,
                    marginBottom: 10

                  }} />

                <Text style={styles.screenNameText}>Vaccination</Text>
              </TouchableOpacity>
              <View style={styles.part}></View>
            </View>
            <View>
              <TouchableOpacity
                style={[styles.screenName, { backgroundColor: isFocus == 'Mating' ? '#e5e5e5' : 'transparent' }]}
                onPress={() => {
                  setIsFocus('Mating')
                  navigation.navigate('Mating');
                }}>
                <Image
                  source={require("../Assets/img/icons/love.png")}
                  style={{
                    width: 25,
                    height: 25,
                    alignSelf: 'center',
                    marginLeft: 24,
                    marginBottom: 10

                  }} />

                <Text style={styles.screenNameText}>Mating</Text>
              </TouchableOpacity>
              <View style={styles.part}></View>
            </View>
          </View>
        </DrawerContentScrollView >
        <View style={{ padding: 20 }}>

          <TouchableOpacity onPress={() => { handleLogout() }} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="exit-outline" size={22} color='#000' />
              <Text
                style={styles.screenNameTextFoot}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View >
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
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
  logo: {
    width: '55%',
    height: 60,
    alignSelf: 'center',
  },
  headImg: {
    backgroundColor: '#fbd349',
    flexDirection: 'row',
    padding: 20,
    // marginTop:30
  },
  profileImg: {
    width: '40%',
    height: 110,
    borderRadius: 120,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headText: {
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
    color: '#fff',
    fontWeight: '600',
  },
  part: {
    borderWidth: 0.5,
    borderColor: '#A7B1C2',
  },
  screenName: {
    // marginVertical: 10,
    flexDirection: 'row',
    height: 55,
    paddingTop: 10
  },
  screenNameText: {
    color: '#000',
    marginLeft: 10,
    marginVertical: 9,
    fontFamily: 'Poppins-Regular',
    fontSize: 14
  },
  screenNameTextFoot: {
    color: '#000',
    marginLeft: 10,
    // marginVertical: 9,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16
  },
  icon: {
    marginLeft: 25,
    marginTop: 10,
  },
  profileImg: {
    width: 70,
    borderRadius: 80,
    height: 70,
    marginTop: 30,
    // alignSelf: 'center',
    marginLeft: 20
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },

});
