import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../Style';

const ViewRequest = () => {
    const bgImage = require('../Assets/img/guest_shape.png');

    return (
        <>
            <View style={styles.header}>
                <Text style={{ color: '#000', fontSize: 15, fontWeight: '600' }}>Client ID: MREALESTATE</Text>
            </View>
            <ImageBackground
                source={bgImage}
                style={styles.bgImg}
                resizeMode="cover">
                <View style={styles.container}>
                    <ScrollView style={{marginBottom:38}}>


                        <View style={styles.slideContainerClient}>
                            <Text style={styles.headingClient}>MARIO RUIZ</Text>

                            <View style={styles.contentView}>
                                <Text style={styles.subHead}>Department:</Text>
                                <Text style={styles.LIstText2}>
                                    {' '}
                                    N/A
                                </Text>
                            </View>
                            <View style={styles.contentView}>
                                <Text style={styles.subHead}>Office:</Text>
                                <Text style={styles.LIstText2}>
                                    {' '}
                                    CORP
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.slideContainerClient1, { marginTop: 20 }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    // navigation.navigate('ViewRequest', {
                                    // })
                                }}
                                style={{
                                    backgroundColor: '#1C84C6',
                                    padding: 5,
                                    textAlign: 'center',
                                    width: wp(18),
                                    marginLeft: 20,
                                    flexDirection: 'row',
                                    borderRadius: 3,
                                    marginTop: 20,
                                }}
                            >
                                {/* <Icon
                                  name="eye"
                                  size={14}
                                  color="#fff"
                                /> */}
                                <Text style={{
                                    color: Color.white,
                                    fontSize: 10,
                                    // marginTop: 2,
                                    marginLeft: 4,
                                    fontWeight: '700'

                                }}>


                                    + Assign
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.contentView1}>
                                <Text style={styles.subHead}>Department:</Text>
                                <Text style={styles.LIstText2}>
                                    {' '}
                                </Text>
                            </View>
                            <View style={styles.contentView1}>
                                <Text style={styles.subHead}>Office:</Text>
                                <Text style={styles.LIstText2}>
                                    {' '}
                                </Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#fff', paddingBottom: 20, borderRadius: 10, width: wp(90), alignSelf: 'center', marginTop: 20 }}>
                            <View style={styles.slideContainerClient1}>
                                <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#000', fontWeight: '700', marginTop: 5 }}>Notes</Text>
                                        <Text style={styles.notes}>2</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#000', fontWeight: '700', marginTop: 5 }}>SOS</Text>
                                        <Text style={styles.sos}>+</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#000', fontWeight: '700', marginTop: 5 }}>Action Files</Text>
                                        <Text style={styles.action}>0</Text>
                                    </View>

                                </View>
                            </View>
                            <View style={{ marginLeft: 20, marginBottom: 20, marginTop: 20 }}>
                                <Text style={{ fontSize: 18, color: '#000', marginBottom: 10 }}>Subject:</Text>
                                <Text>Third Test</Text>

                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ fontSize: 18, color: '#000', marginBottom: 10 }}>Message:</Text>
                                <Text>This Is Third Test</Text>

                            </View>

                        </View>
                        <View style={{ backgroundColor: '#fff', paddingBottom: 20, borderRadius: 10, width: wp(90), alignSelf: 'center', marginTop: 20 }}>
                            <View style={{ marginLeft: 20, marginTop: 20 }}>
                                <Text style={{ fontSize: 17, color: '#000', marginBottom: 10, fontWeight: '600', marginBottom: 30 }}>Action Notification</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 17, color: '#000', marginBottom: 10, marginTop: 6 }}>Tracking:</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // navigation.navigate('ViewRequest', {
                                            // })
                                        }}
                                        style={{
                                            backgroundColor: '#1C84C6',
                                            padding: 5,
                                            textAlign: 'center',
                                            width: wp(26),
                                            marginLeft: 60,
                                            flexDirection: 'row',
                                            borderRadius: 3,
                                            height: hp(5),
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {/* <Icon
                                  name="eye"
                                  size={14}
                                  color="#fff"
                                /> */}
                                        <Text style={{
                                            color: Color.white,
                                            fontSize: 15,
                                            // marginTop: 2,
                                            marginLeft: 4,
                                            // fontWeight: '700'

                                        }}>


                                            New
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 25 }}>
                                    <Text style={{ fontSize: 17, color: '#000', marginBottom: 10, marginTop: 6 }}>Priority:</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // navigation.navigate('ViewRequest', {
                                            // })
                                        }}
                                        style={{
                                            backgroundColor: '#ED5565',
                                            padding: 5,
                                            textAlign: 'center',
                                            width: wp(26),
                                            marginLeft: 70,
                                            flexDirection: 'row',
                                            borderRadius: 3,
                                            height: hp(5),
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {/* <Icon
                                  name="eye"
                                  size={14}
                                  color="#fff"
                                    /> */}
                                        <Text style={{
                                            color: Color.white,
                                            fontSize: 15,
                                            // marginTop: 2,
                                            marginLeft: 4,
                                            // fontWeight: '700'

                                        }}>


                                            Urgent
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </>

    )
}

export default ViewRequest

const styles = StyleSheet.create({
    container: {
        width: '95%',
        alignSelf: 'center'
    },
    header: {
        backgroundColor: '#CDF2FF',
        alignItems: 'center',
        height: hp(5),
        justifyContent: 'center'
    },
    LIstText2: {
        color: '#000',
    },

    subHead: {
        width: 150,
        fontSize: 15,
        fontWeight: '600',
        color: '#000'
    },
    headingClient: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        // maxWidth:'80%',
        color: '#005A93',
        // height:40,
        marginTop: 20,
        marginLeft: 20,
        fontWeight: '600',
        // textAlign: 'center',
    },
    contentView: {
        height: 40,
        backgroundColor: '#DAFFDA',
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    contentView1: {
        height: 40,
        backgroundColor: '#FFEFCE',
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    slideContainerClient: {
        backgroundColor: '#C4F4C4',
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        /// height: 420,
        opacity: 2,
        paddingBottom: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    slideContainerClient1: {
        backgroundColor: '#FFDC93',
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        /// height: 420,
        opacity: 2,
        paddingBottom: 20,
        borderRadius: 10,
        // marginTop: 20,
    },
    sos: {
        backgroundColor: '#1AB394', color: '#fff', borderRadius: 3, marginLeft: 10, marginRight: 10, width: wp(6), alignSelf: 'center', marginTop: 5, height: hp(3),
        paddingLeft: 6
    },
    notes: {
        backgroundColor: '#ED5565', color: '#fff', borderRadius: 3, marginLeft: 10, marginRight: 10, width: wp(6), alignSelf: 'center', marginTop: 5, height: hp(3),
        paddingLeft: 6
    },
    action: {
        backgroundColor: '#F8AC59', color: '#fff', borderRadius: 3, marginLeft: 10, marginRight: 4, width: wp(6), alignSelf: 'center', marginTop: 5, height: hp(3),
        paddingLeft: 6
    },
})