import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const ProductDetails = ({ route, navigation }) => {
  // Assuming route.params contains product data
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={require('../Assets/images/monge.jpg')} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <TouchableOpacity style={styles.button} onPress={() => { /* Add to cart functionality */ }}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  image: {
    width: width - 20,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    // borderRadius: 10,
    padding: 10,
    // elevation: 5, // For Android shadow
    // shadowColor: '#000000', // For iOS shadow
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontFamily:'Poppins-Bold',
  },
  price: {
    fontSize: 20,
    color: '#000', // Pink color for price
    marginBottom: 15,
    fontFamily:'Poppins-SemiBold',
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily:'Poppins-Regular',

  },
  button: {
    backgroundColor: '#fbd349', // Primary button color
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#007bff', // Outline color
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonOutlineText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default ProductDetails;
