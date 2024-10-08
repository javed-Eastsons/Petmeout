import { Text, StyleSheet, View, Alert } from 'react-native'
import React, { Component, useState } from 'react'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId: '997099202402-u659ttpaadfsg68mplc4d7kv2c5v42kh.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
});
const GoogleLogin = (props) => {
    const [userGoogleInfo, setuserGoogleInfo] = useState({});
    const [loaded, setLoaded] = useState(false);
    console.log(userGoogleInfo, 'userGoogleInfouserGoogleInfouserGoogleInfo')

    // const signIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         setuserGoogleInfo(userInfo)
    //         setLoaded(true)
    //     } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             Alert.alert('SIGN_IN_CANCELLED')
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             Alert.alert('IN_PROGRESS')
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             Alert.alert('PLAY_SERVICES_NOT_AVAILABLE')
    //         } else {
    //             // some other error happened
    //         }
    //     }
    //     getCurrentUser()

    // };
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info:', userInfo); // This should log user information
            Alert.alert('Signed in successfully', `User: ${userInfo.user.email}`);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Sign in in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play services not available or outdated');
            } else {
                console.log('Some other error happened:', error);
            }
        }
    };


    return (
        <View>
            <GoogleSigninButton
                style={{ width: 320, height: 50, alignSelf: 'center' }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
            // disabled={this.state.isSigninInProgress}
            />
            {
                loaded ?
                    <>
                        <Text>{userGoogleInfo?.user?.name}</Text>
                        <Text>{userGoogleInfo?.user?.email}</Text>

                    </>
                    : null
            }



        </View>
    )

}
export default GoogleLogin;
const styles = StyleSheet.create({})