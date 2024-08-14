import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { categoryList } from '../Redux/Actions/Petmeout';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Globals } from '../Config/index';

const profileGallery = () => {
    const navigation = useNavigation();
    const { CATEGORY_LIST } = useSelector(state => state.PetmeOutReducer);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setLoader(true);
        dispatch(categoryList());
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);
    return (
        <View >
            <View style={{ alignSelf:'center',borderRadius:10,width:'100%'}}>
                <FlatList
                    // contentContainerStyle={{ paddingBottom: 200 }}
                    showsVerticalScrollIndicator={false}
                    data={CATEGORY_LIST}
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
                                source={{
                                    uri: Globals?.categoriesImagePath + item.cat_image,
                                }}
                                style={{
                                    height: 100, width: 100, marginLeft: 10,borderRadius:10
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

                    )}
                />
            </View>

        </View>
    )
}

export default profileGallery

const styles = StyleSheet.create({})