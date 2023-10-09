import React from 'react'
import { View, Text, Dimensions,StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
const HomeScreen = () => {
    const SLIDER_WIDTH = Dimensions.get('window').width;
    // const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
    // const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
    const DATA = ['aj','jk','kjkk'];
    
    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemLabel}>{`Item ${item}`}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                Thank you for being our client since 2023
            </Text>
            <View>
                <Carousel
                    //   ref={(c) => { this._carousel = c; }}
                    data={DATA}
                    renderItem={renderItem}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={70}
                />
            </View>
        </View>)
}

export default HomeScreen

const styles = StyleSheet.create({
    carouselContainer: {
      marginTop: 50
    },
    itemContainer: {
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'dodgerblue'
    },
    itemLabel: {
      color: 'white',
      fontSize: 24
    },
    counter: {
      marginTop: 25,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    
  });