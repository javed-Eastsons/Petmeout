import React, { useEffect, useState, useRef } from "react";

import {
    SafeAreaView,
    StyleSheet,
    View,
    Platform,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    Button,
    TouchableOpacity,
    Alert,
} from "react-native";
// import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import OTPTextView from "react-native-otp-textinput";
import { Globals } from '../Config/index';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
// import {
//     RegisterUser,
//     OTPVerify,
//     OTPVerifywithrole,
// } from "../Redux/Actions/Tutors";
//import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from "@react-native-community/async-storage";
import LottieView from 'lottie-react-native';

import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Component/Loader";
import { Dropdown } from "react-native-element-dropdown";
import { countryCode } from "../common/countrycode";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";

import axios, * as others from "axios";

const VerifyOTPForget = ({ route }) => {
    const otpRef = useRef(null);

    const navigation = useNavigation();
    const dispatch = useDispatch();


    const [otp, setOtp] = useState("");

    const [loader, setLoader] = useState(false);

    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);

    const [editEmail, setEditEmail] = useState(false)
    const [updatedEmail, setUpdatedEmail] = useState("")

    const [resOTP, setRESOtp] = useState("")






    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);

        };


    }, [seconds]);



    const isSubmitDisabled = otp?.length !== 4;

    const getOTP = () => {
        setLoader(true);
        //console.log('LLLLLLLLLLPPPPPPPPPPPPP', otpcode);
        // let otpcode = otp;
        // setOtp(otpcode);



        const url1 =
            Globals.baseUrl +
            "/ForgotPassword/ForgotPassword.php";

        var formData = new FormData();
        // formData.append("user_type", role);
        formData.append("email", route.params.Email);

        // formData.append("OTP_EMAIL", otp);
        //formData.append("OTP_MOBILE", otp);

        console.log("FORMDATAAAAA", formData);

        return fetch(url1, {
            method: "POST",
            headers: new Headers({
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                // "Authorization": authtoken,
            }),

            body: formData,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("OTPVERIFYYYYYYYYYYYYYYY", responseJson);

                if (responseJson.status == true) {
                    // setModalVisible(true);
                    console.log("PPPaaa", responseJson.message);
                    console.log(responseJson?.OTP, 'responseJson?.OTP')
                    Alert.alert(responseJson.message)
                    setRESOtp(responseJson?.OTP)
                    setTimeout(() => {
                        setLoader(false);
                    }, 2000);

                    //  Alert.alert(responseJson.message);
                } else if (responseJson.status == false) {
                    //  navigation.navigate('Auth');
                    console.log('WWWpppp', responseJson.message)
                    // Alert.alert(responseJson.message);
                    Alert.alert(
                        '',
                        '                     OTP has expired.\n\n                  Request a new OTP',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') }
                        ],
                        { cancelable: false, textContentAlign: 'center' }
                    );
                    // dispatch({
                    setTimeout(() => {
                        setLoader(false);
                    }, 2000);

                    //     type: OTP_MSG,
                    //     otpmsg: responseJson.message

                    // });
                }
            })
            .catch((error) => console.log("LLLLLLLLL", error.message));


        //  setLoader(true);
        //  console.log('newwwwwwwwwwwwwww', otp)
        // dispatch(OTPVerifywithrole(otpcode)) 
        // dispatch(OTPVerify(otpcode))
        //   .then((res) => setLoader(false))
        //   .finally(() => setLoader(false));
        console.log("isVerfyModalVisible=", isVerfyModalVisible);
        //Alert.alert(otpmsgs)
        setVerifyModalVisible(false);
        setModalVisible(true);
    };

    const goToForget = () => {
        if (otp == resOTP) {
            navigation.navigate("ForgotPassword", { Email: route.params.Email, OTP: otp, RouteFrom: 'VerifyOTPForget' })

        } else {
            Alert.alert("OTP is Incorrect!")
        }
    }





    const clearOTPInputs = () => {
        if (otpRef.current) {
            otpRef.current.clear();
        }
    };

    const resendOTP = () => {
        setMinutes(1);
        setSeconds(30);
        dispatch(
            RegisterUser(route.params.FirstName, route.params.LastName, route.params.Password, route.params.Email, route.params.country_phone_code, route.params.Mobile, route.params.imageSource)
        );
        clearOTPInputs()

    };

    useEffect(() => {
        getOTP()
    }, [route.params.Email])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <Loader flag={loader} />
            <View style={{marginTop:hp(5)}}>
                <LottieView
                    source={require("../Assets/lottie/GIF 1_1.json")}
                    style={{
                        width: 180,
                        height: 180,
                        alignSelf: 'center'
                    }}
                    autoPlay loop
                />
            </View>



            <View
                style={{

                    alignSelf: "center",


                    height: hp(40),
                    width: wp(100),
                    backgroundColor: "#fff",
                }}
            >

                <View
                    style={{

                        alignSelf: "center",
                        position: "absolute",
                        top: hp(8),
                        height: hp(48),
                        width: wp(90),
                        backgroundColor: "#fff",
                        color: '#000'
                    }}
                >
                    <View style={styles.ModelTextContainer}>
                        <Text style={styles.ModelText}>Verification Code</Text>
                        <Text style={styles.ModelText2}>
                            OTP is sent to your email address
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            {
                                editEmail == true ?
                                    <TextInput
                                        onChangeText={(text) => {
                                            setUpdatedEmail(text);
                                        }}
                                        placeholder="Enter Email"
                                        // value={FirstName}
                                        style={styles.input1}
                                    />
                                    :
                                    <Text style={[styles.ModelText2, { color: '#4169E1' }]}>{route.params.Email}</Text>

                            }
                            {/* {
                                editEmail == true ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (updatedEmail) {
                                                handleEmailUpdate()

                                            }
                                        }}
                                        style={styles.tickWrapper}
                                    >
                                        <Image
                                            source={require("../Assets/right.png")}
                                            style={styles.tickImage}
                                        />
                                    </TouchableOpacity>
                                    :

                                    <TouchableOpacity
                                        onPress={() => {
                                            setEditEmail(true)
                                            // handleSubjectEdit(item.TutoringLevel, item.Tutoring_ALL_Subjects)
                                        }}
                                        style={{ marginTop: 15 }}
                                    >
                                        <Image
                                            source={require("../Assets/greyedit.png")}
                                            style={{ height: 20, width: 20 }}
                                        />
                                    </TouchableOpacity>
                            } */}
                        </View>

                    </View>
                    <OTPTextView
                        containerStyle={{ marginHorizontal: 16 }}
                        handleTextChange={(text) => setOtp(text)}
                        inputCount={4}
                        keyboardType="numeric"
                        ref={otpRef}
                        //  defaultValue={OTP}
                        borderWidth={2}
                        // backgroundColor={"grey"}
                        borderBottomWidth={2}
                        size={10}
                        borderRadius={10}
                        width={65}
                        height={66}
                        tintColor={"#fbd349"}
                    />
                    <View
                        style={{

                            alignSelf: "center", marginTop: 20,

                        }}
                    >


                        {seconds > 0 || minutes > 0 ? (
                            <Text
                                style={{
                                    color: 'gray',
                                    width: wp(90), alignSelf: "center", marginBottom: wp(2),
                                    textAlign: "center", fontFamily: 'Poppins-Regular'
                                }}
                            >
                                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </Text>
                        ) : (
                            <Text
                                style={{
                                    // color: 'red',
                                    width: wp(90), alignSelf: "center", marginBottom: wp(2),
                                    textAlign: "center", fontFamily: 'Poppins-Regular'
                                }}
                            >Didn't recieve code?</Text>
                        )}
                    </View>
                    <TouchableOpacity
                        onPress={() => resendOTP()}
                        disabled={seconds > 0 || minutes > 0}
                        style={{


                            width: wp(90), alignSelf: "center", marginBottom: wp(2), marginTop: 10

                        }}

                    >


                        <Text style={{
                            color: seconds > 0 || minutes > 0 ? "#f7f7cb" : "gray",
                            // fontWeight: seconds > 0 || minutes > 0 ? "400" : "700",
                            textAlign: "center", fontSize: 12, fontFamily: 'Poppins-SemiBold'
                        }}>Resend OTP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            alignSelf: "center",
                            backgroundColor: isSubmitDisabled ? "#f7f7cb" : "#fbd349",
                            width: wp(70),
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 50,
                            marginTop: 20
                        }}
                        onPress={() => {
                            goToForget();
                        }}
                        disabled={isSubmitDisabled}
                    >
                        <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>




        </KeyboardAvoidingView >
    );
};

export default VerifyOTPForget;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        paddingBottom: -25,
    },
    headtext: {
        fontSize: 20,
        color: "#000",
        fontFamily: "Poppins-Bold",
    },
    Firsttext: {
        fontSize: 12,
        color: "grey",
        lineHeight: 20,
        marginBottom: 10,
        fontFamily: "Poppins-Regular",
    },
    ModelTextContainer: {
        padding: 20,
    },
    ModelText: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'Poppins-Bold',
        color: '#fbd349'
    },
    TermModelText: {
        fontSize: 12,
        // fontWeight: "700",
        justifyContent: "center"
    },

    ModelText2: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        textAlign: "center",
        paddingTop: 20,
    },
    underlineStyleBase: {
        width: 45,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: "#000",
        borderRadius: 5,
        backgroundColor: "#fff",
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    BlueText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
        width: wp(85),
        alignSelf: "center",
        marginTop: 15,
        paddingLeft: 15
    },

    BlueContainer: {
        height: hp(15),
        backgroundColor: "#2F5597",
        borderTopLeftRadius: 20,
        width: wp(100),
        alignSelf: "center",
        borderTopRightRadius: 20,
        // marginTop: hp(10),
    },
    strengthText: {
        //fontWeight: 'bold',
        fontSize: 10,
        color: '#007700',
    },
    circleArrow: {
        //flex: 0.1,
        alignSelf: "flex-end"
        // justifyContent: "center",
        // alignItems: "flex-end",
        // paddingRight: wp(4.5),
        // paddingBottom: hp(4),
    },
    suggestionsText: {
        color: 'red',
        fontSize: 10,
        paddingLeft: 15
    },

    input: {
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 20,
        fontSize: 14,
        paddingLeft: 10,
        width: wp(90),
        // fontFamily: 'SharpSansDispNo1-Semibold',

        color: "#131313",
        height: 45,
    },
    passinput: {
        // borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 20,
        fontSize: 14,
        paddingLeft: 10,
        width: wp(80),
        // fontFamily: 'SharpSansDispNo1-Semibold',

        color: "#131313",
        height: 45,
    },
    Outinput: {
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 20,
        flexDirection: "row",
        fontSize: 14,
        width: wp(90),
        // fontFamily: 'SharpSansDispNo1-Semibold',

        color: "#131313",
        height: 45,
    },

    input1: {
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 20,
        width: wp(48),
        fontSize: 14,
        // width: wp('42%'),
        // fontFamily: 'SharpSansDispNo1-Semibold',
        paddingLeft: 12,

        color: "#131313",
        height: 37,
        marginTop: 10
    },

    input2: {
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 20,
        fontSize: 14,
        width: wp("42%"),
        // fontFamily: 'SharpSansDispNo1-Semibold',
        paddingLeft: 12,
        marginLeft: wp(5),
        color: "#131313",
        height: 45,
    },

    searchSection: {
        justifyContent: "space-between",
        paddingBottom: 12,
        alignSelf: "center",
        marginTop: 5,
    },
    TextInputText: {
        color: "#131313",
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        lineHeight: 16,
        paddingBottom: 8,
    },
    TextInputText1: {
        color: "#131313",
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        //  paddingLeft: 10,

        lineHeight: 16,
        paddingBottom: 8,
    },
    TextInputText2: {
        color: "#131313",
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        lineHeight: 16,
        marginLeft: wp(5),
        paddingBottom: 8,
    },
    TermsCondition: {
        // backgroundColor: "red",
        color: "#131313",
        fontFamily: "Poppins-SemiBold",
        fontSize: 12,
    },
    Rolecontainer: {
        //flexDirection: "row",

        width: wp(35),
        height: hp(22),
        justifyContent: "center",
        backgroundColor: "#fff",
        alignSelf: "center",
        marginRight: 30,
        borderRadius: 30,

        elevation: 10,
        shadowColor: "#000",
        alignItems: "center",
    },
    ModelText1: {
        fontSize: 12,
        fontWeight: "700",
        color: "grey",
        paddingTop: 10,
        paddingBottom: 10,
        width: wp(50),
        textAlign: "center",
        // alignSelf: "flex-end"
    },
    icons: {
        height: 20,
        width: 20,
        marginRight: 10,
    },
    icons1: {
        height: 40,
        width: 40,
        marginRight: 10,
    },
    moblieSec: {
        backgroundColor: "lightgrey",
        height: hp(8),
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 15,
        flexDirection: "row",
    },
    mobiletoch: {
        backgroundColor: "#2F5597",
        width: wp(40),
        height: hp(6),
        borderRadius: 30,
        justifyContent: "center",
        fontFamily: "Poppins-Regular",
    },
    emailtoch: {
        backgroundColor: "lightgray",
        width: wp(40),
        height: hp(6),
        justifyContent: "center",
        borderRadius: 30,
        fontFamily: "Poppins-Regular",
    },
    ButtonText: {
        color: "#fff",
        textAlign: "center",
    },
    RequsertButton: {
        height: hp(5),
        width: wp(80),
        alignSelf: "center",
        borderRadius: 50,
        marginTop: 15,
        justifyContent: "center",
    },
    ReqButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 14,
        fontFamily: "Poppins-Regular",
    },
    bottomcontent: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 15,
    },
    AlreadyText: {
        color: "#000",
        fontFamily: "Poppins-Regular",
    },
    loginText: {
        color: "#2F5597",
        fontSize: 12,
        paddingTop: 5,
        fontFamily: "Poppins-Bold",
        marginBottom: 5,
    },
    crossImageWrapper: {
        backgroundColor: "red",
        height: 30,
        width: 30,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    crossImage: {
        height: 30,
        width: 30,
    },
    usercontainer: {
        alignSelf: "flex-start",
        // backgroundColor: "red",
        width: wp(20),
        marginTop: 10,
        //backgroundColor: "yellow",

        //alignSelf: "center",
        //  flexDirection: "row",
        //justifyContent: "center"
    },
    tickImage: { height: 15, width: 15 },
    tickWrapper: {
        backgroundColor: "green",
        height: 25,
        width: 25,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginLeft: 5
    },

});
