import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, TextInput, ScrollView, Alert ,RefreshControl} from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { allMatingListing, breedList, categoryList, petMatingRegister, petMatingSorting } from '../Redux/Actions/Petmeout';
import { Loader } from '../Component/Loader';
import { launchImageLibrary } from 'react-native-image-picker';
import LottieView from 'lottie-react-native';
import { Globals } from '../Config';

const { width } = Dimensions.get('window');


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

const Mating = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isFocus, setIsFocus] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleSort, setModalVisibleSort] = useState(false)
    const [categoryId, setCategoryId] = useState()
    const [categoryName, setCategoryName] = useState(null)
    const [breedName, setBreedName] = useState(null)
    const [gender, setGender] = useState(null)
    const [loader, setLoader] = useState(false);
    const [petName, setPetName] = useState(null)
    const [age, setAge] = useState(null)
    const [msg, setMsg] = useState(null)
    const [allMatings, setAllMatings] = useState([])
    const { CATEGORY_LIST } = useSelector(state => state.PetmeOutReducer);
    const { BREED_LIST } = useSelector(state => state.PetmeOutReducer);
    const { MATING_LIST,LOGIN_PET } = useSelector(state => state.PetmeOutReducer);
    // console.log(MATING_LIST.reverse(),'MATING_LISTMATING_LISTMATING_LIST')
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(allMatingListing());
        setTimeout(() => {
            setRefreshing(false);
        }, 2000); // Time for refresh
    };
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setImageBase64(null)
        setImageUri(null)
        setGender(null)
        setAge(null)
        setCategoryName(null)
        setBreedName(null)
        setMsg(null)
    };
    const toggleModalSort = () => {
        setModalVisibleSort(!isModalVisibleSort);
    };
    useEffect(() => {
        setLoader(true);
        dispatch(categoryList());
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);
    useEffect(() => {
        setLoader(true);
        dispatch(allMatingListing());
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

    const [imageUri, setImageUri] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);

    const handleChooseImage = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, async (response) => {
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
                setImageBase64(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.log('Error converting image to base64:', error);
        }
    };

    // const reversedMating = MATING_LIST?.reverse()
    const imageName = imageUri?.split('/');
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={()=>navigation.navigate('MatingDetails',{Mat :item})}>
                <Image
                    source={{ uri: Globals?.categoriesImagePath + item.pet_image }}
                    style={styles.image}
                />
                <View style={styles.detailsContainer}>
                    <Text style={styles.petName}>{item.category}</Text>
                    <Text style={styles.catName}>{item.breed} Years</Text>
                    <Text style={styles.catName}>{item.age} Years</Text>
                    <Text style={styles.owner}>{item.gender}</Text>
                    {/* <Text style={styles.msg}>{item.msg}</Text> */}
                </View>
                <TouchableOpacity style={styles.cornerOverlay} >
                    <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-Regular' }}>Talk</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };
    const onSubmit = () => {

        if ( age && categoryName && breedName && imageBase64 && gender) {
            setLoader(true);
            dispatch(petMatingRegister(LOGIN_PET?.pet_id, age, categoryName, breedName, msg, imageBase64, gender, navigation));

            setModalVisible(false)
            setPetName(null)
            setAge(null)
            setCategoryName(null)
            setBreedName(null)
            setMsg(null)
            setImageBase64(null)
            setImageUri(null)
            setTimeout(() => {
                setLoader(false);
            }, 2000);
        } else {
            Alert.alert('Please Fill Required Fields!')
        }


    }
    const onSortList = () => {
        setLoader(true);
        dispatch(petMatingSorting(categoryName, breedName, gender, navigation));
        setModalVisibleSort(false)

        setCategoryName(null)
        setBreedName(null)
        setGender(null)
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }
    useEffect(() => {
        const listData = [...MATING_LIST];
        const reversedList = listData.reverse()
        setAllMatings(reversedList);
    }, [MATING_LIST]);
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Loader flag={loader} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.headText}>Mating</Text>
                    <TouchableOpacity onPress={toggleModalSort}>
                        <LottieView
                            source={require("../Assets/lottie/sort.json")}
                            style={{
                                width: 50,
                                height: 50,
                                alignSelf: 'center',

                            }}
                            autoPlay loop
                        />
                    </TouchableOpacity>
                </View>


                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleModal}
                >
                    <Text style={styles.buttonText}>Add a Post</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={allMatings}
                renderItem={renderItem}
                keyExtractor={item => item.post_id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
            />
            <Modal isVisible={isModalVisible} style={styles.modal} animationOutTiming={700} backdropTransitionOutTiming={800}>

                <View style={styles.modalContent}>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 19, color: '#000' }}>Mating Required Details:</Text>

                    <TouchableOpacity title="Hide modal" onPress={toggleModal} style={{ position: 'absolute', right: 10, top: 20 }} >
                        <Icon size={20} name='close' color='#000' />
                    </TouchableOpacity>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <TouchableOpacity style={styles.inputContainer} onPress={handleChooseImage}>
                                <Text style={styles.inputText}>
                                    {imageUri ? imageName[imageName.length - 1] : 'Choose Image from Gallery'}
                                </Text>
                            </TouchableOpacity>
                            {/* {imageUri && (
                                <Image source={{ uri: imageUri }} style={styles.image} />
                            )} */}

                        </View>
                        {/* <View>
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
                                value={petName}
                                onChangeText={(text) => setPetName(text)}
                                style={styles.input1}
                            />
                        </View> */}

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


                        <TouchableOpacity onPress={onSubmit} style={[styles.btn, { height: 40, backgroundColor: '#8AB645', borderRadius: 5, marginTop: 10, width: '40%', alignSelf: 'flex-end', marginTop: 10 }]}>
                            <Text style={{ color: '#fff', fontSize: 13, fontFamily: 'Poppins-SemiBold', marginTop: 10, textAlign: 'center' }}>Submit</Text>

                        </TouchableOpacity>
                    </ScrollView>
                </View>


            </Modal>

            <Modal isVisible={isModalVisibleSort} style={styles.modal} animationOutTiming={700} backdropTransitionOutTiming={800}>
                <View style={styles.modalContentSort}>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 19, color: '#000' }}>Sort by:</Text>

                    <TouchableOpacity title="Hide modal" onPress={toggleModalSort} style={{ position: 'absolute', right: 10, top: 20 }} >
                        <Icon size={20} name='close' color='#000' />
                    </TouchableOpacity>


                    <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <Text
                            style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                            Category
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
                        <Text style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>Breed:</Text>
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
                        <Text style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>Gender</Text>
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
                                setGender(item?.name)
                                setIsFocus(false);
                            }}

                        />

                    </View>

                    <TouchableOpacity onPress={onSortList} style={[styles.btn, { height: 40, backgroundColor: '#fbd349', borderRadius: 5, marginTop: 15, width: '40%', alignSelf: 'flex-end', marginTop: 10 }]}>
                        <Text style={{ color: '#fff', fontSize: 13, fontFamily: 'Poppins-SemiBold', marginTop: 10, textAlign: 'center' }}>Done</Text>

                    </TouchableOpacity>
                </View>
            </Modal>
        </View>

    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        borderBottomRightRadius: 35
    },
    image: {
        width: 90,
        height: 108,
        borderRadius: 8,
        resizeMode: 'cover'
    },
    detailsContainer: {
        flex: 1,
        padding: 10,
    },
    petName: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 1,
    },
    catName: {
        fontSize: 12,
        color: '#666',
        // marginBottom: 5,
        fontFamily: 'Poppins-Regular'
    },
    owner: {
        fontSize: 12,
        color: '#888',
        fontFamily: 'Poppins-Regular'
    },
    msg: {
        fontSize: 14,
    },
    likes: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    comments: {
        fontSize: 14,
        marginBottom: 5,
    },
    city: {
        fontSize: 14,
        color: '#333',
    },
    headText: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        marginLeft: 15,
        marginTop: 10,
        color: '#000'
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
    cornerOverlay: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 35,
        height: 30,
        backgroundColor: '#fadd79', // Color of the corner
        borderBottomRightRadius: 30,
        padding: 2,
        borderTopLeftRadius: 5
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
    modalContentSort: {
        height: 380, // Fixed height for the modal content
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
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
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: 'gray',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
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
    labelB: {
        fontSize: 15,
        color: '#000',

        fontFamily: 'Poppins-SemiBold'
    },
});

export default Mating;
