
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';
import { addCategory, categoryList, deleteCategory, editCategory, getProductCategories } from '../Redux/Actions/Petmeout';
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
import { Loader } from '../Component/Loader';

const productCategories = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { CATEGORY_LIST } = useSelector(state => state.PetmeOutReducer);
    const [loader, setLoader] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

     const {PRODUCT_CATEGORIES} = useSelector(state=> state.PetmeOutReducer);

     console.log(PRODUCT_CATEGORIES,'PPPPPRPRPRPPR')

     useEffect(() => {
        setLoader(true)
       dispatch(getProductCategories())
       setTimeout(() => {
        setLoader(false)
       }, 2000);
     }, [])

    return (
        <View style={PRODUCT_CATEGORIES?.length < 1 ? styles.containerNDF : styles.container} >
            <Loader flag={loader}/>
            <View style={{ alignSelf: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-SemiBold', marginTop: 10, color: '#000', marginLeft: 40 }}>Product Categories</Text>

            </View>

            {/* <Text style={{ color: '#000', fontSize: 16, textAlign: 'center', marginVertical: 20, fontFamily: 'Poppins-Regular' }}> Use a long press to Edit Or Delete {"\n"} Categories </Text> */}

            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {
                    PRODUCT_CATEGORIES?.length < 1 ?
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

                        <View style={{ alignSelf: 'center', borderRadius: 10, width: '100%', marginTop: 20 }}>
                            <FlatList
                                // contentContainerStyle={{ paddingBottom: 200 }}
                                data={PRODUCT_CATEGORIES}
                                contentContainerStyle={{
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                }}
                                columnWrapperStyle={{ flexWrap: 'wrap' }}
                                // numColumns={2}
                                numColumns={3}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item, index }) => (
                                    <View style={{ backgroundColor:'#fff',padding:10}}>
                                    <TouchableOpacity

                                        onPress={() => {
                                            navigation.navigate('ProductList')
                                            setSelectedIndex(index);
                                        }}
                                        style={{
                                            marginTop: 10,
                                            elevation:10,
                                            width: 140,
                                            height:140,
                                            padding:10,
                                            margin:3,borderRadius:5,
                                            backgroundColor: selectedIndex === index ? '#fff2cf' : '#fff',
                                        }}
                                        >

                                        <Image
                                            source={{  uri :Globals?.ImagePathCAT + item.product_cat_image}}
                                            style={{
                                                height: hp(10), width: wp(20),alignSelf: 'center'
                                            }}
                                            resizeMode='cover'
                                        />
                                        <Text
                                            style={{
                                                color: '#8b9088',
                                                fontSize: 13,
                                                textAlign: 'center',
                                                marginTop: 7,
                                                fontFamily: 'Poppins-SemiBold',
                                                width:120,
                                                height:140
                                            }}>
                                            {item?.product_cat_name}
                                        </Text>
                                    </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>
                }
            </ScrollView>


        </View>
    )
}

export default productCategories

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