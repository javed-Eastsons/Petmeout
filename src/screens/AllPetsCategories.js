import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Alert, PanResponder, Animated, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { AllPetsListingByCategory, breedList, searchByDistance } from '../Redux/Actions/Petmeout';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Globals } from '../Config/index';
import { Loader } from '../Component/Loader';
import LottieView from 'lottie-react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import AnimatedRangeSlider from '../Component/RangeSlider/AnimatedRangeSlider';
import { Dropdown } from 'react-native-element-dropdown';


const AllPetsCategories = ({ route }) => {
    const navigation = useNavigation();
    const { ALLPETS_CATEGORY } = useSelector(state => state.PetmeOutReducer);
    const { LOGIN_DATA } = useSelector(state => state.PetmeOutReducer);
    const { DISTANCE } = useSelector(state => state.PetmeOutReducer);
    const { BREED_LIST } = useSelector(state => state.PetmeOutReducer);
    const [breedName, setBreedName] = useState('')
    const [isFocus, setIsFocus] = useState(false);
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    console.log(ALLPETS_CATEGORY, 'jjjjjjjjjj')
    console.log(DISTANCE, 'DISTANCEDISTANCEDISTANCE')
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    useEffect(() => {
        setLoader(true);
        dispatch(AllPetsListingByCategory(route?.params?.categoryName));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);

    const onDistanceDone = () => {
        setLoader(true);
        dispatch(searchByDistance(LOGIN_DATA?.user_id, DISTANCE, route?.params?.categoryName, breedName, year, month));
        setModalVisible(!isModalVisible);
        setBreedName('')
        setYear('')
        setMonth('')
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }

    useEffect(() => {
        setLoader(true);
        dispatch(breedList(route?.params?.categoryId));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);
    const thumbImage = require('../Assets/images/pawBG.jpg'); // Update with your image path
    const ageData = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
    ];
    return (

        <View style={{ backgroundColor: ALLPETS_CATEGORY == null || ALLPETS_CATEGORY?.length < 1 ? '#fff' : 'transparent', flex: 1 }}>
            <Loader flag={loader} />
            {
                ALLPETS_CATEGORY == null ?
                    <View style={{ marginTop: 150, backgroundColor: '#fff' }}>

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
                    <>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', width: '90%' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-SemiBold', marginTop: 10, color: '#000', marginLeft: 20 }}>All Pets of {route?.params?.categoryName} Category</Text>
                            <TouchableOpacity onPress={toggleModal}>
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
                        {
                            ALLPETS_CATEGORY?.length < 1 ?
                                <View style={{ marginTop: 150, backgroundColor: '#fff' }}>

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
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <View style={{ alignSelf: 'center', borderRadius: 10, width: '100%' }}>


                                        <FlatList
                                            // contentContainerStyle={{ paddingBottom: 200 }}
                                            data={ALLPETS_CATEGORY}
                                            contentContainerStyle={{
                                                alignSelf: 'center',
                                                alignItems: 'center',
                                                paddingBottom: 100
                                            }}
                                            showsVerticalScrollIndicator={false}
                                            columnWrapperStyle={{ flexWrap: 'wrap' }}
                                            // numColumns={2}j
                                            numColumns={3}
                                            keyExtractor={(item, index) => index}
                                            renderItem={({ item, index }) => (
                                                <TouchableOpacity
                                                    onPress={() => { navigation.navigate('Profile', { petDetails: item }) }}
                                                    style={{ marginTop: 10 }}>
                                                    {
                                                        item?.image_path.includes('admin') ?
                                                            <Image
                                                                source={{
                                                                    uri: item?.image_path,
                                                                }}
                                                                style={{
                                                                    height: 100, width: 100, marginLeft: 10, borderRadius: 10
                                                                }}
                                                                resizeMode='contain'
                                                            />
                                                            :
                                                            <Image
                                                                source={require('../Assets/none.jpg')}
                                                                style={{
                                                                    height: 100, width: 100, marginLeft: 10, borderRadius: 10
                                                                }}
                                                                resizeMode='contain'
                                                            />



                                                    }

                                                    <Text
                                                        style={{
                                                            color: '#8b9088',
                                                            fontSize: 15,
                                                            textAlign: 'center',
                                                            marginTop: 7,
                                                            fontFamily: 'Poppins-Regular'
                                                        }}>
                                                        {item?.pet_name}
                                                    </Text>
                                                </TouchableOpacity>

                                            )}
                                        />


                                    </View>
                                </ScrollView>

                        }

                    </>
            }
            <Modal isVisible={isModalVisible} style={styles.modal} animationOutTiming={700} backdropTransitionOutTiming={800}>
                <View style={styles.modalContent}>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 19, color: '#000' }}>Sort by:</Text>

                    <TouchableOpacity title="Hide modal" onPress={toggleModal} style={{ position: 'absolute', right: 10, top: 20 }} >
                        <Icon size={20} name='close' color='#000' />
                    </TouchableOpacity>
                    <Text style={[styles.labelB, { marginTop: 20 }]}>Distance:</Text>
                    <View>
                        <LottieView
                            source={require("../Assets/lottie/truck.json")}
                            style={{
                                width: 100,
                                height: 80,
                                alignSelf: 'center',

                            }}
                            autoPlay loop
                        />
                    </View>

                    <AnimatedRangeSlider
                        min={0}
                        max={300}
                        initialMin={20}
                        initialMax={80}
                        thumbImage={thumbImage}

                    />

                    <View style={{ marginBottom: 10, flexDirection: 'row', width: '100%', marginTop: 10, justifyContent: 'space-between' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.labelB}>Breed:</Text>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                itemTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={BREED_LIST}
                                search
                                searchPlaceholder='Search...'
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
                        </View>
                        <View style={{ width: '50%', marginLeft: 5 }}>
                            <Text style={styles.labelB}>Age</Text>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                itemTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={ageData}
                                maxHeight={200}
                                labelField="label"
                                valueField="label"
                                placeholder={!isFocus ? 'Select item' : '...'}
                                value={year}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setYear(item?.label)
                                    setIsFocus(false);
                                }}

                            />

                        </View>

                    </View>
                    <TouchableOpacity onPress={onDistanceDone} style={[styles.btn, { height: 40, backgroundColor: '#fbd349', borderRadius: 20, marginTop: 10, width: '50%', alignSelf: 'center', marginTop: 10 }]}>
                        <Text style={{ color: '#000', fontSize: 13, fontFamily: 'Poppins-SemiBold', marginTop: 10, textAlign: 'center' }}>Done</Text>

                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default AllPetsCategories

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        height: 450, // Fixed height for the modal content
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },

    slider: {
        width: '100%',
        height: 80,
    },
    rail: {
        flex: 1,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ddd',
    },
    railSelected: {
        height: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    thumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
    },
    label: {
        color: '#333',
        marginTop: 20,
    },
    valueLabel: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
    },
    root: {
        width: 8,
        height: 8,
        borderLeftColor: 'blue',
        borderRightColor: 'blue',
        borderBottomColor: 'transparent',
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderBottomWidth: 8,
    },

    Rootcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        height: 40,
        justifyContent: 'center',
    },
    track: {
        height: 4,
        backgroundColor: '#ddd',
        position: 'absolute',
        left: 0,
        right: 0,
    },
    selectedTrack: {
        height: 4,
        backgroundColor: 'blue',
        position: 'absolute',
    },
    thumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'blue',
        position: 'absolute',
        top: -8,
    },
    valuesContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
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







    dropdown: {
        height: 40,
        borderColor: 'gray',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderRadius: 8,
        width: '100%',
        paddingHorizontal: 8
    },
    icon: {
        marginRight: 5,
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
    labelB: {
        fontSize: 15,
        color: '#000',

        fontFamily: 'Poppins-SemiBold'
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    inputA: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 16,
        fontSize: 16,
    },
})