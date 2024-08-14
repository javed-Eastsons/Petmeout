import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput, ScrollView, Image, Alert } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
// import RNFS from 'react-native-fs';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { countryList, stateList, cityList, categoryList, breedList, registerPet } from '../Redux/Actions/Petmeout';
import { Loader } from '../Component/Loader';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
const RegisterPet = () => {
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
    const [breedName, setBreedName] = useState()
    const [fileResponse, setFileResponse] = useState();
    const [petName, setPetname] = useState();
    const [desc, setDesc] = useState()
    const [age, setAge] = useState();
    const [weight, setWeight] = useState();
    const [color, setColor] = useState();
    const [gender, setGender] = useState()
    const [pincode, setPincode] = useState('')
    const [unit, setUnit] = useState()
    const [countryName, setCountryName] = useState()
    const [stateName, setStateName] = useState()
    const [cityName, setCityName] = useState()
    const [base64, setBase64] = useState('');
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState('');

    const { LOGIN_DATA } = useSelector(state => state.PetmeOutReducer);
    const { COUNTRY_LIST } = useSelector(state => state.PetmeOutReducer);
    const { STATE_LIST } = useSelector(state => state.PetmeOutReducer);
    const { CITY_LIST } = useSelector(state => state.PetmeOutReducer);
    const { CATEGORY_LIST } = useSelector(state => state.PetmeOutReducer);
    const { BREED_LIST } = useSelector(state => state.PetmeOutReducer);
    const [errors, setErrors] = useState({});
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    var result = Object.entries(STATE_LIST);
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    console.log(year, 'datedatedate')

    // console.log(BREED_LIST, 'BREED_LISTBREED_LISTBREED_LISTBREED_LISTBREED_LIST')
    // console.log(base64Image, 'base64Imagebase64Image')
    // console.log(CITY_LIST, 'CITY_LIST')
    // console.log(STATE_LIST, 'aaaaaaaaaa')
    // console.log(CATEGORY_LIST, 'CATEGORY_LISTREGISTER')
    const onChangeYear = (text) => {
        setYear(text)
    }
    const unitData = [
        {
            id: 1,
            name: 'Kg'
        },
        {
            id: 2,
            name: 'lbs'
        }
    ]
    const genderData = [
        {
            id: 1,
            name: 'Male'
        },
        {
            id: 2,
            name: 'Female'
        }
    ]

    const data = [
        {
            id: 1,
            name: 'Tax Documents',
            leafCloud: 2,
            myFiles: 6,
        },
        {
            id: 2,
            name: 'Fax Documents',
            leafCloud: 2,
            myFiles: 5,
        },
        {
            id: 3,

            name: 'GST',
            leafCloud: 2,
            myFiles: 3,
        },
        {
            id: 4,

            name: 'Finance',
            leafCloud: 2,
            myFiles: 1,
        },
        {
            id: 5,

            name: 'Personal Docs',
            leafCloud: 2,
            myFiles: 0,
        },
        {
            id: 6,

            name: 'Family Docs',
            leafCloud: 2,
            myFiles: 2,
        },
    ];


    const validate = () => {
        const newErrors = {};

        //   if (!email) {
        //     newErrors.email = 'Email is required';
        //   } else if (!/\S+@\S+\.\S+/.test(email)) {
        //     newErrors.email = 'Email address is invalid';
        //   }
        if (!petName) {
            newErrors.petName = 'PetName is required';
        }
        if (!categoryName) {
            newErrors.categoryName = 'CategoryName is required';
        }
        if (!breedName) {
            newErrors.breedName = 'BreedName is required';
        }

        if (!gender) {
            newErrors.gender = 'gender is required';
        }
        if (!weight) {
            newErrors.weight = 'Weight is required';
        }
        if (!unit) {
            newErrors.unit = 'unit is required';
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
        if (!base64Image) {
            newErrors.base64Image = 'Image is required';
        }
        if (!pincode) {
            newErrors.pincode = 'Pincode is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    console.log(categoryId, 'categoryId')

    const pickImageFromGallery = () => {
        let options = {
            mediaType: 'photo',
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const uri = response.assets[0].uri;
                setImageUri(uri);
                convertToBase64(uri)
            }
        });
    };
    const convertToBase64 = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.log('Error converting image to base64:', error);
        }
    };


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
    }, [categoryId]);
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
        if (validate()) {
            setLoader(true);
            dispatch(registerPet(petName, gender, categoryName, breedName, color, weight, unit, countryName, stateName, cityName, desc, base64Image, LOGIN_DATA?.email, pincode, year, month));
            navigation.goBack()
            setTimeout(() => {
                setLoader(false);
            }, 2000);
        }
    }
    return (
        <View >
            <Loader flag={loader} />
            <ScrollView>
                <View >
                    <TouchableOpacity onPress={pickImageFromGallery} style={{ marginVertical: 10 }}>
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
                        {errors.base64Image && <Text style={[styles.error, { textAlign: 'center' }]}>{errors.base64Image}</Text>}


                    </TouchableOpacity>

                    <View style={{ width: '60%', alignSelf: 'center', backgroundColor: '#fff', padding: 5, marginBottom: 10 }}>
                        <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'Poppins-Regular', color: '#000' }}>{LOGIN_DATA?.email}</Text>
                    </View>


                    <View>
                        <View style={styles.formContainer}>
                            <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 10, fontFamily: 'Poppins-SemiBold', color: '#000' }}>Register Your Pet</Text>
                            <View>
                                <Text
                                    style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                    Pet Name*
                                </Text>
                                <TextInput
                                    autoCompleteType="email"
                                    keyboardType="email-address"
                                    underlineColorAndroid="transparent"
                                    textContentType="emailAddress"
                                    placeholder="Enter Your Pet Name"
                                    onChangeText={(text) => setPetname(text)}
                                    style={styles.input1}
                                />
                                {errors.petName && <Text style={styles.error}>{errors.petName}</Text>}
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text
                                    style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                    Category *
                                </Text>

                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    itemTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    search
                                    data={CATEGORY_LIST}
                                    maxHeight={200}
                                    labelField="cat_name"
                                    valueField="cat_name"
                                    placeholder={!isFocus ? 'Select item' : '...'}
                                    value={categoryName}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    // onConfirmSelectItem={(item)=>{documentTypes(item)}}
                                    onChange={item => {

                                        setIsFocus(false);
                                        setCategoryId(item?.cat_id)
                                        setCategoryName(item?.cat_name)

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
                                {errors.categoryName && <Text style={styles.error}>{errors.categoryName}</Text>}
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text
                                    style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                    Breed*
                                </Text>

                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    itemTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    data={BREED_LIST}
                                    maxHeight={200}
                                    labelField="breed_name"
                                    valueField="breed_name"
                                    placeholder={!isFocus ? 'Select item' : '...'}
                                    value={breedName}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setIsFocus(false);
                                        setBreedName(item?.breed_name)
                                    }}

                                />
                                {errors.breedName && <Text style={styles.error}>{errors.breedName}</Text>}
                            </View>

                            <View style={{ marginBottom: 10, width: '100%', flexDirection: 'row' }}>
                                <View style={{ width: '90%' }}>
                                    <Text
                                        style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                        DOB*
                                    </Text>
                                    <TextInput
                                        style={styles.inputA}
                                        placeholder="Enter year or choose on calender"
                                        keyboardType="numeric"
                                        maxLength={10}
                                        value={year}
                                        onChangeText={onChangeYear}
                                    />


                                </View>
                                <View style={styles.calender}>
                                    <TouchableOpacity onPress={() => setOpen(true)}>
                                        <Image
                                            source={require("../Assets/img/icons/calendar.png")}
                                            style={{
                                                width: 25,
                                                height: 25,



                                            }} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                mode="date"
                                onConfirm={(selectedDate) => {
                                    setOpen(false);
                                    setDate(selectedDate);
                                    setYear(moment(selectedDate).format('DD/MM/YYYY'));
                                }}
                                onCancel={() => {
                                    setOpen(false);
                                }}
                            />
                            <View style={{ marginBottom: 10 }}>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: wp(60) }}>
                                        <Text
                                            style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                            Weight*
                                        </Text>
                                        <TextInput
                                            autoCompleteType="email"
                                            keyboardType="numeric"
                                            underlineColorAndroid="transparent"
                                            textContentType="emailAddress"
                                            placeholder="Weight"
                                            onChangeText={(text) => setWeight(text)}
                                            style={styles.input1}
                                        />
                                        {errors.weight && <Text style={styles.error}>{errors.weight}</Text>}

                                    </View>
                                    <View style={{ width: wp(22), marginLeft: 5 }}>
                                        <Text
                                            style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                            Unit
                                        </Text>

                                        <Dropdown
                                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            itemTextStyle={styles.selectedTextStyle}
                                            iconStyle={styles.iconStyle}
                                            data={unitData}
                                            maxHeight={200}
                                            labelField="name"
                                            valueField="name"
                                            placeholder={!isFocus ? 'Select item' : '...'}
                                            value={unit}
                                            onFocus={() => setIsFocus(true)}
                                            onBlur={() => setIsFocus(false)}
                                            onChange={item => {
                                                setIsFocus(false);
                                                setUnit(item?.name)
                                            }}

                                        />
                                        {errors.unit && <Text style={styles.error}>{errors.Unit}</Text>}
                                    </View>

                                </View>
                            </View>


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
                                    style={styles.input1}
                                />
                                {errors.pincode && <Text style={styles.error}>{errors.pincode}</Text>}
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text
                                    style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                    Gender*
                                </Text>

                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    itemTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    data={genderData}
                                    maxHeight={200}
                                    labelField="name"
                                    valueField="name"
                                    placeholder={!isFocus ? 'Select item' : '...'}
                                    value={gender}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setIsFocus(false);
                                        setGender(item?.name)
                                    }}

                                />
                                {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <Text
                                    style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                    Color*
                                </Text>
                                <TextInput
                                    autoCompleteType="email"
                                    keyboardType="email-address"
                                    underlineColorAndroid="transparent"
                                    textContentType="emailAddress"
                                    placeholder="Color"
                                    onChangeText={(text) => setColor(text)}
                                    style={styles.input1}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text
                                    style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                    Description
                                </Text>
                                <TextInput
                                    autoCompleteType="email"
                                    keyboardType="email-address"
                                    underlineColorAndroid="transparent"
                                    textContentType="emailAddress"
                                    placeholder="Description"
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
                                    <Text style={styles.textStyle}>Register</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default RegisterPet

const styles = StyleSheet.create({
    calender: {
        width: '10%', alignSelf: 'center', marginTop: 17, padding: 5, paddingLeft: 2,
        borderRightWidth: 1, borderTopWidth: 1, borderBottomWidth: 1, borderTopRightRadius: 8, borderBottomRightRadius: 8, borderColor: '#ccc',
        height: 40,

    },

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
        backgroundColor: '#fff',
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
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#000',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    error: {
        color: 'red',
        fontFamily: 'Poppins-Regular'
        // marginTop: 5,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    inputA: {
        height: 40,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 16,
        fontSize: 16,
        borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
})