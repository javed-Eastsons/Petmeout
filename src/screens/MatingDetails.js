import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Globals } from '../Config';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Loader } from '../Component/Loader';
import { GetPetById, petDetailsbyId } from '../Redux/Actions/Petmeout';

const MatingDetails = ({ route }) => {
    const { Mat } = route.params
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const [age , setAge]= useState(null)
    const { PET_DETAILS } = useSelector(state => state.PetmeOutReducer);
    console.log(Mat, 'MatMatMat')
    console.log(PET_DETAILS, 'PET_DETAILSPET_DETAILSPET_DETAILSPET_DETAILS')

    const requiredPetDetails = {
        name: 'Charlie',
        category: 'Dog',
        breed: 'Golden Retriever',
        age: 3,
        owner: 'John Doe',
        image: 'https://refuel.site/projects/socialzoo/admin/upload/pet1725447854.jpeg', // Replace with actual image URL
    };

    // Pets that posted required details
    const petsThatPosted = { id: '1', name: 'Buddy', category: 'Dog', breed: 'Labrador', age: '4', gender: 'Female', image: 'https://refuel.site/projects/socialzoo/admin/upload/pet1725447854.jpeg' }

    useEffect(() => {
        setLoader(true);
        dispatch(GetPetById(Mat?.pet_login_id, navigation));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [])

 



    return (
        <ScrollView style={styles.container}>
            {/* Required Pet Details Section */}
            <Loader flag={loader} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Pet Details of Posting Account</Text>
                <View style={styles.requiredPetDetails}>
                    <Image source={{ uri: PET_DETAILS?.image_path }} style={styles.petImageLarge} />
                    <View style={styles.petInfo}>
                        <Text style={styles.petName}>{PET_DETAILS?.pet_name}</Text>
                        <Text style={styles.petDetails}>Category: {PET_DETAILS?.cat_name}</Text>
                        <Text style={styles.petDetails}>Breed: {PET_DETAILS?.breed}</Text>
                        <Text style={styles.petDetails}>Age: {age} years</Text>
                        <Text style={styles.petDetails}>Owner: <Text style={{ width: 200, fontSize: 11 }}>{PET_DETAILS?.owner}</Text></Text>
                    </View>
                </View>
            </View>

            {/* Pets That Posted Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Required Pet Details for Mating</Text>
                <View style={styles.postedPetItem}>
                    <Image source={{ uri: Globals?.categoriesImagePath + Mat?.pet_image }} style={styles.petImage} />
                    <View style={[styles.petInfo]}>
                        <Text style={styles.petDetails}>Category: {Mat.category}</Text>
                        <Text style={styles.petDetails}>Breed: {Mat.breed}</Text>
                        <Text style={styles.petDetails}>Age: {Mat.age}</Text>
                        <Text style={styles.petDetails}>Gender: {Mat.gender}</Text>
                        <Text style={styles.petDetailsM}>Message: {Mat?.message}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.submitButton} >
                <Text style={styles.submitButtonText}>Contact</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f7f7f7', // Light background color for a modern look
    },
    section: {
        marginBottom: 24,
        padding: 5
        // height:  2\320
    },
    sectionTitle: {
        fontSize: 19,
        color: '#333',
        marginBottom: 12,
        fontFamily: 'Poppins-Bold'

    },
    requiredPetDetails: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: 'row', // Align image and details horizontally
        alignItems: 'center',
    },
    petInfo: {
        marginLeft: 16,
    },
    petName: {
        fontSize: 16,
        color: '#2C3E50',
        fontFamily: 'Poppins-SemiBold'
    },
    petDetails: {
        fontSize: 14,
        color: '#7f8c8d',
        marginTop: 4,
        fontFamily: 'Poppins-Regular'
    },
    petDetailsM: {
        fontSize: 14,
        color: '#7f8c8d',
        marginTop: 4,
        // height: 60,
        // width: 130,
        overflow: 'scroll',
        fontFamily: 'Poppins-Regular'
    },
    petImageLarge: {
        width: 120,
        height: 140,
        borderRadius: 10, // Circular image

    },
    postedPetItem: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        // height: 220
    },
    petImage: {
        width: 120,
        height: 150,
        borderRadius: 10,
        resizeMode: 'contain'
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        // marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
});

export default MatingDetails;
