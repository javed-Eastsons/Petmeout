import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Globals } from '../Config';
const { width } = Dimensions.get('window');

const AdaptationDetails = ({ route, navigation }) => {
    // Assuming route.params contains product data
    const { AdoptDetail } = route.params;


    const images = [
        {
            "id": 1,
            "url": "https://refuel.site/projects/socialzoo/admin/upload/pet1725447854.jpeg",
            "title": "Sample Image 1",
            "description": "This is the description for Image 1."
        },
        {
            "id": 2,
            "url": "https://refuel.site/projects/socialzoo/admin/upload/pet1725521553.jpeg",
            "title": "Sample Image 2",
            "description": "This is the description for Image 2."
        },
        {
            "id": 3,
            "url": "https://refuel.site/projects/socialzoo/admin/upload/pet1726134296.jpeg",
            "title": "Sample Image 3",
            "description": "This is the description for Image 3."
        },
        {
            "id": 4,
            "url": "https://refuel.site/projects/socialzoo/admin/upload/pet1725536632.jpeg",
            "title": "Sample Image 4",
            "description": "This is the description for Image 4."
        },
        {
            "id": 5,
            "url": "https://refuel.site/projects/socialzoo/admin/upload/pet1726573491.jpeg",
            "title": "Sample Image 5",
            "description": "This is the description for Image 5."
        }
    ]



    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {/* <Image source={{ uri: AdoptDetail?.pet_image }} style={styles.image} resizeMode='contain' /> */}
            <Carousel
                loop
                style={{ height: hp(41) }}
                width={340}
                height={100}
                autoPlay={true}
                data={AdoptDetail?.adoptionsImages}
                scrollAnimationDuration={2000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index, item }) => (
                    <View
                        style={{
                            width: '100%',
                            height: hp(40),
                            overflow: 'hidden', // Ensure the border radius is applied
                            borderRadius: 15, // Apply border radius to the container
                            // backgroundColor: 'red',
                            // marginTop: hp(21)
                        }}
                    >

                        <Image
                           source={{ uri: Globals?.categoriesImagePath + item.adoptions_images }}
                            style={styles.feedImgFull}
                        />


                    </View>
                )}
            />

            <View style={styles.detailsContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>{AdoptDetail.title}</Text>

                        <Image style={{ height: 20, width: 20 }} source={require('../Assets/img/icons/verify.png')} />

                    </View>
                    {/* <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 13, backgroundColor: '#a6dcbf', height: 25, padding: 4, borderRadius: 15, width: 90, textAlign: 'center' }}>Vaccinated</Text>
                    </View> */}

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <View>
                        <Text style={styles.titleD}> Age</Text>
                        <Text style={styles.dataD}>|{AdoptDetail.age} years</Text>
                    </View>
                    <View>
                        <Text style={styles.titleD}>Category</Text>
                        <Text style={styles.dataD}>|{AdoptDetail.category}</Text>
                    </View>
                    <View>
                        <Text style={styles.titleD}>Breed</Text>
                        <Text style={styles.dataD}>|{AdoptDetail.breed}</Text>
                    </View>
                    <View>
                        <Text style={styles.titleD}>Gender</Text>
                        <Text style={styles.dataD}>|{AdoptDetail.gender}</Text>
                    </View>
                </View>
                <Text style={{ marginTop: 20, marginBottom: 5, fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>About {AdoptDetail.name}:</Text>
                <Text style={styles.description}>{AdoptDetail?.description}</Text>
                {/* <Text style={styles.price}>$100</Text> */}

                <TouchableOpacity style={styles.button} onPress={() => { /* Add to cart functionality */ }}>
                    <Text style={styles.buttonText}>Adopt Now</Text>
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
        // marginBottom: 10,
        fontFamily: 'Poppins-Bold',
    },
    price: {
        fontSize: 20,
        color: '#000', // Pink color for price
        marginBottom: 5,
        fontFamily: 'Poppins-SemiBold',
    },
    description: {
        fontSize: 14,
        marginBottom: 20,
        fontFamily: 'Poppins-Regular',
        // marginTop:20

    },
    button: {
        backgroundColor: '#4CAF50', // Primary button color
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16
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
    titleD: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
    },
    dataD: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13
    },
    feedImgFull: {
        width: '100%',
        height: hp(40),
        // marginTop: 30,
        alignSelf: 'center',
        // marginLeft: 10,
        // marginTop: hp(21),
        resizeMode: 'contain',
        borderRadius: 15,
        // marginBottom: 10

    },
});

export default AdaptationDetails;
