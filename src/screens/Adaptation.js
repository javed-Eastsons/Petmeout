import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { AdoptListFilter, AdoptPetList, breedList, categoryList, CreatePetAdoptation } from '../Redux/Actions/Petmeout';
import ImagePicker from 'react-native-image-crop-picker';
import { Globals } from '../Config';
import LottieView from 'lottie-react-native';
import { Loader } from '../Component/Loader';

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
const Adaptation = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [categoryId, setCategoryId] = useState()
    const [categoryName, setCategoryName] = useState(null)
    const [breedName, setBreedName] = useState(null)
    const [gender, setGender] = useState(null)
    const [loader, setLoader] = useState(false);
    const [title, setTitle] = useState(null)
    const [age, setAge] = useState(null)
    const [isFocus, setIsFocus] = useState(false);
    const [files, setFiles] = useState([])
    const [base64File, setBase64File] = useState([]);
    const [msg, setMsg] = useState(null)
    const [allAdopts, setAllAdopts] = useState([])

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { CATEGORY_LIST, LOGIN_PET, ADOPT_LIST } = useSelector(state => state.PetmeOutReducer);
    const { BREED_LIST } = useSelector(state => state.PetmeOutReducer);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);

    };
    const closeModal = () => {
        setModalVisible(!isModalVisible);
        setTitle(null)
        setAge(null)
        setGender(null)
        setCategoryName(null)
        setBreedName(null)
        setMsg(null)
        setBase64File([])

    };
    console.log(ADOPT_LIST, 'ADOPT_LISTADOPT_LISTADOPT_LIST');

    const selectImagesAndVideos = (type) => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'Photo', // allows both images and videos to be selected
            cropping: true
        }).then(files => {
            console.log(files, 'filesfilesfilesfiles');
            setFiles(files)
            // Handle the selected images and videos here
            // Example: Display them in your app, upload to server, etc.
        }).catch(error => {
            console.error(error);
        });
    };
    const convertFilesToBase64 = async (files) => {

        const base64Array = [];

        for (const file of files) {
            try {
                console.log('Converting file:', file.path);
                // const base64 = await convertToBase64(file.path);s
                if (file.path) {
                    base64Array.push(file.path);
                    // console.log('Base64 string added:', base64);
                } else {
                    console.log('Failed to convert file to Base64:', file.path);
                }
            } catch (error) {
                console.log('Error in converting file to Base64:', error);
            }
        }
        console.log(base64Array, 'base64Arraybase64Array')


        return base64Array;
    };

    // useEffect(() => {
    //     const listData = [...ADOPT_LIST];
    //     // const reversedList = listData.reverse()
    //     setAllAdopts(listData);
    // }, [ADOPT_LIST]);

    const filterListByCat = (item) => {
        setSelectedCategory(item.cat_id)
        setLoader(true);
        dispatch(AdoptListFilter(item?.cat_name));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }

    useEffect(() => {
        convertFilesToBase64(files).then((base64Array) => {
            // console.log('Base64 Array:', base64Array);
            setBase64File(base64Array)
            // Do something with the base64Array, like updating state
        });
    }, [files])


    const onSubmitAdopt = () => {
        if (title && age && categoryName && breedName && base64File && gender) {
            setLoader(true);
            dispatch(CreatePetAdoptation(LOGIN_PET?.pet_id, title, age, categoryName, breedName, msg, base64File, gender, navigation));
            setModalVisible(false)
            setTitle(null)
            setAge(null)
            setCategoryName(null)
            setBreedName(null)
            setMsg(null)
            setBase64File(null)
            setGender(null)
            setTimeout(() => {
                setLoader(false);
            }, 2000);
        } else {
            Alert.alert('Please Fill Required Fields!')
        }
    }
    useEffect(() => {
        setLoader(true);
        dispatch(AdoptPetList(LOGIN_PET?.pet_id));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [LOGIN_PET?.pet_id]);
    

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
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('AdaptationDetails', { AdoptDetail: item }) }}>
            <Image source={{ uri: Globals?.categoriesImagePath + item.adoptionsImages[0]?.adoptions_images }} style={styles.petImage} />
            <View style={styles.cardContent}>
                <Text style={styles.petName}>{item.title}</Text>
                <Text style={styles.petDetails}>{item.category}</Text>
                <Text style={styles.petDetails}>{item.age} years</Text>

                <TouchableOpacity style={styles.adoptBtn}>
                    <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-Regular' }}>Adopt</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginRight: 10, marginTop: 10 }}>
                {
                    item?.gender == "Male" ?

                        <Image style={{ height: 20, width: 20 }} source={require('../Assets/img/icons/maleGender.png')} />
                        :
                        <Image style={{ height: 20, width: 20 }} source={require('../Assets/img/icons/femaleGender.png')} />

                }
            </View>

        </TouchableOpacity>
    );

    const renderItemCAT = ({ item }) => {
        const isSelected = selectedCategory === item.cat_id; // Check if the category is selected

        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    style={[
                        styles.card1,
                        { backgroundColor: isSelected ? '#f1f1f1' : '#FFFFFF' } // Change color when selected
                    ]}
                    onPress={() => filterListByCat(item)} // Set selected category on press  uri: Globals?.ImagePathCAT + item.cat_image
                >
                    {/* <Image source={item.cat_name == 'Dog' ? require('../Assets/img/icons/dog.png') : item.cat_name == 'Cat' ? require('../Assets/img/icons/cat.png') : item.cat_name == 'Horse' ? require('../Assets/img/icons/horse.png') : null} style={styles.petImage1} /> */}
                    <Image source={{ uri: Globals?.ImagePathCAT + item?.cat_image }} style={styles.petImage1} />

                </TouchableOpacity>
                <Text style={styles.petName1}>{item.cat_name}</Text>
            </View>
        );
    };
    return (
        <View style={{ flex: 1, padding: 10,backgroundColor:'#fff' }}>
            <Loader flag={loader}/>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                <Text style={{ fontSize: 20, fontFamily: 'Poppins-SemiBold', alignSelf: 'center' }}>Adopt</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleModal}
                >
                    <Text style={styles.buttonText}>Add a Post</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                data={CATEGORY_LIST}
                showsHorizontalScrollIndicator={true}
                // showsVerticalScrollIndicator={false}
                renderItem={renderItemCAT}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.container1}
            />
            {
                ADOPT_LIST == null ?
                    <View style={{position:'absolute',top:hp(35) ,alignSelf:'center'}}>
                        <LottieView
                            source={require("../Assets/lottie/notFound.json")}
                            style={{
                                width: 150,
                                height: 150,
                                alignSelf: 'center',

                            }}
                            autoPlay loop
                        />
                        {/* <Text style={{ textAlign: 'center', fontSize: 17, marginVertical: 10, fontFamily: 'Poppins-Bold' }}>No Friend Request Yet</Text>
                        <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'Poppins-Regular' }}>Your Friends Requests will appear here once you've received them</Text> */}
                    </View>
                    :

                    <FlatList
                        data={ADOPT_LIST}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.adoptions_id}
                        contentContainerStyle={styles.container}
                    />
            }
            <Modal isVisible={isModalVisible} style={styles.modal} animationOutTiming={700} backdropTransitionOutTiming={800}>

                <View style={styles.modalContent}>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 19, color: '#000' }}>Required Details:</Text>

                    <TouchableOpacity title="Hide modal" onPress={closeModal} style={{ position: 'absolute', right: 10, top: 20 }} >
                        <Icon size={20} name='close' color='#000' />
                    </TouchableOpacity>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <TouchableOpacity style={styles.inputContainer} onPress={selectImagesAndVideos}>
                                <Text style={styles.inputText}>
                                    {imageUri ? imageName[imageName.length - 1] : 'Choose Image from Gallery'}
                                </Text>
                            </TouchableOpacity>
                            {/* {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.image} />
            )} */}

                        </View>
                        <View>
                            <Text
                                style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                Title*
                            </Text>
                            <TextInput
                                autoCompleteType="email"
                                keyboardType="email-address"
                                underlineColorAndroid="transparent"
                                textContentType="emailAddress"
                                placeholder="Enter Your Pet Name"
                                value={title}
                                onChangeText={(text) => setTitle(text)}
                                style={styles.input1}
                            />
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
                        </View>
                        <View>
                            <Text
                                style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                Age*
                            </Text>
                            <TextInput
                                autoCompleteType="email"
                                keyboardType="numeric"
                                underlineColorAndroid="transparent"
                                textContentType="emailAddress"
                                placeholder="Enter your age in year i.e  2 or 0.5"
                                value={age}
                                onChangeText={(text) => setAge(text)}
                                style={styles.input1}
                            />
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
                                searchPlaceholder='Search...'
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

                            />
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
                                search
                                searchPlaceholder='Search...'
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
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text
                                style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                Message
                            </Text>
                            <TextInput
                                autoCompleteType="email"
                                keyboardType="email-address"
                                underlineColorAndroid="transparent"
                                textContentType="emailAddress"
                                placeholder="Message"
                                value={msg}
                                onChangeText={(text) => setMsg(text)}
                                style={styles.textArea}
                            />
                        </View>


                        <TouchableOpacity style={[styles.btn, { height: 40, backgroundColor: '#8AB645', borderRadius: 5, marginTop: 10, width: '40%', alignSelf: 'flex-end', marginTop: 10 }]}
                            onPress={onSubmitAdopt}
                        >
                            <Text style={{ color: '#fff', fontSize: 13, fontFamily: 'Poppins-SemiBold', marginTop: 10, textAlign: 'center' }}>Submit</Text>

                        </TouchableOpacity>
                    </ScrollView>
                </View>


            </Modal>
        </View>
    )
}

export default Adaptation

const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        padding: 10,
        // backgroundColor: '#f5f5f5',
    },
    container1: {
        // flexGrow: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
        // backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'flex-start',
        marginTop: 10,
        paddingLeft: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        // padding: 5,
        // height: 110,
    },
    card1: {
        backgroundColor: '#fff',
        borderRadius: 10,
        // marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        // flexDirection: 'row',
        padding: 5,
        height: 50,
        width: 50,
        marginLeft: 10,
        
    },
    petImage: {
        width: 90,
        height: 110,
        borderRadius: 8,
        marginRight: 15,
        resizeMode: 'contain'
    },
    petImage1: {
        width: 41,
        height: 41,
        borderRadius: 8,
        resizeMode: 'cover',
        alignSelf: 'center'
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    petName: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',

    },
    petName1: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        marginLeft: 15,
        height: 30


    },
    petDetails: {
        fontSize: 13,
        color: '#666',
        marginBottom: 5,
        fontFamily: 'Poppins-Regular'
    },
    petDetails1: {
        fontSize: 13,
        color: '#666',
        fontFamily: 'Poppins-Regular',
        marginLeft: 5
    },
    button: {
        backgroundColor: '#8AB645',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        height: hp(10),
        width: wp(40),
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    adoptBtn: {
        backgroundColor: '#4CAF50',
        width: 50,
        padding: 2,
        borderRadius: 15,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#8AB645', // Blue color
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        height: 600, // Fixed height for the modal content
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
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
        // borderColor:'gray',
        // borderLeftColor:'gray'
    },
    inputContainer: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Poppins-Regular',
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
})