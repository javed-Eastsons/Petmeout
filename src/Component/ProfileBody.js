import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, createPost } from '../Redux/Actions/Petmeout';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';
import { Loader } from '../Component/Loader';
import { CHAT_DATA } from '../Redux/Actions/types';

export const ProfileBody = ({
  name,
  accountName,
  profileImage,
  post,
  followers,
  following,
  petDetails
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [postContent, setPostContent] = useState('')
  const [imageUri, setImageUri] = useState();
  const [loader, setLoader] = useState(false);

  const [base64String, setBase64String] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false)
  const { LOGIN_DATA } = useSelector(state => state.PetmeOutReducer);
  const { LOGIN_PET } = useSelector(state => state.PetmeOutReducer);

  console.log(petDetails, 'petDetailspetDetails@@')
  console.log(LOGIN_PET, 'LOGIN_PETLOGIN_PETLOGIN_PET')
  const pickImageFromGallery = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        convertToBase64(uri)
      }
    });
  };
  const convertToBase64 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64String(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.log('Error converting image to base64:', error);
    }
  };

  const makePost = () => {
    setLoader(true);
    dispatch(createPost(petDetails?.pet_id, petDetails?.pet_name, petDetails?.cat_name, LOGIN_DATA?.email, postContent, base64String, navigation));
    setShowPostModal(false)
    setPostContent('')
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }
  const AddFriend = () => {
    setLoader(true);
    dispatch(addFriend(LOGIN_PET?.pet_id, petDetails?.pet_id, navigation));
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }

  const openModal = (id) => {
    setShowPostModal(true)
  }

  const gotoChat = () => {

    navigation.navigate('Chat')
  }

  useEffect(() => {
    dispatch({
      type: CHAT_DATA,
      payload: petDetails,
    });
  }, [petDetails])

  return (
    <View>
      <Loader flag={loader} />
      {/* {accountName ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#000'
              }}>
              {accountName}
            </Text>
            <Feather
              name="chevron-down"
              style={{
                fontSize: 20,
                color: 'black',
                paddingHorizontal: 5,
                opacity: 0.5,
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={openModal}>
              <Feather
                name="plus-square"
                style={{
                  fontSize: 25,
                  color: 'black',
                  paddingHorizontal: 15,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
            //  onPress={()=> navigation.navigate('CreateProfile')}
            >
              <Feather
                name="settings"
                style={{
                  fontSize: 25,
                  color: '#000'
                }}
              />
            </TouchableOpacity>

          </View>
        </View>
      ) : null} */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',

          // paddingVertical: 20,
        }}>
        <View
          style={{
            alignItems: 'center',

          }}>
          <Image
            source={{
              uri: profileImage
            }}
            style={{
              resizeMode: 'cover',
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              paddingVertical: 5,
              fontWeight: 'bold',
              color: '#000'
            }}>
            {name}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#000' }}>{post}</Text>
          <Text style={{ color: '#000' }}>Posts</Text>
        </View>
        {/* <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{followers}</Text>
          <Text>Friends</Text>
        </View> */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#000' }}>{following}</Text>
          <Text style={{ color: '#000' }}>Friends</Text>
        </View>
      </View>
      {
        petDetails?.pet_id !== LOGIN_PET?.pet_id && petDetails?.owner !== LOGIN_PET?.owner ?
          <View style={styles.container}>
            {
              petDetails?.status == "Accept" ?
                <TouchableOpacity style={styles.messageButton} onPress={gotoChat}>
                  <Text style={styles.messageButtonText}>Message</Text>
                </TouchableOpacity>
                :
                <>
                  <TouchableOpacity style={styles.addButton} onPress={AddFriend}>
                    <Text style={styles.addButtonText}>{petDetails?.status == "Requested" ? 'Requested' : petDetails?.status == "Delete" ? 'Add Friend' : 'Add Friend'}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.messageButton} onPress={() => navigation.navigate('Chat', { petDetails: petDetails })}>
                    <Text style={styles.messageButtonText}>Message</Text>
                  </TouchableOpacity>
                </>
            }
          </View>
          :
          null
      }

      <Modal
        //  backdropColor={'transparent'}
        backdropOpacity={0.5}
        animationType="slide"
        transparent={true}
        visible={showPostModal}
        onRequestClose={() => {
          setShowPostModal(false)

        }}
      >
        <View style={styles.modalWrapper2}>
          <View style={styles.modalWrapp1}>
            <View style={styles.content}>
              <View style={{ backgroundColor: '#fff', padding: 10, width: '95%', alignSelf: 'center', marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 17, color: 'gray' }}>Create Post</Text>
                  <TouchableOpacity onPress={() => setShowPostModal(false)}>
                    <Icon name='cross' size={20} color="gray" />
                  </TouchableOpacity>

                </View>
                <View style={styles.part}></View>
                <View style={{ flexDirection: 'row', width: 70 }}>
                  <View
                  >
                    <Image
                      source={{
                        uri: petDetails?.image_path,
                      }}
                      style={styles.profileImg}
                    />
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <TextInput
                      autoCompleteType="email"
                      keyboardType="email-address"
                      underlineColorAndroid="transparent"
                      textContentType="emailAddress"
                      placeholder="Write Something Here..."
                      onChangeText={(text) => setPostContent(text)}
                      style={[styles.input1, {}]}
                      placeholderTextColor={'gray'}
                      multiline={false} // Single line input
                      numberOfLines={1} // Ensures it stays on one line
                    // maxLength={40} // Adjust the max length as needed
                    />
                  </View>
                </View>
                <View style={styles.part}></View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={pickImageFromGallery}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#e5e5e5', width: 110, height: 35, paddingTop: 5, padding: 5, borderRadius: 5 }}>
                      <Image
                        source={require('../Assets/addPhoto.png')}
                        style={{ width: 20, height: 20, marginTop: 3 }}
                      />
                      <Text style={{ marginTop: 4, marginLeft: 2, fontSize: 11, color: '#000' }}>Photo/Video</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ width: 95 }}>
                  </View>
                  <View style={{ width: 110, height: 35 }}>

                  </View>
                </View>
                <TouchableOpacity style={styles.btn} onPress={makePost}>
                  <Text style={styles.textStyle}>Post</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

export const ProfileButtons = ({ id, name, accountName, profileImage }) => {
  const navigation = useNavigation();
  const [follow, setFollow] = useState(follow);
  return (
    <>
      {id === 0 ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingVertical: 5,
          }}>
          {/* <TouchableOpacity
            onPress={() =>
              navigation.push('EditProfile', {
                name: name,
                accountName: accountName,
                profileImage: profileImage,
              })
            }
            style={{
              width: '100%',
            }}>
            <View
              style={{
                width: '100%',
                height: 35,
                borderRadius: 5,
                borderColor: '#DEDEDE',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  letterSpacing: 1,
                  opacity: 0.8,
                }}>
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setFollow(!follow)}
            style={{ width: '42%' }}>
            <View
              style={{
                width: '100%',
                height: 35,
                borderRadius: 5,
                backgroundColor: follow ? null : '#3493D9',
                borderWidth: follow ? 1 : 0,
                borderColor: '#DEDEDE',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: follow ? 'black' : 'white' }}>
                {follow ? 'Following' : 'Follow'}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '42%',
              height: 35,
              borderWidth: 1,
              borderColor: '#DEDEDE',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{ color: '#000' }}>Message</Text>
          </View>
          <View
            style={{
              width: '10%',
              height: 35,
              borderWidth: 1,
              borderColor: '#DEDEDE',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Feather
              name="chevron-down"
              style={{ fontSize: 20, color: 'black' }}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  profileImg: {
    width: 70,
    borderRadius: 80,
    height: 70,
    resizeMode: 'contain',
    // marginTop: 30,
    // alignSelf: 'center',
    marginLeft: 10,

  },
  profileImg1: {
    width: 60,
    borderRadius: 80,
    height: 60,
    // marginTop: 30,
    // alignSelf: 'center',
    marginLeft: 10,

  },
  commentImg: {
    width: 40,
    borderRadius: 80,
    height: 40,
    // marginTop: 30,
    // alignSelf: 'center',
    marginLeft: 10,
  },
  feedImg: {
    width: '100%',
    height: 220,
    // marginTop: 30,
    alignSelf: 'center',
    // marginLeft: 10,
    marginTop: 10,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 10

  },
  part: {
    borderWidth: 0.5,
    borderColor: 'lightgray',
    marginVertical: 15
  },
  input1: {
    // backgroundColor: '#fff',
    width: 230,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 5,
    height: 40,

    // borderColor:'gray',
    // borderLeftColor:'gray'
  },
  input: {
    backgroundColor: '#fff',
    width: '70%',
    alignSelf: 'center',
    height: 35,
    // borderColor:'gray',
    // borderLeftColor:'gray'
    marginLeft: 20
  },
  comment: {
    width: '98%',
    borderWidth: 0.5,
    borderRadius: 5,
    flexDirection: 'row',
    height: 40,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center'
  },

  postText: { fontSize: 13, marginTop: 10, fontFamily: 'Poppins-Regular' },
  modalWrapp: {
    height: hp(48), width: wp(100), position: 'absolute',
    bottom: -10, backgroundColor: '#fff'
  },

  modalWrapp1: {
    height: hp(40), width: wp(95), position: 'absolute',
    bottom: 200, backgroundColor: '#fff',
    elevation: 100,
    borderRadius: 10
  },
  modalWrapp2: {
    height: hp(90), width: wp(100), position: 'absolute',
    bottom: -20, backgroundColor: '#fff',
    elevation: 50, borderTopLeftRadius: 10, borderTopRightRadius: 10
  },
  modalWrapper2: {
    flex: 1,
    // backgroundColor: "#00000040",
    alignItems: "center",
    justifyContent: "flex-end",

  },
  content: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular'
  },
  btn: {
    backgroundColor: '#8AB645',
    borderRadius: 5,
    width: 80,
    // height:20,
    padding: 5,
    // elevation: 2,
    // width: wp(30),
    alignSelf: 'flex-end',
    marginTop: 10
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  addButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 7,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  messageButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#ffffff',
    borderColor: '#4CAF50',
    borderWidth: 1,
    paddingVertical: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
  },
})