import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Alert } from 'react-native';

const Vaccination = () => {
    // Static data for demonstration
    const navigation = useNavigation();

    const postData = [
        {
            post_id: '10',
            pet_name: 'Posco',
            owner: 'ajay5@eastsons.com',
            msg: 'Good morning',
            pet_image: 'https://refuel.site/projects/socialzoo/admin/upload/pet1721995626.jpeg',
        },
        {
            post_id: '19',
            pet_name: 'Catty',
            owner: 'ajay5@eastsons.com',
            msg: 'Cattty perry!!!',
            pet_image: 'https://refuel.site/projects/socialzoo/admin/upload/pet1721738878.jpeg',
        },
        // Add more static data as needed
    ];

    const handleDownloadChart = () => {
        // Implement download logic here
        Alert.alert('Download', 'Vaccination chart downloaded successfully!');
    };

  
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.pet_image }} style={styles.petImage} />
            <View style={styles.cardContent}>
                <Text style={styles.petName}>{item.pet_name}</Text>
                <Text style={styles.petDetails}>{item.owner}</Text>
                <Text style={styles.petDetails}>{item.msg}</Text>


            </View>
        </View>
    );

    return (
        <View style={{flex:1, backgroundColor:'#fff'}}>
            <Text style={styles.title}>Vaccination</Text>
            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',paddingHorizontal:20}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VaccinationChart')}>
                    <Text style={styles.buttonText}>Download Chart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BookVaccination')}>
                    <Text style={styles.buttonText}>Book Now</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={postData}
                renderItem={renderItem}
                keyExtractor={(item) => item.post_id}
                contentContainerStyle={styles.container}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        padding: 20,
        // backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'flex-start',
        marginTop:10,
        paddingLeft: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        padding: 10,
    },
    petImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    petName: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
    
    },
    petDetails: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#8AB645',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default Vaccination;
