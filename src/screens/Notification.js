import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Notification = () => {
    return (
        <View style={{ alignSelf: 'center', backgroundColor: '#fff', flex: 1, width: '100%' }}>
            <View style={{marginTop:150}}>
                <LottieView
                    source={require("../Assets/lottie/notFound.json")}
                    style={{
                        width: 150,
                        height: 150,
                        alignSelf: 'center',

                    }}
                    autoPlay loop
                />
                <Text style={{ textAlign: 'center', fontSize: 17, marginVertical: 10, fontFamily:'Poppins-Bold' }}>No Notification Yet</Text>
                <Text style={{ textAlign: 'center', fontSize: 14,fontFamily:'Poppins-Regular' }}>Your Notification will appear here once you've received them</Text>
            </View>

        </View>
    )
}

export default Notification

const styles = StyleSheet.create({})