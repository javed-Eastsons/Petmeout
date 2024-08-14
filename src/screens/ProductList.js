import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

import { useIsFocused, useNavigation } from '@react-navigation/native';

const products = [
    {
        id: '1', title: 'Monge Pedigree', price: '$200.00', image: 'https://via.placeholder.com/150', description: 'Formulated to support a long growth period Promotes good digestive health Balanced calcium and phosphorous supports bones & joints Antioxidant complex to support the immune system'
    },
    { id: '2', title: 'Monge Pedigree', price: '$350.00', image: 'https://via.placeholder.com/150', description: 'Formulated to support a long growth period Promotes good digestive health Balanced calcium and phosphorous supports bones & joints Antioxidant complex to support the immune system' },
    { id: '3', title: 'Monge Pedigree', price: '$400.00', image: 'https://via.placeholder.com/150', description: 'Formulated to support a long growth period Promotes good digestive health Balanced calcium and phosphorous supports bones & joints Antioxidant complex to support the immune system' },
    { id: '1', title: 'Monge Pedigree', price: '$200.00', image: 'https://via.placeholder.com/150', description: 'Formulated to support a long growth period Promotes good digestive health Balanced calcium and phosphorous supports bones & joints Antioxidant complex to support the immune system' },
    { id: '2', title: 'Monge Pedigree', price: '$350.00', image: 'https://via.placeholder.com/150', description: 'Formulated to support a long growth period Promotes good digestive health Balanced calcium and phosphorous supports bones & joints Antioxidant complex to support the immune system' },
    { id: '3', title: 'Monge Pedigree', price: '$400.00', image: 'https://via.placeholder.com/150', description: 'Formulated to support a long growth period Promotes good digestive health Balanced calcium and phosphorous supports bones & joints Antioxidant complex to support the immune system' },
    // Add more products here
];

const ProductCard = ({ item }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => { navigation.navigate('ProductDetails', { product: item }) }} style={styles.cardContainer}>
            <Image source={require('../Assets/images/monge.jpg')} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <TouchableOpacity style={styles.button}>
                <Icon name="plus" size={14} color="white" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}
const ProductList = () => {

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={require('../Assets/images/BG9.jpg')} // Replace with your image URL or local asset
                    style={[styles.imageBackground]}
                    resizeMode="contain"
                    imageStyle={{ borderRadius: 5}}

                >
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Make Your</Text>
                        <Text style={styles.text}>Pet Smile!</Text>
                    </View>
                </ImageBackground>
                <FlatList
                    data={products}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <ProductCard item={item} />}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                />
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    cardContainer: {
        width: width / 2 - 30, // Adjust width based on number of columns and padding
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        elevation: 5, // For Android shadow
        shadowColor: '#000000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        padding: 10,
        margin: 10,
        height: 225
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    title: {
        fontSize: 13,
        marginTop: 10,
        fontFamily: 'Poppins-Bold'
    },
    price: {
        fontSize: 14,
        color: '#000',
        marginVertical: 5,
        fontFamily: 'Poppins-SemiBold'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fbd349', // Background color
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        padding: 4,
        borderRadius: 5,
        width: 22,
        position: 'absolute',
        bottom: 80,
        right: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    row: {
        justifyContent: 'space-between',
    },
    imageBackground: {

        justifyContent: 'center',

        width: '97%', height: 180, alignSelf: 'center', marginLeft: 10,
       

    },
    textContainer: {
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignSelf: 'center',
    },
    text: {
        color: '#000', // Text color
        fontSize: 16, // Font size
        fontFamily: 'Poppins-Bold'
    }
});

export default ProductList;
