import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const PetStore = () => {
  return (
    <View style={{marginTop:160,alignSelf:'center'}}>
       <Image source={require('../Assets/img/icons/shop.png')} style={styles.logo} resizeMode="contain"/>
    </View>
  )
}

export default PetStore

const styles = StyleSheet.create({
    logo:{
        width:250,
        height:250
    }
})