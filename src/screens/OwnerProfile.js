import {
    StyleSheet, Text, View, TouchableOpacity, Button, TextInput, ScrollView,
    Image, ImageBackground, Alert, FlatList
} from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { petListing, updateUserProfile, userDetails } from '../Redux/Actions/Petmeout';
import { Loader } from '../Component/Loader';
import { useNavigation } from '@react-navigation/native';
import { Globals } from '../Config';

const CreateProfile = () => {
    const [base64File, setBase64File] = useState();
    const [base64Image, setBase64Image] = useState();
    const [imageUri, setImageUri] = useState();
    const [base64String, setBase64String] = useState(null);
    const { PET_LIST } = useSelector(state => state.PetmeOutReducer);

    const [isFocus, setIsFocus] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const { USER_DATA } = useSelector(state => state.PetmeOutReducer);
    const { LOGIN_DATA } = useSelector(state => state.PetmeOutReducer);
    const [loader, setLoader] = useState(false);
    const [isEdit, setIsEdit] = useState(false)

    const navigation = useNavigation();
    const dispatch = useDispatch();
    console.log(USER_DATA, 'USER_DATAUSER_DATA')
    console.log(imageUri, 'imageUriimageUri')
    const genderData = [
        { id: 1, name: 'Male' },
        { id: 2, name: 'Female' }
    ];
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
                setBase64String(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.log('Error converting image to base64:', error);
        }
    };


    useEffect(() => {
        setLoader(true);
        console.log(LOGIN_DATA, 'LOGIN_DATA');
        if (LOGIN_DATA?.user_id) {
            console.log(LOGIN_DATA.user_id, 'Dispatching userDetails with user_id');
            dispatch(userDetails(LOGIN_DATA.user_id));
        } else {
            console.error('No user_id found in LOGIN_DATA');
        }
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [LOGIN_DATA, dispatch]);

    useEffect(() => {
        console.log(USER_DATA, 'USER_DATA in useEffect');
        if (USER_DATA) {

            setUsername(USER_DATA[0]?.username || '');
            setEmail(USER_DATA[0]?.email || '');
            setGender(USER_DATA[0]?.gender || '');
            if (USER_DATA[0]?.userimg) {
                setImageUri(Globals?.categoriesImagePath + USER_DATA[0]?.userimg || '');
            }

        } else {
            console.error('No USER_DATA found');
        }
    }, [USER_DATA]);

    const onUpdate = () => {
        setLoader(true);
        dispatch(updateUserProfile(LOGIN_DATA.user_id, username, email, gender, base64String));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }
    useEffect(() => {
        setLoader(true);
        dispatch(petListing(LOGIN_DATA?.email, navigation));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <Loader flag={loader} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <TouchableOpacity onPress={pickImageFromGallery} style={{ marginVertical: 10, flexDirection: 'row', alignSelf: 'center' }}>
                        <View style={{ borderWidth: 3, width: '34%', alignSelf: 'center', padding: 5, borderRadius: 70, borderColor: '#fbd349' }}>
                            {imageUri ?
                                <Image source={{ uri: imageUri }} resizeMode='cover' style={styles.imageStyle} />
                                :
                                <Image source={require("../Assets/profileImg.png")} resizeMode='cover' style={styles.imageStyle} />
                            }
                        </View>
                        {
                            isEdit == false ?
                                <TouchableOpacity onPress={() => {
                                    setIsEdit(true)
                                   
                                }}>
                                    <Image source={require("../Assets/img/icons/edit.png")} style={{ width: 20, height: 20 }} />

                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => {
                                    setIsEdit(false)
                                }}>
                                    <Image source={require("../Assets/img/icons/undo.png")} style={{ width: 20, height: 20 }} />

                                </TouchableOpacity>
                        }


                    </TouchableOpacity>
                    <Text style={styles.headerText}>Owner</Text>

                    <View style={styles.formContainer}>
                        <View>
                            <Text style={styles.labelText}>UserName</Text>
                            {
                                isEdit == false ?
                                    <View style={{ borderWidth: 1, height: 40, borderRadius: 5, borderColor: 'gray' }}>
                                        <Text style={{ padding: 10, color: '#000' }}>
                                            {USER_DATA[0]?.username}
                                        </Text>
                                    </View>
                                    :

                                    <TextInput
                                        autoCompleteType="username"
                                        keyboardType="default"
                                        underlineColorAndroid="transparent"
                                        textContentType="username"
                                        value={username}
                                        placeholder="Enter User Name"
                                        onChangeText={(text) => setUsername(text)}
                                        style={styles.input1}
                                    />
                            }
                        </View>
                        <View style={{ marginBottom: 20, marginTop: 20 }}>
                            <Text style={styles.labelText}>Email</Text>
                            {
                                isEdit == false ?
                                    <View style={{ borderWidth: 1, height: 40, borderRadius: 5, borderColor: 'gray' }}>
                                        <Text style={{ padding: 10, color: '#000' }}>
                                            {USER_DATA[0]?.email}
                                        </Text>
                                    </View>
                                    :
                                    <TextInput
                                        autoCompleteType="email"
                                        underlineColorAndroid="transparent"
                                        textContentType="emailAddress"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                        style={styles.input1}
                                    />
                            }
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.labelText}>Gender</Text>
                            {
                                isEdit == false ?
                                    <View style={{ borderWidth: 1, height: 40, borderRadius: 5, borderColor: 'gray' }}>
                                        <Text style={{ padding: 10, color: '#000' }}>
                                            {USER_DATA[0]?.gender}
                                        </Text>
                                    </View>
                                    :
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
                                            setGender(item.name);
                                        }}
                                    />
                            }
                        </View>
                        {
                            isEdit == true ?
                                <View style={{ marginBottom: 10, marginTop: 20 }}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={onUpdate}
                                    >
                                        <Text style={styles.textStyle}>Update</Text>
                                    </TouchableOpacity>
                                </View>
                                : null}

                        {
                            isEdit == false ?
                                <View>
                                    <Text style={styles.labelText}>Pets</Text>
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
                                            <View>
                                                <View>

                                                    <Image
                                                        source={{
                                                            uri: item.image_path,
                                                        }}
                                                        style={styles.profileImg1}
                                                        resizeMode='cover'
                                                    />
                                                </View>
                                                <Text style={{ fontSize: 14, color: '#000', textAlign: 'center', fontFamily: 'Poppins-Regular' }}>{item.pet_name}</Text>
                                            </View>
                                        )}
                                    />
                                </View>
                                :
                                null
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default CreateProfile

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: wp(30),
        alignSelf: 'flex-end',
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
    },
    formContainer: {
        width: '90%',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // margin:5,
        // borderRadius:10,
        // elevation:10
    },
    dateText: {
        color: '#000',
        fontFamily: 'Poppins-Regular',
        marginTop: 10,
        marginLeft: 5
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
        fontFamily: 'Poppins-SemiBold',
        color: '#000'
    },
    imageStyle: {
        width: '100%',
        height: 110,
        alignSelf: 'center',
        borderRadius: 100
    },
    labelText: {
        alignSelf: 'flex-start',
        padding: 5,
        color: '#000',
        fontFamily: 'Poppins-Regular'
    },
    profileImg1: {
        width: 90,
        borderRadius: 10,
        height: 90,
        // marginTop: 30,
        // alignSelf: 'center',
        marginLeft: 10,
        resizeMode: 'contain',


    },
});
