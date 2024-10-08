import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { categoryList, friendsLists } from '../Redux/Actions/Petmeout';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Globals } from '../Config/index';
import { Loader } from '../Component/Loader';

const profileFriends = ({route}) => {
    const navigation = useNavigation();
    const { FRIENDS_LISTS } = useSelector(state => state.PetmeOutReducer);
    const { LOGIN_PET } = useSelector(state => state.PetmeOutReducer);
    const { petDetails } = route?.params
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    console.log(FRIENDS_LISTS,'FRIENDS_LISTSFRIENDS_LISTSFRIENDS_LISTS')
    useEffect(() => {
        setLoader(true);
        dispatch(friendsLists(petDetails?.pet_id,navigation));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [petDetails]);
    const postInfo = [
        {
            postTitle: 'Petey Cruiser',
            postPersonImage: require('../Assets/cat2.jpg'),
            postImage: require('../Assets/images/05.jpg'),
            likes: 765,
            isLiked: false,
        },
        {
            postTitle: 'Anna Sthesia',
            postPersonImage: require('../Assets/cat3.jpg'),
            postImage: require('../Assets/images/06.jpg'),
            likes: 345,
            isLiked: false,
        },
        {
            postTitle: 'Paul Molive',
            postPersonImage: require('../Assets/cat2.jpg'),
            postImage: require('../Assets/images/07.jpg'),
            likes: 734,
            isLiked: false,
        },
        {
            postTitle: 'Gail Forcewind',
            postPersonImage: require('../Assets/profile3.jpg'),
            postImage: require('../Assets/images/08.jpg'),
            likes: 875,
            isLiked: false,
        },
        {
            postTitle: 'Paige Turner',
            postPersonImage: require('../Assets/profile3.jpg'),
            postImage: require('../Assets/images/09.jpg'),
            likes: 875,
            isLiked: false,
        },
        {
            postTitle: 'Ira Luis',
            postPersonImage: require('../Assets/profile3.jpg'),
            postImage: require('../Assets/images/10.jpg'),
            likes: 875,
            isLiked: false,
        },
        {
            postTitle: 'Paige Frapples',
            postPersonImage: require('../Assets/profile3.jpg'),
            postImage: require('../Assets/images/13.jpg'),
            likes: 875,
            isLiked: false,
        },
        {
            postTitle: 'Walter',
            postPersonImage: require('../Assets/profile3.jpg'),
            postImage: require('../Assets/images/14.jpg'),
            likes: 875,
            isLiked: false,
        },
        {
            postTitle: 'Bob Lee',
            postPersonImage: require('../Assets/profile3.jpg'),
            postImage: require('../Assets/images/15.jpg'),
            likes: 875,
            isLiked: false,
        },
        {
            postTitle: 'Maya Ddas',
            postPersonImage: require('../Assets/profile3.jpg'),
            postImage: require('../Assets/images/16.jpg'),
            likes: 875,
            isLiked: false,
        },
        {
            postTitle: 'Monti Carlo',
            postPersonImage: require('../Assets/profile3.jpg'),
            postImage: require('../Assets/images/17.jpg'),
            likes: 875,
            isLiked: false,
        },
        {
            postTitle: 'The_Groot',
            postPersonImage: require('../Assets/profile3.jpg'),
            postImage: require('../Assets/images/18.jpg'),
            likes: 875,
            isLiked: false,
        },
    ];

    return (
        <View >
            <Loader flag={loader}/>
            <View style={{ alignSelf: 'center', borderRadius: 10, width: '100%' }}>
                <FlatList
                    // contentContainerStyle={{ paddingBottom: 200 }}
                    showsVerticalScrollIndicator={false}
                    data={FRIENDS_LISTS}
                    contentContainerStyle={{
                        alignSelf: 'center',
                        alignItems: 'center',
                    }}
                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    // numColumns={2}
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            //  onPress={() => { navigation.navigate('AllPetsCategories', { categoryName: item?.cat_name }) }}
                            style={{ marginTop: 10 }}>
                            <Image
                                source={{uri:item?.image_path}}
                                style={{
                                    height: 100, width: 100, marginLeft: 10, borderRadius: 10
                                }}
                                resizeMode='cover'
                            />
                            
                                
                        
                            <Text
                                style={{
                                    color: '#8b9088',
                                    fontSize: 12,
                                    textAlign: 'center',
                                    marginTop: 7,
                                    fontFamily: 'Poppins-Regular'
                                }}>
                                {item?.pet_name}
                            </Text>
                        </TouchableOpacity>

                    )}
                />
            </View>

        </View>
    )
}

export default profileFriends

const styles = StyleSheet.create({})