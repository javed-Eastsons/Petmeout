import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet ,RefreshControl} from 'react-native';
import { friendRequestList, friendRequestStatus } from '../Redux/Actions/Petmeout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Loader } from '../Component/Loader';
import LottieView from 'lottie-react-native';


const FriendsList = () => {

    const { LOGIN_PET } = useSelector(state => state.PetmeOutReducer);
    const { FRIENDS_REQUESTS } = useSelector(state => state.PetmeOutReducer);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(friendRequestList(LOGIN_PET?.pet_id, navigation));
        setTimeout(() => {
            setRefreshing(false);
        }, 2000); // Time for refresh
    };
    // console.log(FRIENDS_REQUESTS, 'FRIENDS_REQUESTSFRIENDS_REQUESTS')
    // console.log(LOGIN_PET, 'LOGIN_PETLOGIN_PETLOGIN_PET')
    const renderItem = ({ item }) => (
        <View style={styles.requestContainer}>
            <Image source={{ uri: item.image_path }} style={styles.profileImage} />
            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{item.pet_name}</Text>
                <View style={styles.buttonContainer}>
                    {/* Confirm Button */}
                    <TouchableOpacity style={styles.confirmButton} onPress={()=>{onSubmit(item,'Accept')}}>
                        <Text style={styles.confirmText}>Confirm</Text>
                    </TouchableOpacity>
                    {/* Delete Button */}
                    <TouchableOpacity style={styles.deleteButton} onPress={()=>{onSubmit(item,'Delete')}}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
    useEffect(() => {
        setLoader(true);
        dispatch(friendRequestList(LOGIN_PET?.pet_id, navigation));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [LOGIN_PET?.pet_id]);

    const onSubmit = (data, status) => {
        setLoader(true);
        dispatch(friendRequestStatus(data?.sender_id, data?.receiver_id,status, navigation));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }
    return (
        <View style={styles.container}>
            <Loader flag={loader} />
            <Text style={styles.head}>Friend Requests({FRIENDS_REQUESTS?.length})➢</Text>
            {
                FRIENDS_REQUESTS?.length < 1 ?
                    <View style={{ marginTop: 150 }}>
                        <LottieView
                            source={require("../Assets/lottie/notFound.json")}
                            style={{
                                width: 150,
                                height: 150,
                                alignSelf: 'center',

                            }}
                            autoPlay loop
                        />
                        <Text style={{ textAlign: 'center', fontSize: 17, marginVertical: 10, fontFamily: 'Poppins-Bold' }}>No Friend Request Yet</Text>
                        <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'Poppins-Regular' }}>Your Friends Requests will appear here once you've received them</Text>
                    </View>
                    :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={FRIENDS_REQUESTS}
                        keyExtractor={(item) => item.friend_id}
                        renderItem={renderItem}
                        contentContainerStyle={styles.containerF}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                          }
                    />
            }

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        flex: 1
    },
    containerF: {
        marginTop: 10
    },
    requestContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    nameText: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    confirmText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    deleteButton: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderColor: '#4CAF50',
        borderWidth: 1,
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteText: {
        color: '#4CAF50',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    head: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold'
    }
});

export default FriendsList;
