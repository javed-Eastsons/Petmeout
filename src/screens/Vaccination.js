import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Alert,TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { bookVaccinationList, categoryList, vaccinationSorting } from '../Redux/Actions/Petmeout';
import { Loader } from '../Component/Loader';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';

import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
const Vaccination = () => {
    // Static data for demonstration
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { LOGIN_PET } = useSelector(state => state.PetmeOutReducer);
    const { CATEGORY_LIST } = useSelector(state => state.PetmeOutReducer);
    const { VACCINATION_LIST } = useSelector(state => state.PetmeOutReducer);
    const { VACCINE_SORT_LIST } = useSelector(state => state.PetmeOutReducer);

    const [loader, setLoader] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleSort, setModalVisibleSort] = useState(false)
    const [listItem, setListItem] = useState(null)
    const [allList, setAllList] = useState([])
    const [isFocus, setIsFocus] = useState(false);
    const [categoryId, setCategoryId] = useState()
    const [categoryName, setCategoryName] = useState(null)
    const [age, setAge] = useState(null)
 
    console.log(VACCINE_SORT_LIST,'VACCINE_SORT_LISTVACCINE_SORT_LIST')
    const toggleModalDetails = (item) => {
        setListItem(item)
        setModalVisible(!isModalVisible);
    };
    const toggleModalSort = () => {
        setModalVisibleSort(!isModalVisibleSort);
    };
    const formtedDate = listItem ? moment(listItem?.vaccinatrion_date_time).format("YYYY-MM-DD HH:mm:ss") : null

    console.log(VACCINATION_LIST, 'VACCINATION_LISTVACCINATION_LIST')
    const handleDownloadChart = () => {
        // Implement download logic here
        Alert.alert('Download', 'Vaccination chart downloaded successfully!');
    };

    useEffect(() => {
        setLoader(true);
        dispatch(bookVaccinationList(LOGIN_PET?.pet_id, navigation));
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
        const listData = [...VACCINATION_LIST];
        const reversedList = listData?.reverse()
        setAllList(reversedList);
    }, [VACCINATION_LIST]);
    const onSortList = () => {
        setLoader(true);
        dispatch(vaccinationSorting(categoryName, age,navigation));
        toggleModalSort()

        setCategoryName(null)

        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => toggleModalDetails(item)}>
            <Image source={{ uri: 'https://refuel.site/projects/socialzoo/admin/upload/' + item.pet_image }} style={styles.petImage} />
            <View style={styles.cardContent}>
                <Text style={styles.petName}>{item.name}</Text>
                <Text style={styles.petDetails}>{item.category}</Text>
                <Text style={styles.petDetails}>{item.gender}</Text>


            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Loader flag={loader} />
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>Vaccination</Text>

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
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VaccinationChart')}>
                    {/* <Image
                        source={require("../Assets/img/icons/download.png")}
                        style={styles.iconImage1}
                    /> */}
                    <Icon1 name="file-download" color={'white'} size={35} style={{ marginBottom: 5 }} />

                    <Text style={styles.buttonText}>Download Chart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BookVaccination')}>
                    {/* <Image
                        source={require("../Assets/img/icons/booking.png")}
                        style={styles.iconImage}
                    /> */}
                    <View style={{ marginBottom: 5 }}>
                        <View style={{ borderWidth: 1, borderColor: '#fff', borderRadius: 3, padding: 1, marginBottom: 2, backgroundColor: '#fff' }}>
                            <Text style={{ color: '#8AB645', fontSize: 8, fontFamily: 'Poppins-Bold' }}>Book</Text>
                        </View>
                        <Icon name="hand-pointer-o" color={'white'} size={16} style={{ alignSelf: 'center' }} />
                    </View>

                    <Text style={styles.buttonText}>Book Now</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, marginLeft: 20, marginTop: 10 }}>My Bookings:</Text>
            <FlatList
                data={allList}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.book_vaccination_id}
                contentContainerStyle={styles.container}
            />

            <Modal isVisible={isModalVisible} style={styles.modal} animationOutTiming={700} backdropTransitionOutTiming={800}>
                <View style={styles.modalContentSort}>
                    <TouchableOpacity title="Hide modal" onPress={() => setModalVisible(false)} style={{ position: 'absolute', right: 10, top: 20 }} >
                        <Icon2 size={21} name='close' color='#000' />
                    </TouchableOpacity>
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 19, color: '#000' }}>{listItem?.name}</Text>


                        <Text style={styles.petDetails1}>{listItem?.age} Yrs</Text>
                        {/* <Text style={styles.petDetails}>{listItem?.category}</Text> */}
                        <Text style={styles.petDetails1}>{listItem?.gender}</Text>
                    </View>

                    <View style={styles.modalContentSort1}>
                        <View>
                            <Text style={{ color: '#fff', fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>Booking Details:</Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.text}>Category :</Text>
                                <Text style={styles.text}>{listItem?.category}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.text}>Breed :</Text>
                                <Text style={styles.text}>{listItem?.breed}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.text}>Vaccination Type :</Text>
                                <Text style={styles.text}>{listItem?.vaccination_type}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.text}>Phone :</Text>
                                <Text style={styles.text}>{listItem?.phone}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.text}>Vaccination Date/Time :</Text>
                                <Text style={styles.text}>{formtedDate}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.text}>Address :</Text>
                                <Text style={styles.text}>{listItem?.address}</Text>
                            </View>

                        </View>
                    </View>




                </View>
            </Modal>

            <Modal isVisible={isModalVisibleSort} style={styles.modal} animationOutTiming={700} backdropTransitionOutTiming={800}>
                <View style={styles.modalContentSortR}>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 19, color: '#000' }}>Sort by:</Text>

                    <TouchableOpacity title="Hide modal" onPress={toggleModalSort} style={{ position: 'absolute', right: 10, top: 20 }} >
                        <Icon2 size={20} name='close' color='#000' />
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
                    <View>
                        <Text
                            style={{ alignSelf: 'flex-start', padding: 5, color: '#000', fontFamily: 'Poppins-Regular' }}>
                            Age
                        </Text>
                        <TextInput
                            autoCompleteType="email"
                            keyboardType="numeric"
                            underlineColorAndroid="transparent"
                            textContentType="emailAddress"
                            placeholder="Enter your age in year i.e  2"
                            value={age}
                            onChangeText={(text) => setAge(text)}
                            style={styles.input1}
                        />
                    </View>


                    <TouchableOpacity onPress={onSortList} style={[styles.btn, { height: 40, backgroundColor: '#8AB645', borderRadius: 5, marginTop: 15, width: '40%', alignSelf: 'flex-end', marginTop: 10 }]}>
                        <Text style={{ color: '#fff', fontSize: 13, fontFamily: 'Poppins-SemiBold', marginTop: 10, textAlign: 'center' }}>Done</Text>

                    </TouchableOpacity>
                </View>
            </Modal>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        padding: 20,
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
        height: 95
    },
    petImage: {
        width: 90,
        height: 95,
        borderRadius: 8,
        marginRight: 15,
        resizeMode: 'cover'
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    petName: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',

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
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContentSort: {
        height: 400, // Fixed height for the modal content
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // padding: 20,
    },
    modalContentSort1: {
        height: 300, // Fixed height for the modal content
        backgroundColor: '#4CAF50',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
        // width:100%''
    },
    modalContentSortR: {
        height: 300, // Fixed height for the modal content
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    text: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        marginTop: 10
    },
    iconImage: {
        width: 35,
        height: 35,
        marginBottom: 5
    },
    iconImage1: {
        width: 32,
        height: 32,
        marginBottom: 8
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
});

export default Vaccination;
