import React, { useState, useEffect,useRef } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet, Dimensions,TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector, useDispatch } from 'react-redux';
import { allPetsPostListing, createPost, deletePost, petsPostListingbyID } from '../Redux/Actions/Petmeout';
import { useNavigation } from '@react-navigation/native';
import { Loader } from '../Component/Loader';
import { Globals } from '../Config';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";
import { launchImageLibrary } from 'react-native-image-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Carousel from 'react-native-reanimated-carousel';
import Video from 'react-native-video';

const screenWidth = Dimensions.get('window').width;

const ProfilePosts = ({ route }) => {
  const { LOGIN_DATA, ALL_POSTS, POSTS_BY_PETID } = useSelector(state => state.PetmeOutReducer);
  const { petDetails } = route?.params;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const [showPostModal, setShowPostModal] = useState(false)
  const [postContent, setPostContent] = useState('')
  const [imageUri, setImageUri] = useState();
  const [showImageModal, setShowImageModal] = useState(false)
  const [imagePost, setPostImage] = useState(null)
  const videoRefs = useRef([]);

  const [base64String, setBase64String] = useState(null);
  console.log(imagePost, 'imagePostimagePostimagePost')
  console.log(POSTS_BY_PETID, 'POSTS_BY_PETIDPOSTS_BY_PETID')
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

  console.log(POSTS_BY_PETID, 'POSTS_BY_PETIDPOSTS_BY_PETIDPOSTS_BY_PETID')
  useEffect(() => {
    setLoader(true);
    dispatch(allPetsPostListing(LOGIN_DATA?.email, navigation));
    setTimeout(() => setLoader(false), 2000);
  }, [dispatch, LOGIN_DATA?.email, navigation]);

  useEffect(() => {
    setLoader(true);
    dispatch(petsPostListingbyID(petDetails?.pet_id, navigation));
    setTimeout(() => setLoader(false), 2000);
  }, [dispatch, petDetails?.pet_id, navigation]);


  const openImageModal = (image) => {
    setPostImage(image?.post_img)
    setShowImageModal(true)
  }
  const DeletePost = (id) => {
    setLoader(true);
    dispatch(deletePost(id, petDetails?.pet_id, navigation));
    setTimeout(() => setLoader(false), 2000);
  }
  const openModal = (id) => {
    setShowPostModal(true)
  }
  const makePost = () => {
    setLoader(true);
    dispatch(createPost(petDetails?.pet_id, petDetails?.pet_name, petDetails?.cat_name, LOGIN_DATA?.email, postContent, base64String, navigation));
    setShowPostModal(false)
    setPostContent('')
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }
  const reversedData = POSTS_BY_PETID ? [...POSTS_BY_PETID].reverse() : null;

  return (
    <View style={[styles.container, { backgroundColor: POSTS_BY_PETID == null ? '#fff' : null }]}>
      <Loader flag={loader} />
      {
        POSTS_BY_PETID == null ?
          <>
            <View style={{ marginTop: 100 }}>
              <LottieView
                source={require("../Assets/lottie/notFound.json")}
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: 'center',

                }}
                autoPlay loop
              />
            </View>
          </>
          :

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ width: '100%', alignSelf: 'center', backgroundColor: '#fff', paddingVertical: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5 }}>
                <Text style={{ fontSize: 17, color: 'gray', fontFamily: 'Poppins-SemiBold' }}>Create Post</Text>
                {/* <Icon name='dots-three-horizontal' size={20} color="gray" /> */}
              </View>
              <View style={styles.part}></View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Profile', { petDetails: petDetails }) }}
                >
                  <Image
                    source={{
                      uri: petDetails?.image_path,
                    }}
                    style={styles.profileImg}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={openModal} >
                  <View style={styles.input1}>
                    <Text style={{ fontFamily: 'Poppins-Regular', marginTop: 20, marginLeft: 5 }}>Write Something Here..</Text>
                  </View>

                </TouchableOpacity>
              </View>
              <View style={styles.part}></View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={openModal} style={{ flexDirection: 'row', backgroundColor: '#e5e5e5', width: 120, height: 35, paddingTop: 5, padding: 10, borderRadius: 5, marginLeft: 3 }}>
                  <Image
                    source={require('../Assets/addPhoto.png')}
                    style={{ width: 20, height: 20, marginTop: 3 }}
                  />
                  <Text style={{ marginTop: 4, marginLeft: 2, fontSize: 11, color: '#000' }}>Photo/Video</Text>
                </TouchableOpacity>
                {/* <View style={{ flexDirection: 'row', backgroundColor: '#e5e5e5', width: 105, height: 35, paddingTop: 5, padding: 5, borderRadius: 5, marginHorizontal: 4 }}>
                  <Image
                    source={require('../Assets/boy.png')}
                    style={{ width: 20, height: 20, marginTop: 3 }}
                  />
                  <Text style={{ marginTop: 4, marginLeft: 2, fontSize: 11, color: '#000' }}>Tag Friend</Text>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#e5e5e5', width: 120, height: 35, paddingTop: 5, padding: 5, borderRadius: 5 }}>
                  <Image
                    source={require('../Assets/smily.png')}
                    style={{ width: 20, height: 20, marginTop: 3 }}
                  />
                  <Text style={{ marginTop: 4, marginLeft: 5, fontSize: 11, color: '#000' }}>Feeling/Activity</Text>
                </View> */}
              </View>
            </View>
            {reversedData?.map((data, index) => {
              const maxImagesToShow = 3;
              const extraImagesCount = data?.post_img?.length - maxImagesToShow;
              return (
                <View key={index} style={styles.postContainer}>
                  <View style={styles.header}>

                    <View style={styles.headerLeft}>
                      <Image source={{ uri: Globals?.categoriesImagePath + data.pet_image }} style={styles.profileImage} />
                      <View>
                        <Text style={styles.petName}>{data.pet_name} - {data?.cat_name}</Text>
                        <Text style={[styles.commentsText, { marginLeft: 7 }]}>{data.Pet_City}</Text>

                      </View>
                    </View>
                    <Menu>
                      <MenuTrigger>
                        <Feather name="more-vertical" style={styles.menuIcon} />
                      </MenuTrigger>
                      <MenuOptions>
                        {/* <MenuOption onSelect={() => alert(`Save`)} text='Save' /> */}
                        <MenuOption onSelect={() => DeletePost(data?.post_id)} >
                          <Text style={{ color: 'red' }}>Delete</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>

                  </View>

                  <View >
               


                    <View style={styles.containerI}>
                        {
                            data.post_img[0]?.post_medias?.endsWith('.mp4') ?
                                <View>
                                    <View
                                        style={{
                                            width: '97%',
                                            height: '100%',
                                            overflow: 'hidden', // Ensure the border radius is applied
                                            borderRadius: 15, // Apply border radius to the container
                                            backgroundColor: 'red',
                                        }}
                                    >
                                        <Video
                                            ref={ref => (videoRefs.current[0] = ref)}
                                            source={{ uri: Globals?.categoriesImagePath + data.post_img[0]?.post_medias }}
                                            style={data?.post_img?.length == 1 ? styles.leftImage1 : styles.leftImage}
                                            controls={true}
                                            resizeMode="cover"
                                            repeat={true}
                                        />
                                    </View>
                                </View>
                                :

                                <Image source={{ uri: Globals?.categoriesImagePath + data.post_img[0]?.post_medias }} style={data?.post_img?.length == 1 ? styles.leftImage1 : styles.leftImage} />
                        }
                        {/* Left Half - First Image */}


                        {/* Right Half - Second and Third Images */}
                        <View style={styles.rightColumn}>
                            {
                                data.post_img[1]?.post_medias?.endsWith('.mp4') ?
                                    // <TouchableWithoutFeedback>
                                    <View
                                        style={{
                                            width: '100%',
                                            height: 90,
                                            overflow: 'hidden', // Ensure the border radius is applied
                                            borderRadius: 15, // Apply border radius to the container
                                            backgroundColor: 'red',
                                        }}
                                    >
                                        <Video
                                           ref={ref => (videoRefs.current[1] = ref)}
                                            source={{ uri: Globals?.categoriesImagePath + data.post_img[1]?.post_medias }}
                                            style={styles.rightImage}
                                            controls={true}
                                            resizeMode="cover"
                                            repeat={true}
                                        />
                                    </View>
                                    // </TouchableWithoutFeedback>
                                    :

                                    <Image source={{ uri: Globals?.categoriesImagePath + data.post_img[1]?.post_medias }} style={styles.rightImage} />}



                            <View style={styles.overlayContainer}>
                                {
                                    data.post_img[2]?.post_medias?.endsWith('.mp4') ?
                                        <TouchableWithoutFeedback>
                                            <View
                                                style={{
                                                    width: '100%',
                                                    height: 90,
                                                    overflow: 'hidden', // Ensure the border radius is applied
                                                    borderRadius: 15, // Apply border radius to the container
                                                    backgroundColor: 'red',
                                                }}
                                            >
                                                <Video
                                                    ref={ref => (videoRefs.current[2] = ref)}
                                                    source={{ uri: Globals?.categoriesImagePath + data.post_img[2]?.post_medias }}
                                                    style={styles.rightImage}
                                                    controls={true}
                                                    resizeMode="cover"
                                                    repeat={true}
                                                />
                                            </View>
                                        </TouchableWithoutFeedback>
                                        :

                                        <Image source={{ uri: Globals?.categoriesImagePath + data.post_img[2]?.post_medias }} style={styles.rightImage} />}


                                {extraImagesCount > 0 && (
                                    <TouchableOpacity style={styles.overlay} onPress={() => openImageModal(item)}>
                                        <Text style={styles.overlayText}>+{extraImagesCount}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                  </View>
                  {/* <View style={styles.imageContainer}>
                    <Image source={{ uri: Globals?.categoriesImagePath + data.post_img }} resizeMode='contain' style={styles.feedImg} />
                  </View> */}
                  <View style={styles.actions}>
                    <View style={styles.actionLeft}>
                      <TouchableOpacity>
                        <AntDesign name='hearto' style={styles.actionIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Ionic name="chatbubble-outline" style={styles.actionIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Feather name="navigation" style={styles.actionIcon} />
                      </TouchableOpacity>
                    </View>
                    <Feather name="bookmark" style={styles.actionIcon} />
                  </View>
                  <View style={styles.likesContainer}>
                    <Text style={styles.likesText}>{data.likes} others</Text>
                    <Text style={styles.commentsText}>View all comments</Text>
                    <View style={styles.commentInputContainer}>
                      <View style={styles.commentInputLeft}>
                        <Image source={{ uri: data.pet_image }} style={styles.commentProfileImage} />
                        <TextInput placeholder="Add a comment" placeholderTextColor={'#000'} style={styles.commentInput} />
                      </View>
                      <View style={styles.commentEmojis}>
                        <Entypo name="emoji-happy" style={[styles.emoji, { color: 'lightgreen' }]} />
                        <Entypo name="emoji-neutral" style={[styles.emoji, { color: 'pink' }]} />
                        <Entypo name="emoji-sad" style={[styles.emoji, { color: 'red' }]} />
                      </View>
                    </View>
                  </View>
                </View>
              )
            }
            )}
          </ScrollView>
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
      <Modal
        //  backdropColor={'transparent'}
        backdropOpacity={0.5}
        animationType="slide"
        transparent={true}
        visible={showImageModal}
        onRequestClose={() => {
          setShowImageModal(false)

        }}
      >
        <View style={styles.modalWrapperI}>
          <View style={styles.modalWrappI}>
            <TouchableOpacity onPress={() => setShowImageModal(false)} style={{ position: 'absolute', padding: 10, right: 2, zIndex: 1 }}>
              <Icon name='cross' size={25} color="white" />
            </TouchableOpacity>
            {/* <Image
                            source={{
                                uri: Globals?.categoriesImagePath + imagePost,
                            }}
                            style={styles.feedImgFull}
                        /> */}
            <Carousel
              loop
              style={{ marginTop: hp(15), height: hp(60) }}
              width={screenWidth}
              height={screenWidth / 2}
              autoPlay={true}
              data={imagePost}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={({ index, item }) => (
                <View
                  style={{
                    // flex: 1,
                    // borderWidth: 1,
                    justifyContent: 'center',

                  }}
                >
                  {
                    item?.post_medias?.endsWith('.mp4') ?
                      <TouchableWithoutFeedback>
                        <View
                          style={{
                            width: '100%',
                            height: hp(50),
                            overflow: 'hidden', // Ensure the border radius is applied
                            borderRadius: 15, // Apply border radius to the container
                            backgroundColor: 'red',
                            marginTop: hp(21)
                          }}
                        >
                          <Video
                            source={{ uri: Globals?.categoriesImagePath + item.post_medias }}
                            style={styles.feedVideo}
                            controls={true}
                            resizeMode="cover"
                            paused={false} // Set this to true if you want the video to start playing only when the carousel item is in focus
                            repeat={true}
                          />
                        </View>
                      </TouchableWithoutFeedback>
                      :

                      <Image
                        source={{
                          uri: Globals?.categoriesImagePath + item.post_medias,
                        }}
                        style={styles.feedImgFull}
                      />
                  }
                </View>
              )}
            />
          </View>

        </View>
      </Modal>
    </View>
  );
};

export default ProfilePosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postContainer: {
    paddingBottom: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.1,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  petName: {
    paddingLeft: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  menuIcon: {
    fontSize: 20,
    color: '#000',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menu: {
    position: 'absolute',
    right: 30,
    bottom: 300,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    elevation: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 16,
  },
  imageContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedImg: {
    width: '100%',
    height: 400,
    alignSelf: 'center',
    marginTop: 10,
    resizeMode: 'cover',
    borderRadius: 1,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    paddingRight: 10,
    fontSize: 20,
    color: 'black',
  },
  likesContainer: {
    paddingHorizontal: 15,
  },
  likesText: {
    color: '#000',
  },
  commentsText: {
    opacity: 0.4,
    paddingVertical: 2,
    color: '#000',
  },
  commentInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentInputLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentProfileImage: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: 'orange',
    marginRight: 10,
  },
  commentInput: {
    opacity: 0.5,
  },
  commentEmojis: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 15,
    marginRight: 10,
  },
  profileImg: {
    width: 70,
    borderRadius: 80,
    height: 70,
    resizeMode: 'contain',
    // marginTop: 30,
    // alignSelf: 'center',
    marginLeft: 10,

  },
  part: {
    borderWidth: 0.5,
    borderColor: 'lightgray',
    marginVertical: 15
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
  containerI: {
    flexDirection: 'row',
    width: '100%',
    height: 200, // Adjust height as needed
    padding: 5,
  },
  leftImage: {
    width: screenWidth / 2,
    height: '100%',
    borderRadius: 8,
    marginRight: 5,
    resizeMode: 'contain'
  },
  leftImage1: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    marginRight: 5,
    resizeMode: 'contain'
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rightImage: {
    width: screenWidth / 2 - 15, // Adjust width as needed
    height: 90, // Adjust height as needed
    marginBottom: 5,
    resizeMode: 'cover',
    borderRadius: 8
  },
  overlayContainer: {
    position: 'relative',
    width: '100%',
    height: '48%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  overlayText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalWrappI: {
    height: hp(99), width: wp(100), position: 'absolute',
    bottom: -18, backgroundColor: '#000',
    elevation: 50
  },
  modalWrapperI: {
    flex: 1,
    // backgroundColor: "#00000040",
    alignItems: "center",
    justifyContent: "flex-end",

  },
  feedImgFull: {
    width: '100%',
    height: hp(50),
    // marginTop: 30,
    alignSelf: 'center',
    // marginLeft: 10,
    marginTop: hp(21),
    resizeMode: 'cover',
    borderRadius: 15,
    // marginBottom: 10

  },
  feedVideo: {
    width: '100%',
    height: hp(50),
    // marginTop: 30,
    // alignSelf: 'center',
    // marginLeft: 10,
    // marginTop: hp(22),
    borderRadius: 15
},
});
