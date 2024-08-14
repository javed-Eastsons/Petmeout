import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Cart = ({ navigation }) => {
    const cartItems = [
        // Sample data
        { id: '1', title: 'Monge Pedigree', price: '$100', quantity: 1, image: 'https://example.com/image1.png' },
        { id: '2', title: 'Monge Pedigree', price: '$100', quantity: 1, image: 'https://example.com/image2.png' },
        { id: '2', title: 'Monge Pedigree', price: '$100', quantity: 1, image: 'https://example.com/image2.png' },
        { id: '2', title: 'Monge Pedigree', price: '$100', quantity: 1, image: 'https://example.com/image2.png' },

        // Add more items here
    ];

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.price.replace('$', '')), 0).toFixed(2);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>My Cart</Text>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={require('../Assets/images/monge.jpg')} style={styles.image} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                        </View>
                        <TouchableOpacity style={styles.removeButton} onPress={() => { /* Remove item functionality */ }}>
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}

            />
            <View style={styles.footer}>
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>Quantity: </Text>
                    <Text style={styles.summaryText}>4</Text>
                </View>
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>Sub Total: </Text>
                    <Text style={styles.summaryText}>400$</Text>
                </View>
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>Discount: </Text>
                    <Text style={styles.summaryText}>10$</Text>
                </View>
                <View style={styles.part}></View>
                <View style={styles.summary}>
                    <Text style={styles.summaryTextF}>Total: </Text>
                    <Text style={styles.summaryTextF}>350$</Text>
                </View>
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => navigation.navigate('Checkout')}
                >
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 3, // For Android shadow
        shadowColor: '#000000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width: '95%',
        alignSelf: 'center',
        height: 80
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#e91e63', // Pink color for price
    },
    quantity: {
        fontSize: 14,
        color: '#555555',
    },
    removeButton: {
        backgroundColor: '#ff3b30',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    footer: {
        padding: 15,
        backgroundColor: '#ffffff',
        elevation: 15, // For Android shadow
        shadowColor: '#000000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },

    headerText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        alignSelf: 'center',
        marginBottom: 5
    },
    summaryText: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 5,
        textAlign: 'center',
    },
    summaryTextF: {
        fontSize: 18,
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        color: '#000'
    },
    checkoutButton: {
        backgroundColor: '#fbd349', // Primary button color
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        borderRadius: 30
    },
    checkoutButtonText: {
        color: '#ffffff',
        // fontSize:16,
        fontFamily:'Poppins-Bold'
    },
    part: {
        borderWidth: 0.5,
        borderColor: 'lightgray',
        marginVertical: 10
    },
});

export default Cart;
