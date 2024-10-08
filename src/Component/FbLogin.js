import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { LoginButton, AccessToken, GraphRequest, LoginManager } from 'react-native-fbsdk-next';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FbLogin = () => {
    const handleFacebookLogin = () => {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log(result,'resultresultresult')

                    console.log("Login cancelled");
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        console.log("Login success with permissions: " + result.grantedPermissions.toString());
                        console.log("Access token: " + data.accessToken.toString());
                        // Handle the access token (e.g., send it to your server)
                    });
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    };

    return (
        <View>
            <TouchableOpacity onPress={handleFacebookLogin} style={{ height: 40, backgroundColor: '#3b5998', marginBottom: 10, flexDirection: 'row', justifyContent: 'center', borderRadius: 20 }}>
                <Image
                    source={require('../Assets/facebookIcon.png')}
                    style={[styles.iconsLogin, { marginTop: 10, marginRight: 5 }]}
                />
                <Text style={{ color: '#fff', fontSize: 14, marginTop: 10, textAlign: 'center', fontWeight: '500' }}>Login Via Facebook</Text>

            </TouchableOpacity>
            
        </View>
    )
}

export default FbLogin

const styles = StyleSheet.create({
    iconsLogin: {
        width: 18,
        height: 18
    },
})