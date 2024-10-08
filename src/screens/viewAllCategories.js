
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, TextInput, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';
import { addCategory, categoryList, deleteCategory, editCategory } from '../Redux/Actions/Petmeout';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Globals } from '../Config/index';
import { Color } from '../Style';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from "react-native-modal";
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';
import AnimatedRangeSlider from '../Component/RangeSlider/AnimatedRangeSlider';

const viewAllCategories = () => {
    const navigation = useNavigation();
    const { CATEGORY_LIST } = useSelector(state => state.PetmeOutReducer);
    const [loader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [base64File, setBase64File] = useState();
    const [base64Image, setBase64Image] = useState()
    const [imageUri, setImageUri] = useState(null);
    const [catName, setCatName] = useState('')
    const [base64String, setBase64String] = useState(null);
    const [isVibrating, setIsVibrating] = useState(false);
    const [showDelModal, setShowDelModal] = useState(false)
    const [catId, setCatId] = useState()
    const [errors, setErrors] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(categoryList()); 
        setTimeout(() => {
            setRefreshing(false);
        }, 2000); // Time for refresh
    };
    const toggleFilterModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const validate = () => {
        const newErrors = {};
        if (!catName) {
            newErrors.catName = 'categoryName is required';
        }
        if (!base64String) {
            newErrors.base64String = 'Image is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const dispatch = useDispatch();
    useEffect(() => {
        setLoader(true);
        dispatch(categoryList());
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);
    console.log(imageUri, 'uriiiiii')
    console.log(CATEGORY_LIST, 'CATEGORY_LISTCATEGORY_LIST')

    const bgImage = require('../Assets/images/pawBG.jpg');

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
    const toggleModal = () => {
        setModalVisible(!modalVisible);
        setCatName('')
        setBase64String(null)
        setImageUri(null)
    };
    const toggleEditModal = () => {
        setEditModalVisible(!editModalVisible);
        setCatName('')
        setBase64String(null)
        setImageUri(null)
    };
    const onSubmit = () => {

        if (validate()) {


            setLoader(true);
            dispatch(addCategory(catName, base64String));
            dispatch(categoryList());
            setModalVisible(!modalVisible);
            setCatName('')
            setBase64String(null)
            setImageUri(null)
            setTimeout(() => {
                setLoader(false);
            }, 2000)
        }
    }
    const onEditSubmit = () => {
        if (validate()) {
            setLoader(true);
            dispatch(editCategory(catId, catName, base64String));
            dispatch(categoryList());
            setEditModalVisible(!editModalVisible);
            setCatName('')
            setBase64String(null)
            setImageUri(null)
            setTimeout(() => {
                setLoader(false);
            }, 2000)
        }
    }
    const openModal = (id) => {
        setCatId(id)
        setShowDelModal(true)
        setIsVibrating(false)
    }
    const openEditModal = (id) => {
        setCatId(id)
        setEditModalVisible(true)
        setIsVibrating(false)
    }
    const deleteCategoryPet = () => {
        setLoader(true);
        dispatch(deleteCategory(catId, navigation));
        dispatch(categoryList());
        setShowDelModal(false)
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }
    return (
        <View style={CATEGORY_LIST.length < 1 ? styles.containerNDF : styles.container} >
            <View style={{ alignSelf: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-SemiBold', marginTop: 10, color: '#000', marginLeft: 40 }}>All Categories</Text>

            </View>

            {/* <Text style={{ color: '#000', fontSize: 16, textAlign: 'center', marginVertical: 20, fontFamily: 'Poppins-Regular' }}> Use a long press to Edit Or Delete {"\n"} Categories </Text> */}

            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {
                    CATEGORY_LIST.length < 1 ?
                        <View style={{ marginTop: 60, backgroundColor: '#fff' }}>

                            <LottieView
                                source={require("../Assets/lottie/notFound.json")}
                                style={{
                                    width: 200,
                                    height: 200,
                                    alignSelf: 'center',
                                }}
                                autoPlay loop
                            />


                        </View>
                        :

                        <View style={{ alignSelf: 'center', borderRadius: 10, width: '100%' }}>
                            <FlatList
                                // contentContainerStyle={{ paddingBottom: 200 }}
                                data={CATEGORY_LIST}
                                contentContainerStyle={{
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                }}
                                columnWrapperStyle={{ flexWrap: 'wrap' }}
                                // numColumns={2}
                                numColumns={3}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('AllPetsCategories', { categoryName: item?.cat_name, categoryId: item?.cat_id }) }}
                                        // onLongPress={() => { setIsVibrating(true) }}
                                        style={{ marginTop: 10 }}>
                                        {
                                            isVibrating ?
                                                <>
                                                    <TouchableOpacity onPress={() => { openModal(item?.cat_id) }} style={{ zIndex: 1, backgroundColor: '#fff' }}>
                                                        <Image
                                                            source={require("../Assets/img/icons/close.png")}
                                                            style={{
                                                                width: 23,
                                                                height: 23,
                                                                alignSelf: 'center',
                                                                position: 'absolute',
                                                                left: 86,
                                                                top: -8

                                                            }} />

                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { openEditModal(item?.cat_id) }} style={{ zIndex: 1, backgroundColor: '#fff' }}>
                                                        <Image
                                                            source={require("../Assets/img/icons/pencilEdit.png")}
                                                            style={{
                                                                width: 23,
                                                                height: 23,
                                                                alignSelf: 'center',
                                                                position: 'absolute',
                                                                right: 80,
                                                                top: -8

                                                            }} />

                                                    </TouchableOpacity>
                                                </>
                                                : null
                                        }
                                        <Image
                                            source={{
                                                uri: Globals?.ImagePathCAT + item.cat_image,
                                            }}
                                            style={{
                                                height: 100, width: 100, marginLeft: 10, borderRadius: 10
                                            }}
                                            resizeMode='cover'
                                        />
                                        <Text
                                            style={{
                                                color: '#8b9088',
                                                fontSize: 15,
                                                textAlign: 'center',
                                                marginTop: 7,
                                                fontFamily: 'Poppins-Regular'
                                            }}>
                                            {item?.cat_name}
                                        </Text>
                                    </TouchableOpacity>

                                )}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                  }
                            />
                        </View>
                }
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>

                <View style={styles.modalWrapper2}>
                    <View style={styles.modalWrapp1}>
                        <View style={styles.content}>
                            <TouchableOpacity onPress={pickImageFromGallery} style={{ marginVertical: 10 }}>
                                {
                                    imageUri ?
                                        <Image
                                            source={{ uri: imageUri }}
                                            resizeMode='cover'
                                            style={{ width: '34%', height: 65, alignSelf: 'center', borderRadius: 100 }}
                                        />
                                        :
                                        <Image
                                            source={require("../Assets/profileImg.png")}
                                            resizeMode='cover'
                                            style={{ width: '34%', height: 65, alignSelf: 'center', borderRadius: 100 }}
                                        />
                                }
                                {/* {errors.base64Image && <Text style={[styles.error, { textAlign: 'center' }]}>{errors.base64Image}</Text>} */}

                                {errors.base64String && <Text style={[styles.error, { textAlign: 'center' }]}>{errors.base64String}</Text>}
                            </TouchableOpacity>
                            <View style={styles.formContainer}>
                                {/* <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 10, fontFamily: 'Poppins-SemiBold', color: '#000' }}>Add Categories</Text> */}
                                <TouchableOpacity title="Hide modal" onPress={toggleModal} style={{ position: 'absolute', right: -10, top: -110 }} >
                                    <Icon size={20} name='close' color='#000' />
                                </TouchableOpacity>
                                <View>
                                    <Text
                                        style={{ alignSelf: 'center', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                        Category Name*
                                    </Text>
                                    <TextInput
                                        autoCompleteType="email"
                                        keyboardType="email-address"
                                        underlineColorAndroid="transparent"
                                        textContentType="emailAddress"
                                        placeholder="Enter  Category Name"
                                        value={catName}
                                        onChangeText={(text) => setCatName(text)}
                                        style={styles.input1}
                                    />
                                    {errors.catName && <Text style={styles.error}>{errors.catName}</Text>}

                                    {/* {errors.petName && <Text style={styles.error}>{errors.petName}</Text>} */}
                                </View>
                                <TouchableOpacity onPress={onSubmit} style={[styles.btn, { height: 37, backgroundColor: '#fbd349', borderRadius: 20, marginTop: 10 }]}>
                                    <Text style={{ color: '#000', fontSize: 13, fontFamily: 'Poppins-Regular', marginTop: 10, textAlign: 'center' }}>Add</Text>

                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
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
                                <TouchableOpacity style={styles.delete} onPress={deleteCategoryPet}>
                                    <Text style={{ color: '#fff', textAlign: 'center', marginTop: 6, fontFamily: 'Poppins-Regular' }}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => {
                    setEditModalVisible(!editModalVisible);
                }}>

                <View style={styles.modalWrapper2}>
                    <View style={styles.modalWrappE}>
                        <View style={styles.content}>
                            <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 10, fontFamily: 'Poppins-SemiBold', color: '#000' }}>Edit Category</Text>

                            <TouchableOpacity onPress={pickImageFromGallery} style={{ marginVertical: 10 }}>
                                {
                                    imageUri ?
                                        <Image
                                            source={{ uri: imageUri }}
                                            resizeMode='cover'
                                            style={{ width: '34%', height: 65, alignSelf: 'center', borderRadius: 100 }}
                                        />
                                        :
                                        <Image
                                            source={require("../Assets/profileImg.png")}
                                            resizeMode='cover'
                                            style={{ width: '34%', height: 65, alignSelf: 'center', borderRadius: 100 }}
                                        />
                                }
                                {/* {errors.base64Image && <Text style={[styles.error, { textAlign: 'center' }]}>{errors.base64Image}</Text>} */}

                                {errors.base64String && <Text style={[styles.error, { textAlign: 'center' }]}>{errors.base64String}</Text>}

                            </TouchableOpacity>
                            <View style={styles.formContainer}>
                                <TouchableOpacity title="Hide modal" onPress={toggleEditModal} style={{ position: 'absolute', right: -15, top: -150 }} >
                                    <Icon size={20} name='close' color='#000' />
                                </TouchableOpacity>
                                <View>
                                    <Text
                                        style={{ alignSelf: 'center', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                                        Category Name*
                                    </Text>
                                    <TextInput
                                        autoCompleteType="email"
                                        keyboardType="email-address"
                                        underlineColorAndroid="transparent"
                                        textContentType="emailAddress"
                                        placeholder="Enter  Category Name"
                                        value={catName}
                                        onChangeText={(text) => setCatName(text)}
                                        style={styles.input1}
                                    />
                                    {errors.catName && <Text style={styles.error}>{errors.catName}</Text>}
                                </View>
                                <TouchableOpacity onPress={onEditSubmit} style={[styles.btn, { height: 37, backgroundColor: '#fbd349', borderRadius: 20, marginTop: 10 }]}>
                                    <Text style={{ color: '#000', fontSize: 13, fontFamily: 'Poppins-Regular', marginTop: 10, textAlign: 'center' }}>Update</Text>

                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </View>
            </Modal>


        </View>
    )
}

export default viewAllCategories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    containerNDF: {
        flex: 1,
        backgroundColor: '#fff'
    },
    modalWrapp1: {
        height: hp(45), width: wp(70), position: 'absolute',
        bottom: 195, backgroundColor: '#fff',
        borderRadius: 20, elevation: 50
    },
    modalWrappE: {
        height: hp(50), width: wp(70), position: 'absolute',
        bottom: 195, backgroundColor: '#fff',
        borderRadius: 20, elevation: 50
    },
    modalWrapper2: {
        flex: 1,
        // backgroundColor: "#00000040",
        alignItems: "center",
        justifyContent: "flex-end",

    },
    content: {
        alignSelf: 'center',
        marginTop: 30
    },
    formContainer: {
        width: 200,
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    },
    input1: {
        backgroundColor: '#fff',
        width: '100%',
        alignSelf: 'center',
        borderWidth: 0.5,
        marginBottom: 10,
        borderRadius: 5,
        height: 40,
        marginTop: 10
        // borderColor:'gray',
        // borderLeftColor:'gray'
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
    },
    error: {
        color: 'red',
        // marginTop: 5,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        height: 300, // Fixed height for the modal content
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
})