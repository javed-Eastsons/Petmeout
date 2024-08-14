import {
    StyleSheet, Text, View, TouchableOpacity, Button, TextInput, ScrollView, Image, ImageBackground
} from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker'
// import RNFS from 'react-native-fs';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { countryList, stateList, cityList, categoryList, breedList, registerPet } from '../Redux/Actions/Petmeout';
import { Loader } from '../Component/Loader';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import DatePicker from 'react-native-date-picker'

const CreateProfile = () => {
    const [base64File, setBase64File] = useState();
    const [base64Image, setBase64Image] = useState()
    const [imageUri, setImageUri] = useState();
    const [isFocus, setIsFocus] = useState(false);
    const [countryId, setCountryId] = useState()
    const [stateId, setStateId] = useState()
    const [country, setCountry] = useState()
    const [stateListing, setStateListing] = useState()
    const [categoryId, setCategoryId] = useState()
    const [categoryName, setCategoryName] = useState()
    const [language, setLanguage] = useState()
    const [fileResponse, setFileResponse] = useState();
    const [petName, setPetname] = useState();
    const [desc, setDesc] = useState()
    const [age, setAge] = useState();
    const [weight, setWeight] = useState();
    const [color, setColor] = useState();
    const [gender, setGender] = useState()
    const [unit, setUnit] = useState()
    const [countryName, setCountryName] = useState()
    const [stateName, setStateName] = useState()
    const [cityName, setCityName] = useState()
    const [base64, setBase64] = useState('');

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const { LOGIN_DATA } = useSelector(state => state.PetmeOutReducer);
    const { COUNTRY_LIST } = useSelector(state => state.PetmeOutReducer);
    const { STATE_LIST } = useSelector(state => state.PetmeOutReducer);
    const { CITY_LIST } = useSelector(state => state.PetmeOutReducer);
    const { CATEGORY_LIST } = useSelector(state => state.PetmeOutReducer);
    const { BREED_LIST } = useSelector(state => state.PetmeOutReducer);


    var result = Object.entries(STATE_LIST);
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    console.log(BREED_LIST, 'BREED_LISTBREED_LISTBREED_LISTBREED_LISTBREED_LIST')
    console.log(base64Image, 'base64Imagebase64Image')
    // console.log(CITY_LIST, 'CITY_LIST')
    // console.log(STATE_LIST, 'aaaaaaaaaa')
    // console.log(CATEGORY_LIST, 'CATEGORY_LISTREGISTER')

    const languages = [
        {
            "name": "English",
            "code": "en",
            "nativeName": "English"
        },
        {
            "name": "Spanish",
            "code": "es",
            "nativeName": "Español"
        },
        {
            "name": "French",
            "code": "fr",
            "nativeName": "Français"
        },
        {
            "name": "German",
            "code": "de",
            "nativeName": "Deutsch"
        },
        {
            "name": "Chinese",
            "code": "zh",
            "nativeName": "中文"
        },
        {
            "name": "Japanese",
            "code": "ja",
            "nativeName": "日本語"
        },
        {
            "name": "Korean",
            "code": "ko",
            "nativeName": "한국어"
        },
        {
            "name": "Italian",
            "code": "it",
            "nativeName": "Italiano"
        },
        {
            "name": "Portuguese",
            "code": "pt",
            "nativeName": "Português"
        },
        {
            "name": "Russian",
            "code": "ru",
            "nativeName": "Русский"
        },
        {
            "name": "Hindi",
            "code": "hi",
            "nativeName": "हिन्दी"
        },
        {
            "name": "Arabic",
            "code": "ar",
            "nativeName": "العربية"
        },
        {
            "name": "Bengali",
            "code": "bn",
            "nativeName": "বাংলা"
        },
        {
            "name": "Punjabi",
            "code": "pa",
            "nativeName": "ਪੰਜਾਬੀ"
        },
        {
            "name": "Javanese",
            "code": "jv",
            "nativeName": "ꦧꦱꦗꦮ"
        },
        {
            "name": "Swahili",
            "code": "sw",
            "nativeName": "Kiswahili"
        }
    ]


    console.log(categoryId, 'categoryId')
    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
            });
            // console.log(response, 'fileee')
            setFileResponse(response);
            if (response) {
                console.log(response, 'responseresponse')
                setImageUri(response[0]?.uri)
                toDataURL(response[0]?.uri, (dataUrl) => {
                    var base64result = dataUrl.split(",")[1];
                    console.log(base64result, "RESULT:");
                    setBase64Image(base64result);
                })
                    // convertUriToBase64(response[0]?.uri)
                    .then(base64 => {
                        console.log('Base64:', base64)
                        setBase64File(base64)
                    })
            }
        }
        catch (err) {
            console.warn(err);
        }
    }, []);

    const toDataURL = (url, callback) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    useEffect(() => {
        setLoader(true);
        dispatch(countryList());
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);
    useEffect(() => {
        setLoader(true);
        dispatch(categoryList());
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);
    useEffect(() => {
        setLoader(true);
        dispatch(breedList(categoryId));
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
            // Handle the case where STATE_LIST is not an array
            // For example, you can set a default value or log an error
            console.error("STATE_LIST is not an array:", STATE_LIST);
            // set a default value or handle it based on your use case
            // setCountry([]); // or provide a default value
        }
    }, [STATE_LIST]);


    // useEffect(() => {
    //     if (Array.isArray(STATE_LIST)) {
    //         setStateListing([...STATE_LIST]);
    //     }
    // }, [COUNTRY_LIST]);
    // useEffect(() => {
    //     setCountry(COUNTRY_LIST)
    // }, [COUNTRY_LIST])
    // useEffect(() => {
    //     setStateListing(STATE_LIST)
    // }, [countryId])

    const RegisterPet = () => {
        dispatch(registerPet(petName, gender, categoryName, breedName, age, color, weight, unit, countryName, stateName, cityName, desc, base64Image, LOGIN_DATA?.email));
        navigation.goBack()
    }
    const image = require('../Assets/images/bg8.jpg');

    return (
        <View style={styles.container}>
            {/* <ImageBackground source={image} resizeMode="cover" style={styles.bgImage}> */}

            <Loader flag={loader} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View >
                    <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 10, fontFamily: 'Poppins-SemiBold', color: '#000' }}>Create Profile</Text>

                    <TouchableOpacity onPress={handleDocumentSelection} style={{ marginVertical: 10 }}>
                        {
                            imageUri ?
                                <Image
                                    source={{ uri: imageUri }}
                                    resizeMode='cover'
                                    style={{ width: '31%', height: 110, alignSelf: 'center', borderRadius: 100 }}
                                />
                                :

                                <Image
                                    source={require("../Assets/profileImg.png")}
                                    resizeMode='cover'
                                    style={{ width: '31%', height: 110, alignSelf: 'center', borderRadius: 100 }}
                                />
                        }


                    </TouchableOpacity>

                    <View>
                        <View style={styles.formContainer}>
                            <View>
                                <Text
                                    style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                    Mobile*
                                </Text>
                                <TextInput
                                    autoCompleteType="email"
                                    keyboardType="numeric"
                                    underlineColorAndroid="transparent"
                                    textContentType="emailAddress"
                                    placeholder="Enter mobile number"
                                    onChangeText={(text) => setPetname(text)}
                                    style={styles.input1}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text
                                    style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                    DOB *
                                </Text>
                                <TouchableOpacity onPress={() => setOpen(true)} style={styles.input1} >
                                    <Text style={styles.dateText}>{date.toDateString()}</Text>
                                </TouchableOpacity>
                                {/* 
                                    <TextInput
                                        autoCompleteType="email"
                                        keyboardType="email-address"
                                        underlineColorAndroid="transparent"
                                        textContentType="emailAddress"
                                        placeholder="Enter mobile number"
                                        onChangeText={(text) => setPetname(text)}
                                        style={styles.input1}
                                    /> */}
                                <DatePicker
                                    modal
                                    open={open}
                                    date={date}
                                    mode="date"
                                    maximumDate={new Date()}  // Users can't select a future date
                                    onConfirm={(date) => {
                                        setOpen(false);
                                        setDate(date);
                                    }}
                                    onCancel={() => {
                                        setOpen(false);
                                    }}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text
                                    style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                    Website link
                                    *
                                </Text>

                                <TextInput
                                    style={styles.input1}
                                    // value={url}
                                    // onChangeText={setUrl}
                                    placeholder="Enter URL"
                                    keyboardType="url"
                                    autoCapitalize="none"
                                    textContentType="URL"
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text
                                    style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                    languages
                                </Text>
                                < Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    itemTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    data={languages}
                                    maxHeight={200}
                                    labelField="name"
                                    valueField="name"
                                    placeholder={!isFocus ? 'Select item' : '...'}
                                    value={language}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    // onConfirmSelectItem={(item)=>{documentTypes(item)}}
                                    onChange={item => {

                                        setIsFocus(false);

                                        setLanguage(item?.name)

                                    }}
                                //   renderLeftIcon={() => (
                                //     <AntDesign
                                //       style={styles.icon}
                                //       color={isFocus ? 'blue' : 'black'}
                                //       name="Safety"
                                //       size={20}
                                //     />
                                //   )}
                                />
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <Text
                                    style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                    Intrested In
                                </Text>
                                <TextInput
                                    autoCompleteType="email"
                                    underlineColorAndroid="transparent"
                                    textContentType="emailAddress"
                                    placeholder="Intrested"
                                    onChangeText={(text) => setAge(text)}
                                    style={styles.input1}
                                />
                            </View>





                            <View style={{ marginBottom: 10 }}>
                                <Text
                                    style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                    Address*
                                </Text>
                                <TextInput
                                    autoCompleteType="email"
                                    keyboardType="email-address"
                                    underlineColorAndroid="transparent"
                                    textContentType="emailAddress"
                                    placeholder="Address"
                                    onChangeText={(text) => setDesc(text)}
                                    style={styles.textArea}
                                />
                            </View>
                            {/* <View style={{ marginBottom: 10 }}>
                                <Text
                                    style={{ alignSelf: 'flex-start', padding: 5, color: '#000',fontFamily:'Poppins-Regular' }}>
                                    Attachments*
                                </Text>
                                <Text
                                    // key={index.toString()}
                                    style={styles.uri}
                                    numberOfLines={1}
                                    ellipsizeMode={'middle'}>
                                    {fileResponse ? fileResponse[0]?.name : null}
                                </Text>
                                <Text></Text>
                                <Button title="Choose File 📑" onPress={handleDocumentSelection} />
                            </View> */}
                            <View style={{ marginBottom: 10, marginTop: 20 }}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => RegisterPet()}
                                >
                                    <Text style={styles.textStyle}>Submit</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* </ImageBackground> */}
        </View>
    )
}

export default CreateProfile

const styles = StyleSheet.create({


    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: wp(30),
        alignSelf: 'flex-end',
        //alignSelf: 'flex-end',
    },
    buttonOpen: {
        backgroundColor: '#8AB645',
    },
    buttonClose: {
        backgroundColor: '#8AB645',
    },
    dropdown: {
        height: 40,
        borderColor: 'gray',
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
    uri: {
        color: 'gray'
    },
    input: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: '100%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderColor: 'gray',
    },
    input1: {
        width: '100%',
        alignSelf: 'center',
        borderWidth: 0.5,
        marginBottom: 10,
        borderRadius: 5,
        height: 40,
        // borderColor:'gray',
        // borderLeftColor:'gray'
    },
    formContainer: {
        width: '90%',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: 'gray',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    dateText: {
        color: '#000',
        fontFamily: 'Poppins-Regular',
        marginTop: 10,
        marginLeft: 5
    }
})