import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { categoryList, petsPostListingbyID } from '../Redux/Actions/Petmeout';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Globals } from '../Config/index';

const profileGallery = ({ route }) => {
    const navigation = useNavigation();
    const { petDetails } = route?.params
    const { CATEGORY_LIST, POSTS_BY_PETID } = useSelector(state => state.PetmeOutReducer);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const reversedData = POSTS_BY_PETID ? [...POSTS_BY_PETID].reverse() : null;

    console.log(POSTS_BY_PETID, 'POSTS_BY_PETIDPOSTS_BY_PETID')

    useEffect(() => {
        setLoader(true);
        dispatch(categoryList());
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);
    useEffect(() => {
        setLoader(true);
        dispatch(petsPostListingbyID(petDetails?.pet_id, navigation));
        setTimeout(() => setLoader(false), 2000);
    }, [dispatch, petDetails?.pet_id, navigation]);
    return (
        <View >
            <View style={{ alignSelf: 'center', borderRadius: 10, width: '100%' }}>
                <FlatList
                    // contentContainerStyle={{ paddingBottom: 200 }}
                    showsVerticalScrollIndicator={false}
                    data={reversedData}
                    contentContainerStyle={{
                        alignSelf: 'center',
                        alignItems: 'center',
                    }}
                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    // numColumns={2}
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        item.post_img.map((data) => {
                            return (
                                <>
                                    {
                                        data?.post_medias?.endsWith('.mp4') ? null :
                                            <TouchableOpacity
                                                //  onPress={() => { navigation.navigate('AllPetsCategories', { categoryName: item?.cat_name }) }}
                                                style={{ marginTop: 10 }}>
                                                <Image
                                                    source={{
                                                        uri: Globals?.categoriesImagePath + data?.post_medias,
                                                    }}
                                                    style={{
                                                        height: 100, width: 100, marginLeft: 10, borderRadius: 10
                                                    }}
                                                    resizeMode='cover'
                                                />
                                                {/* <Text
                                style={{
                                    color: '#8b9088',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    marginTop: 7,
                                    fontFamily: 'Poppins-Regular'
                                }}>
                                {item?.cat_name}
                            </Text> */}
                                            </TouchableOpacity>
                                    }
                                </>
                            )
                        })



                    )}
                />
            </View>

        </View>
    )
}

export default profileGallery

const styles = StyleSheet.create({})