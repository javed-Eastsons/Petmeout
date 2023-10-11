import { StyleSheet, Text, View, ImageBackground, Image, Button } from 'react-native'
import React from 'react'

const Login = () => {
    const bgImage = require("../Assets/img/login-mainbg.jpg")

    return (
        <>
            <ImageBackground source={bgImage} style={styles.bgImg} resizeMode='cover'>
                <View style={styles.container}>
                    <Image
                        source={require("../Assets/img/logo.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.text}>Sign in to start your session</Text>
                    <View style={{ width: '70%', alignSelf: 'center', marginBottom: 30 }}>
                        <Button
                            title="Login With Office 365"
                            color="#1C84C6"
                        // onPress={() => setModalVisible(true)}
                        />
                    </View>
                </View>
                <Text style={styles.footerText}>© 2023 taxleaf.com - All Rights Reserved Login</Text>
            </ImageBackground>
            <View >
                <Image
                    source={require("../Assets/img/bigbubble.png")}
                    style={styles.footerImg}
                />
            </View >

        </>

    )
}

export default Login

const styles = StyleSheet.create({
    bgImg: {
        height: '100%',
        // // width:'100%',
        // resizeMode:'cover'
    },
    container: {
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 120,
        padding: 10
    },
    logo: {
        width: 170,
        height: 70
    },
    text: {
        color: '#676A6C',
        marginVertical: 30
    },
    footerImg: {
        position:'absolute',
        bottom:0,
        width:'100%',
        height:140,
      
    },
    footerText:{
        textAlign:'center',
        marginTop:20,
        color: '#676A6C'
    }
})