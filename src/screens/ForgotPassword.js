import React, { useState } from "react";

import {
    SafeAreaView,
    StyleSheet,
    View,
    Alert,
    Text,
    Image,
    Button,
    ScrollView,
    TouchableOpacity,
} from "react-native";
// import axios, * as others from "axios";
import { TextInput } from "react-native-gesture-handler";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
// import { LoginAfterForget, LoginUser, SendOtpforgotpassword } from "../Redux/Actions/Tutors";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from '../Component/Loader';
import LottieView from 'lottie-react-native';
import axios, * as others from "axios";
import { Globals } from '../Config/index';
import { LoginUser } from "../Redux/Actions/Petmeout";

const ForgotPassword = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();   
    const [Password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [Email, setEmail] = React.useState("");
    const [emailText, setEmailText] = React.useState("enable");
    const [otpText, setOTPText] = React.useState("disable");
    const [passwordText, setPasswordText] = React.useState("disable");
    const [otp, setOTP] = React.useState("");
    const [loader, setLoader] = React.useState(false);

  

    //    console.log(route,'route')
    const ResetAll = () => {
        setEmail("")
        setPassword("")
        setOTP("")
        setEmailText("enable");
        setOTPText("disable");
        setPasswordText("disable");

    }

    const changePasword = () => {

      

        setLoader(true)


        const url1 =
        Globals.baseUrl +
        "/ForgotPassword/ForgotPassword.php";
        var formData = new FormData();
        formData.append("otp", route?.params?.OTP);
        formData.append('newpassword', Password)
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
            .then(async (responseJson) => {
                console.log("forgotpasswordforgotpassword", responseJson);

                if (responseJson.status == true) {

                    Alert.alert(responseJson.message);
                    dispatch(LoginUser(route.params.Email, Password, navigation));
                    setEmailText("disable")
                    setPasswordText("enable")
                    setEmail("")

                    setTimeout(() => {
                        setLoader(false)
                    }, 2000);

                } else if (responseJson.status == false) {
                    Alert.alert(responseJson.message);
                    setEmailText("enable")
                    setPasswordText("disable")
                    setOTP("")
                    setPassword("")
                    setTimeout(() => {
                        setLoader(false)
                    }, 2000);
                }
            })
            .catch((error) => console.log("LLLLLLLLL", error.message));


        // }
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const goToOTP = () => {
        if (Email) {
            navigation.navigate("VerifyOTPForget", { Email: Email })

        } else {
            Alert.alert('Please Enter Email First!')
        }
    }
    return (
        <View style={styles.container}>
            <Loader flag={loader} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: wp(100), alignSelf: "center" }}
            >

                <View style={styles.content}>
                    <View style={styles.Headcontainer}>
                        <Text style={styles.headtext}>Forgotten your Password?</Text>
                        <Text style={styles.subText}>Enter your Email & we can get started with helping you Reset Password</Text>
                        <LottieView
                            source={require("../Assets/lottie/GIF 1_1.json")}
                            style={{
                                width: 200,
                                height: 200,
                                alignSelf: 'center'
                            }}
                            autoPlay loop
                        />
                    </View>
                    {
                        route?.params?.RouteFrom == 'VerifyOTPForget' ?
                            <View style={styles.searchSection}>
                                <Text style={styles.TextInputText}>New Password</Text>
                                <TextInput
                                    onChangeText={(text) => {
                                        setPassword(text);
                                    }}
                                    placeholder="Enter New Password"
                                    
                                    value={Password}
                                    style={styles.input}
                                />
                            </View>
                            :
                            <View style={styles.searchSection}>
                                <Text style={styles.TextInputText}>Email Address</Text>
                                <TextInput
                                    onChangeText={(text) => {
                                        setEmail(text);
                                    }}
                                    placeholder="Email Address"
                                    editable={emailText == "disable" ? false : true}
                                    selectTextOnFocus={emailText == "disable" ? false : true}
                                    value={Email}
                                    style={styles.input}
                                />
                            </View>
                    }



                    <View style={{ marginTop: 10, alignSelf: "center", width: wp(90) }}>

                        {
                            route?.params?.RouteFrom == 'VerifyOTPForget' ?
                                < TouchableOpacity
                                    style={styles.RequsertButton}
                                    onPress={() => changePasword()}
                                >
                                    <Text style={styles.ReqButtonText}>Reset Password</Text>
                                </TouchableOpacity >
                                :
                                < TouchableOpacity
                                    style={styles.RequsertButton}
                                    onPress={() => goToOTP()}
                                >
                                    <Text style={styles.ReqButtonText}>Request OTP </Text>
                                </TouchableOpacity >
                        }

                    
                    </View>
                </View>


            </ScrollView>
        </View >
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fbd349",
        paddingTop: 25,
    },
    content: {
        backgroundColor: '#fff',
        marginTop: hp(26),
        height: hp(70),
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },

    headtext: {
        fontSize: 18,
        color: "#fbd349",
        marginBottom: 10,
        fontFamily: "Poppins-SemiBold",
        marginTop: 10,
        alignSelf: 'center'
    },
    subText: { color: '#000', width: wp(75), alignSelf: 'center', fontFamily: 'Poppins-Regular', fontSize: 12, textAlign: 'center', marginBottom: 20 },
    Firsttext: {
        fontSize: 14,
        color: "grey",
        lineHeight: 15,
        fontFamily: "Poppins-Regular",
    },

    ImageSec: {
        height: hp(15),
        //  backgroundColor: "red",
        justifyContent: "center",
    },
    Profileimage: {
        alignSelf: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 20,
        fontSize: 14,
        width: wp("90%"),
        // fontFamily: 'SharpSansDispNo1-Semibold',
        paddingLeft: 12,
        color: "#131313",
        height: 45,
    },
    searchSection: {
        justifyContent: "space-between",
        paddingBottom: 12,
        alignSelf: "center",
        marginTop: 25,
    },
    TermsCondition: {
        // fontSize: 16,
        color: "grey",
        marginTop: 15,
        fontFamily: "Poppins-SemiBold",
    },
    TextInputText: {
        color: "#131313",
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        lineHeight: 16,
        paddingBottom: 8,
    },
    ForgotText: {
        textAlign: "right",
        color: "grey",
        fontFamily: "Poppins-Regular",
    },
    moblieSec: {
        backgroundColor: "lightgrey",
        height: hp(8),
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 30,
        width: wp(90),
        flexDirection: "row",
    },
    icons: {
        height: 20,
        width: 20,
        marginRight: 10,
    },
    mobiletoch: {
        backgroundColor: "#2F5597",
        width: wp(28),
        height: hp(5),
        borderRadius: 30,
        justifyContent: "center",
    },
    emailtoch: {
        backgroundColor: "lightgray",
        width: wp(30),
        height: hp(6),
        justifyContent: "center",
        borderRadius: 30,
    },
    ButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 11,
        fontFamily: "Poppins-SemiBold",
    },
    RequsertButton: {
        backgroundColor: "#fbd349",
        height: hp(5),
        borderRadius: 10,
        width: wp(40),
        alignSelf: "center",
        //marginTop: hp(25),

        justifyContent: "center",




        // Elevation for Android
        elevation: 2,
    },
    Headcontainer: {
        marginVertical: 20
    },
    ReqButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 14,
        fontFamily: "Poppins-Regular",
    },
    bottomcontent: {
        justifyContent: "center",

        marginTop: 0,
    },
    loginText: {
        color: "#5E27DA",
        fontSize: 14,
        fontWeight: "700",
        paddingTop: 5,
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



});
