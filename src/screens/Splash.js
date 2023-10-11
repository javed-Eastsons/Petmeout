import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Splash = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../Assets/img/logo_mail.png")}
                style={styles.logo}
            /> 
     </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#94B520',
                // backgroundColor: '#fff',
                justifyContent:'center',
                alignItems:'center'

    },
    logo:{
        width:190,
        height:75
    }
})