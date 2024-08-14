import React, { useEffect, useCallback, useState } from 'react';
import { View, Button, StyleSheet, Text, Image, ScrollView, ImageBackground, Alert } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler'
import RadioButtonRN from 'radio-buttons-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { cityList, countryList, registerUser, stateList } from '../Redux/Actions/Petmeout';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Component/Loader';
import { TextInput } from "react-native-paper";

const Signup = () => {
  // const { register, handleSubmit, setValue } = useForm();
  // const onSubmit = useCallback(formData => {
  //   console.log(formData);
  // }, []);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [isFocus, setIsFocus] = useState(false);
  const [gender, setGender] = useState()
  const [value, setValue] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [pass, setPass] = useState('')
  const [address, setAddress] = useState('')
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [countryId, setCountryId] = useState()
  const [stateId, setStateId] = useState()
  const [country, setCountry] = useState()
  const [stateName, setStateName] = useState()
  const [cityName, setCityName] = useState()
  const [pincode, setPincode] = useState('')
  const [countryName, setCountryName] = useState()

  const { COUNTRY_LIST } = useSelector(state => state.PetmeOutReducer);
  const { STATE_LIST } = useSelector(state => state.PetmeOutReducer);
  const { CITY_LIST } = useSelector(state => state.PetmeOutReducer);
  console.log(!pass, username, 'passpasspass')
  const validate = () => {
    const newErrors = {};
    const pincodePattern = /\b\d{5,6}\b/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!username) {
      newErrors.username = 'username is required';
    }

    if (!gender) {
      newErrors.gender = 'gender is required';
    }

    if (!pass) {
      newErrors.pass = 'Password is required';
    }
    if (!address) {
      newErrors.address = 'Address is required';
    }
    if (!address) {
      newErrors.address = 'Address is Required';
    }
    if (!countryName) {
      newErrors.countryName = 'CountryName is required';
    }
    if (!stateName) {
      newErrors.stateName = 'StateName is required';
    }
    if (!cityName) {
      newErrors.cityName = 'CityName is required';
    }

    if (!pincode) {
      newErrors.pincode = 'Pincode is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const onSubmit = () => {
    if (validate()) {
      setLoader(true);
      // if (email && pass && username) {
      // navigation.navigate('Auth');
      dispatch(registerUser(username, email, pass, gender, address, countryName, stateName, cityName, pincode, navigation));

      // } else {
      //   Alert.alert('Something went wrong')
      // }
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  };
  // const bgImage = require('../Assets/dog.png');

  const data = [
    {
      label: 'Remember me'
    },

  ];
  const data1 = [
    {
      id: 1,
      name: 'Male',

    },
    {
      id: 2,
      name: 'Female',

    }
  ]
  // const bgImage = require('../Assets/dog.png');
  useEffect(() => {
    setLoader(true);
    dispatch(countryList());
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);
  useEffect(() => {
    setLoader(true);
    dispatch(stateList(countryId));
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [countryId]);
  useEffect(() => {
    setLoader(true);
    dispatch(cityList(stateId));
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [stateId]);
  useEffect(() => {
    if (Array.isArray(COUNTRY_LIST)) {
      setCountry([...COUNTRY_LIST]);
    }
  }, [COUNTRY_LIST]);

  useEffect(() => {
    if (Array.isArray(STATE_LIST?.state_lists)) {
      setStateListing([...STATE_LIST]);
    } else {

      console.error("STATE_LIST is not an array:", STATE_LIST);

    }
  }, [STATE_LIST]);
  const image = require('../Assets/images/BG7.jpg');
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.bgImage}>
        <Loader flag={loader} />
        <Image
          source={require('../Assets/img/petmeout.png')}
          resizeMode='contain'
          style={styles.profileImg}
        />
        {/* <ImageBackground
          source={bgImage}
          style={styles.bgImg}
          resizeMode="cover"> */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '95%', alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ height: 50, backgroundColor: '#e5e5e5', width: 160, borderTopLeftRadius: 25, borderBottomLeftRadius: 25 }}>
            <Text style={{ color: '#000', fontSize: 14, marginTop: 15, textAlign: 'center', fontFamily: 'Poppins-Regular' }}>Sign in</Text>

          </TouchableOpacity>
          <TouchableOpacity style={{ height: 50, backgroundColor: '#fbd349', width: 160, borderTopRightRadius: 25, borderBottomRightRadius: 25 }}>
            <Text style={{ color: '#000', fontSize: 14, marginTop: 15, textAlign: 'center', fontFamily: 'Poppins-Regular' }}>Sign up</Text>

          </TouchableOpacity>
        </View>

        {/* <View style={styles.btn}>
        <Text style={{ fontSize: 20, color: '#000', fontWeight: '600', borderBottomWidth: 2, borderBottomColor: '#ec4390', width: 70 }}>Sign up</Text>

      </View> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}

        >
          <View style={{ marginTop: 10, elevation: 10, backgroundColor: '#fff', borderRadius: 20, width: '95%', alignSelf: 'center', padding: 10, paddingTop: 10 }}>
            <Text style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular', marginTop: 5 }}>Username</Text>
            <TextInput
              // secureTextEntry
              // autoCompleteType="password"
              placeholder="Username"
              onChangeText={(text) => { setUsername(text) }}
              style={[styles.input1, { marginTop: 10 }]}
              placeholderTextColor={'black'}
            />
            {errors.username && <Text style={[styles.error, { marginBottom: 10 }]}>{errors.username}</Text>}

            <Text style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular', marginTop: 5 }}>Email</Text>
            <TextInput
              // autoCompleteType="email"
              // keyboardType="email-address"
              underlineColorAndroid="transparent"
              textContentType="emailAddress"
              placeholder="Email"
              onChangeText={(text) => { setEmail(text) }}
              placeholderTextColor={'black'}
              style={styles.input1}
            />
            {errors.email && <Text style={[styles.error, {  marginBottom: 10 }]}>{errors.email}</Text>}
            <Text style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular', marginTop: 5 }}>Gender</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={data1}
              maxHeight={200}
              labelField="name"
              valueField="name"
              placeholder={!isFocus ? 'Gender' : '...'}
              value={gender}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                // console.log(item.name)
                setGender(item.name)
                setIsFocus(false);
              }}

            />
            {errors.gender && <Text style={[styles.error, {  }]}>{errors.gender}</Text>}
            <Text style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular', marginTop: 10 }}>Password</Text>
            <TextInput
              // secureTextEntry
              // autoCompleteType="password"
              placeholder="Password"
              onChangeText={(text) => { setPass(text) }}
              placeholderTextColor={'black'}
              style={styles.input1}
            />
            {errors.pass && <Text style={[styles.error, {  marginBottom: 10 }]}>{errors.pass}</Text>}


            <Text style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>Address*</Text>
            <TextInput
              // secureTextEntry
              // autoCompleteType="password"
              placeholder="Address"
              onChangeText={(text) => { setAddress(text) }}
              value={address}
              placeholderTextColor={'black'}
              style={styles.input1}
            />
            {errors.address && <Text style={[styles.error, {  marginBottom: 10 }]}>{errors.address}</Text>}


            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                Country*
              </Text>
              {
                country &&
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  itemTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={country}
                  search
                  maxHeight={200}
                  labelField="name"
                  valueField="name"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  value={countryName}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  searchPlaceholder='Search Country'
                  onChange={item => {
                    console.log(item, 'iiiit')
                    setCountryId(item.id)
                    setCountryName(item?.name)
                    setIsFocus(false);
                  }}

                />
              }
              {errors.countryName && <Text style={styles.error}>{errors.countryName}</Text>}
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                State
              </Text>


              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={STATE_LIST && countryId ? STATE_LIST : data}
                maxHeight={200}
                search
                labelField="name"
                valueField="name"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder='Search State'
                value={stateName}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setStateId(item.id)
                  setStateName(item?.name)
                  setIsFocus(false);
                }}

              />
              {errors.stateName && <Text style={styles.error}>{errors.stateName}</Text>}
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                City
              </Text>

              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={CITY_LIST}
                search
                maxHeight={200}
                labelField="name"
                valueField="name"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder='Search City'
                value={cityName}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setCityName(item?.name)
                  setIsFocus(false);
                }}

              />
              {errors.cityName && <Text style={styles.error}>{errors.cityName}</Text>}
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                Pincode*
              </Text>

              <TextInput
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                placeholder="Enter Area Pincode"
                onChangeText={(text) => setPincode(text)}
                value={pincode}
                placeholderTextColor={'black'}
                style={styles.input1}
              />
              {errors.pincode && <Text style={styles.error}>{errors.pincode}</Text>}
            </View>
            <TouchableOpacity onPress={onSubmit} style={[styles.btn, { height: 40, backgroundColor: '#fbd349', borderRadius: 20 }]}>
              <Text style={{ color: '#000', fontSize: 13, fontFamily: 'Poppins-Regular', marginTop: 10, textAlign: 'center' }}>Get Started</Text>

            </TouchableOpacity>
          </View>
        </ScrollView>



        {/* </ImageBackground> */}
      </ImageBackground>
    </View>
  )
}

export default Signup

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
    marginBottom: 20,
    borderRadius: 5,
    height: 50,
    textDecorationLine: 'none'

    // borderColor:'gray',
    // borderLeftColor:'gray'
  },
  btn: {
    width: '35%',
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
    marginTop: 20
  },
  profileImg: {
    alignSelf: 'center',
    // marginBottom: 20,
    height: 60,
    // marginTop: 10,
    width: 110
  },
  bgImg: {
    // height: 100
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 8,
    width: '90%',
    paddingHorizontal: 8,
    alignSelf: 'center',
    marginBottom: 10
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  textArea: {
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0.5,
    marginBottom: 20,
    borderRadius: 5,


    height: 100,
    textAlignVertical: 'top',
    borderColor: '#000',
  },
  error: {
    color: 'red',
    // marginTop: 5,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 12,
    color: '#000'

  },
  selectedTextStyle: {
    fontSize: 12,
    color: '#000'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular'
  },
  input1: {
    backgroundColor: '#fff',
    width: '100%',
    alignSelf: 'center',
    borderWidth: 0.5,
    marginBottom: 10,
    borderRadius: 5,
    height: 40,
    fontSize:13,
    // borderColor:'gray',
    // borderLeftColor:'gray'
  },
})
