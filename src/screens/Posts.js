import { StyleSheet, Text, View, Image, TextInput, ScrollView, FlatList, TouchableOpacity, Button, Share, Dimensions,RefreshControl } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Color } from '../Style';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Loader } from '../Component/Loader';
import { allPetsPostListing, createPost, likePost, petDetailsbyId, petListing, petsPostListingbyID, postComment, postCommentList, postShare } from '../Redux/Actions/Petmeout';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from "react-native-modal";
import DocumentPicker from 'react-native-document-picker'
import { launchImageLibrary } from 'react-native-image-picker';
import { Globals } from '../Config';
import CreateProfile from './OwnerProfile';
import LikeAnimation from './LikeAnimation ';
import LottieView from 'lottie-react-native';
import Video, { VideoRef } from 'react-native-video';
import ImagePicker from 'react-native-image-crop-picker';
import Carousel from 'react-native-reanimated-carousel';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const screenWidth = Dimensions.get('window').width;

const Posts = ({ route }) => {

    // console.log(route.params, 'routeeee')
    const [showPostModal, setShowPostModal] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)
    const [imagePost, setPostImage] = useState(null)
    const [base64File, setBase64File] = useState([]);
    const [base64Image, setBase64Image] = useState()
    const [imageUri, setImageUri] = useState();
    const { LOGIN_DATA } = useSelector(state => state.PetmeOutReducer);
    const { PET_LIST } = useSelector(state => state.PetmeOutReducer);
    const { ALL_POSTS } = useSelector(state => state.PetmeOutReducer);
    const { POSTS_BY_PETID } = useSelector(state => state.PetmeOutReducer);
    const { POSTS_COMMENTS } = useSelector(state => state.PetmeOutReducer);
    const { LOGIN_PET } = useSelector(state => state.PetmeOutReducer);
    const [postLikesState, setPostLikesState] = useState({});
    const initialized = useRef(false); // Ref to track initialization
    // console.log(postLikesState, 'postLikesStatepostLikesState')
    // console.log(base64File, 'base64Filebase64File')
    const [allPosts, setAllPosts] = useState([])
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [postContent, setPostContent] = useState('')
    const [base64String, setBase64String] = useState(null);
    const [msg, setMsg] = useState('')
    const [isLike, setIsLike] = useState(false)
    const [postID, setPostID] = useState(null)
    const { USER_DATA } = useSelector(state => state.PetmeOutReducer);
    const [loader, setLoader] = useState(false);
    const [inputValues, setInputValues] = useState({});
    const [isModalVisible, setModalVisible] = useState(false);
    const [postItem, setPostItem] = useState([]);
    const [files, setFiles] = useState([])
    const [playingIndex, setPlayingIndex] = useState(null);

    const petDetails = route?.params?.petDetails ? route?.params?.petDetails : PET_LIST ? PET_LIST[0] : null

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(allPetsPostListing(null, navigation));
        setTimeout(() => {
            setRefreshing(false);
        }, 2000); // Time for refresh
    };
    useEffect(() => {
        if (LOGIN_DATA?.No_of_pet == 0)
            navigation.navigate('HomeScreen')
    }, [])



    // Refs for video players
    const videoRefs = useRef([]);

    // console.log(petDetails, 'petDetailspetDetailspetDetails')
    console.log(files, 'filesfilesfilesfiles')
    const toggleModal = (item) => {
        setPostItem(item)
        setModalVisible(!isModalVisible);
    };
    const handleTextChange = (text, id) => {
        setInputValues(prevState => ({
            ...prevState,
            [id]: text,
        }));
    };
    // console.log(inputValues, 'inputValuesinputValuesinputValues')

    const openModal = (id) => {
        setShowPostModal(true)
    }
    const postLikes = (item, like) => {
        setLoader(true);

        // Update the like status for the specific post ID
        setPostLikesState(prevState => {
            const updatedLikes = { ...prevState };
            const currentLikeStatus = updatedLikes[item.post_id]?.isLike;

            // Toggle like status based on the current state
            updatedLikes[item.post_id] = {
                isLike: currentLikeStatus !== true,
                count: currentLikeStatus ? updatedLikes[item.post_id]?.count - 1 : updatedLikes[item.post_id]?.count + 1
            };

            return updatedLikes;
        });

        // Dispatch action to update the backend
        dispatch(likePost(LOGIN_PET?.pet_id, item.post_id, like, item.owner, item.pet_name, navigation));

        setTimeout(() => {
            setLoader(false);
        }, 2000);
    };


    const pickImageFromGallery = () => {
        let options = {
            mediaType: 'photo',
            quality: 5,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const uri = response.assets[0].uri;
                console.log(uri, 'uriiiiiiiiii')
                setImageUri(uri);
                convertToBase64(uri)
            }
        });
    };
    const selectImagesAndVideos = (type) => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'any', // allows both images and videos to be selected
            // cropping: 'Photo'
        }).then(files => {
            console.log(files, 'filesfilesfilesfiles');
            setFiles(files)
            // Handle the selected images and videos here
            // Example: Display them in your app, upload to server, etc.
        }).catch(error => {
            console.error(error);
        });
    };
    const convertFilesToBase64 = async (files) => {

        const base64Array = [];

        for (const file of files) {
            try {
                console.log('Converting file:', file.path);
                // const base64 = await convertToBase64(file.path);
                if (file.path) {
                    base64Array.push(file.path);
                    // console.log('Base64 string added:', base64);
                } else {
                    console.log('Failed to convert file to Base64:', file.path);
                }
            } catch (error) {
                console.log('Error in converting file to Base64:', error);
            }
        }
        console.log(base64Array, 'base64Arraybase64Array')


        return base64Array;
    };
    console.log(base64File, 'Final Base64 Array:');
    const convertToBase64 = async (uri) => {
        return new Promise((resolve, reject) => {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", uri, true);
                xhr.responseType = "blob";
                xhr.onload = function () {
                    const reader = new FileReader();
                    reader.onloadend = function () {
                        resolve(reader.result.split(',')[1]);
                    };
                    reader.onerror = function (error) {
                        reject("Error converting file to base64: " + error);
                    };
                    reader.readAsDataURL(xhr.response);
                };
                xhr.onerror = function () {
                    reject("Error loading file");
                };
                xhr.send();
            } catch (error) {
                reject("Error converting file to base64: " + error);
            }
        });
    };

    useEffect(() => {
        convertFilesToBase64(files).then((base64Array) => {
            // console.log('Base64 Array:', base64Array);
            setBase64File(base64Array)
            // Do something with the base64Array, like updating state
        });
    }, [files])

    const openImageModal = (image) => {
        setPostImage(image)
        setShowImageModal(true)
    }

    useEffect(() => {

        // if (initialized.current) {
        // Initialize postLikesState based on LOGIN_PET?.pet_id and Pet_ids_to_like_post
        const initialLikesState = {};
        ALL_POSTS.forEach(post => {
            const { post_id, Pet_ids_to_like_post } = post;
            const isLiked = Pet_ids_to_like_post.some(pet => pet.pet_id === LOGIN_PET?.pet_id);
            initialLikesState[post_id] = {
                isLike: isLiked,
                count: isLiked ? (post.likes ? parseInt(post.likes, 10) : 0) : 0
            };
        });
        setPostLikesState(initialLikesState);
        // }
    }, [ALL_POSTS, LOGIN_PET?.pet_id]);

    useEffect(() => {

        setPostLikesState({});
    }, [LOGIN_PET?.pet_id]);
    useEffect(() => {
        setLoader(true);
        dispatch(petListing(LOGIN_DATA?.email, navigation));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);

    useEffect(() => {
        setLoader(true);
        dispatch(allPetsPostListing(LOGIN_DATA?.email, navigation));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);
    useEffect(() => {
        setLoader(true);
        dispatch(petsPostListingbyID(petDetails?.pet_id, navigation));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [petDetails]);
    useEffect(() => {
        setLoader(true);
        dispatch(postCommentList(postItem?.post_id, navigation));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [postItem?.post_id]);
    const makePost = () => {
        setLoader(true);
        dispatch(createPost(petDetails?.pet_id, petDetails?.pet_name, petDetails?.cat_name, LOGIN_DATA?.email, postContent, base64File, navigation));
        setShowPostModal(false)
        setPostContent('')
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }
    const submitComment = (item) => {
        // console.log(item,'iiiiiittttteeeeeemmmmmm')
        // console.log(inputValues[item?.post_id],'9iriirirui')
        const commentMsg = inputValues[postItem?.post_id];
        setLoader(true);
        dispatch(postComment(postItem?.post_id, LOGIN_PET?.pet_name, LOGIN_PET?.image_path, postItem?.owner, commentMsg, navigation));
        dispatch(postCommentList(postItem?.post_id, navigation));
        dispatch(allPetsPostListing(LOGIN_DATA?.email, navigation));
        setShowPostModal(false)
        setPostContent('')
        setInputValues({})
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }
    useEffect(() => {
        const postData = [...ALL_POSTS];
        const reversePost = postData.reverse()
        setAllPosts(reversePost);
    }, [ALL_POSTS]);
    

    const onShare = async(post) => {
        try {
                const result = await Share.share({
                    title: 'Check out these images!',
                    message: 'Sharing some images with you',
                    urls:  post.post_img, // Array of local image URIs
                    // message: `Check out this post from ${post.pet_name}: ${Globals?.categoriesImagePath +  post.post_img[0]?.post_medias}`,

                });
           
            dispatch(postShare(LOGIN_PET?.pet_id, post?.post_id, post?.msg, post?.owner, navigation));

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // Shared with activity type of result.activityType
                } else {
                    // Shared
                }
            } else if (result.action === Share.dismissedAction) {
                // Dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const commentData = POSTS_COMMENTS ? [...POSTS_COMMENTS] : null
    const reversePostComment = commentData?.reverse()
    const petIdArray = ['144', '145', '141']
    const gotoProfile = (id) => {
        setLoader(true);
        dispatch(petDetailsbyId(id, navigation));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    };
    const renderItem = (item, index) => {
        const likeStatus = postLikesState[item.post_id]?.isLike;
        const likeCount = postLikesState[item.post_id]?.count || item.likes;

        const maxImagesToShow = 3;
        const extraImagesCount = item?.post_img?.length - maxImagesToShow;
        console.log(item?.post_img?.length, 'extraImagesCountextraImagesCount')
        return (
            <View style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', marginTop: 5, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => { gotoProfile(item?.petid) }}
                        >

                            <Image
                                source={{
                                    uri: Globals?.categoriesImagePath + item.pet_image,
                                }}
                                style={styles.profileImg1}
                            />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, color: 'gray', fontFamily: 'Poppins-SemiBold' }}>{item?.pet_name} - {item?.cat_name}</Text>
                            <Text style={{ fontSize: 12, color: 'gray', fontFamily: 'Poppins-Regular' }}>{item?.Pet_City} </Text>

                        </View>
                    </View>

                    <Icon name='dots-three-horizontal' size={20} color="gray" style={{ marginRight: 10 }} />
                </View>
                <Text style={styles.postText}>{item?.msg}</Text>
                <View >
                    <View style={styles.containerI}>
                        {
                            item.post_img[0]?.post_medias?.endsWith('.mp4') ?
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
                                            source={{ uri: Globals?.categoriesImagePath + item.post_img[0]?.post_medias }}
                                            style={item?.post_img?.length == 1 ? styles.leftImage1 : styles.leftImage}
                                            controls={true}
                                            resizeMode="cover"
                                            repeat={true}
                                            paused={false}
                                        />
                                    </View>
                                </View>
                                :

                                <Image source={{ uri: Globals?.categoriesImagePath + item.post_img[0]?.post_medias }} style={item?.post_img?.length == 1 ? styles.leftImage1 : styles.leftImage} />
                        }
                        {/* Left Half - First Image */}


                        {/* Right Half - Second and Third Images */}
                        <View style={styles.rightColumn}>
                            {
                                item.post_img[1]?.post_medias?.endsWith('.mp4') ?
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
                                            source={{ uri: Globals?.categoriesImagePath + item.post_img[1]?.post_medias }}
                                            style={styles.rightImage}
                                            controls={true}
                                            resizeMode="cover"
                                            repeat={true}
                                            paused={false}
                                        />
                                    </View>
                                    // </TouchableWithoutFeedback>
                                    :

                                    <Image source={{ uri: Globals?.categoriesImagePath + item.post_img[1]?.post_medias }} style={styles.rightImage} />}



                            <View style={styles.overlayContainer}>
                                {
                                    item.post_img[2]?.post_medias?.endsWith('.mp4') ?
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
                                                    source={{ uri: Globals?.categoriesImagePath + item.post_img[2]?.post_medias }}
                                                    style={styles.rightImage}
                                                    controls={true}
                                                    resizeMode="cover"
                                                    repeat={true}
                                                    paused={false}
                                                />
                                            </View>
                                        </TouchableWithoutFeedback>
                                        :

                                        <Image source={{ uri: Globals?.categoriesImagePath + item.post_img[2]?.post_medias }} style={styles.rightImage} />}


                                {extraImagesCount > 0 && (
                                    <TouchableOpacity style={styles.overlay} onPress={() => openImageModal(item)}>
                                        <Text style={styles.overlayText}>+{extraImagesCount}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                    {/* {
                        item?.post_img.map((item1) =>
                            <Image
                                source={{
                                    uri: Globals?.categoriesImagePath + item1?.post_medias,
                                }}
                                style={styles.feedImg}
                            />

                        )
                    } */}
                    {/* <Image
                        source={{
                            uri: Globals?.categoriesImagePath + item.post_img[0]?.post_medias,
                        }}
                        style={styles.feedImg}
                    /> */}

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', marginTop: 2 }}>
                            {/* <TouchableOpacity onPress={() => likePost(item?.post_id)} style={{ marginLeft: 5, }}>
                            {
                                isLike == true ?
                                    <Image
                                        source={require('../Assets/img/icons/like.png')}
                                        style={{ width: 18, height: 18 }}
                                    />
                                    :
                                    <Image
                                        source={require('../Assets/img/icons/likeBlank.png')}
                                        style={{ width: 18, height: 18 }}
                                    />
                            }

                        </TouchableOpacity> */}
                            <View style={{ marginLeft: 5, marginTop: 5 }}>
                                <Image
                                    source={require('../Assets/img/icons/like.png')}
                                    style={{ width: 15, height: 15 }}
                                />
                            </View>


                            <Text style={{ marginTop: 6, marginLeft: 2, fontSize: 11, color: 'gray', fontFamily: 'Poppins-Regular' }}>{item?.likes} Likes</Text>
                        </View>
                        <View>
                            <Text style={{ marginLeft: 10, fontSize: 12, marginTop: 8, color: 'gray', fontFamily: 'Poppins-Regular' }}>{item?.total_comments} Comment</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                        <Text style={{ fontSize: 12, marginLeft: 4, marginTop: 5, color: 'gray', fontFamily: 'Poppins-Regular' }}>{item?.total_no_of_share} Share</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 7 }}>
                        <TouchableOpacity
                            onPress={() => postLikes(item, likeStatus ? 0 : 1)}
                            style={{ flexDirection: 'row' }}
                        >
                            {
                                likeStatus ?
                                    <Image
                                        source={require('../Assets/img/icons/like.png')}
                                        style={{ width: 25, height: 25 }}
                                    />
                                    :
                                    <Image
                                        source={require('../Assets/img/icons/like.png')}
                                        style={{ width: 21, height: 21, marginTop: 1 }}
                                    />
                            }

                            <Text style={{ fontSize: 14, color: 'gray', fontFamily: 'Poppins-Regular', marginLeft: 2, marginTop: 5 }}>
                                Like
                            </Text>
                        </TouchableOpacity>
                        {/* <Text style={{ marginTop: 6, marginLeft: 2, fontSize: 11, color: 'gray', fontFamily: 'Poppins-Regular' }}>
                            {likeCount} Likes
                        </Text> */}
                    </View>
                    <TouchableOpacity onPress={() => toggleModal(item)} style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../Assets/img/icons/comment.png')}
                            style={{ width: 25, height: 25 }}
                        />
                        <Text style={{ fontSize: 14, color: 'gray', fontFamily: 'Poppins-Regular', marginTop: 3 }}>Comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', marginRight: 8 }} onPress={() => onShare(item)}>
                        <Image
                            source={require('../Assets/img/icons/share.png')}
                            style={{ width: 15, height: 15, marginTop: 2 }}
                        />
                        <Text style={{ fontSize: 14, color: 'gray', fontFamily: 'Poppins-Regular', marginLeft: 5 }}>Share</Text>
                    </TouchableOpacity>

                </View>


            </View>
        )
    }
    return (
        <View>
            <Loader flag={loader} />
            <ScrollView showsVerticalScrollIndicator={false}  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }>
                <View style={{ backgroundColor: '#fff', padding: 10, width: '100%', alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                        <TouchableOpacity onPress={openModal}>
                            <View style={styles.input1}>
                                <Text style={{ fontFamily: 'Poppins-Regular', marginTop: 20, marginLeft: 5 }}>Write Something Here..</Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                    <View style={styles.part}></View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={openModal} style={{ flexDirection: 'row', backgroundColor: '#e5e5e5', width: 100, height: 35, paddingTop: 5, padding: 5, borderRadius: 5 }}>
                            <Image
                                source={require('../Assets/addPhoto.png')}
                                style={{ width: 20, height: 20, marginTop: 3 }}
                            />
                            <Text style={{ marginTop: 4, marginLeft: 2, fontSize: 11, color: '#000' }}>Photo/Video</Text>
                        </TouchableOpacity>

                        {/* <View style={{ flexDirection: 'row', backgroundColor: '#e5e5e5', width: 95, height: 35, paddingTop: 5, padding: 5, borderRadius: 5, marginHorizontal: 4 }}>
                            <Image
                                source={require('../Assets/boy.png')}
                                style={{ width: 20, height: 20, marginTop: 3 }}
                            />
                            <Text style={{ marginTop: 4, marginLeft: 2, fontSize: 11, color: '#000' }}>Tag Friend</Text>
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#e5e5e5', width: 110, height: 35, paddingTop: 5, padding: 5, borderRadius: 5 }}>
                            <Image
                                source={require('../Assets/smily.png')}
                                style={{ width: 20, height: 20, marginTop: 3 }}
                            />
                            <Text style={{ marginTop: 4, marginLeft: 5, fontSize: 11, color: '#000' }}>Feeling/Activity</Text>
                        </View> */}
                    </View>
                </View>

                <FlatList
                    // contentContainerStyle={{ paddingBottom: 200 }}
                    data={allPosts}

                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => (renderItem(item, index))}
                />


            </ScrollView>
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
                        <View style={[styles.content, { width: '100%' }]}>
                            <View style={{ backgroundColor: '#fff', padding: 10, width: '95%', alignSelf: 'center', marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 17, color: 'gray', fontFamily: 'Poppins-SemiBold' }}>Create Post</Text>
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
                                    <TouchableOpacity onPress={() => selectImagesAndVideos('Photo')}>
                                        <View style={{ flexDirection: 'row', backgroundColor: '#e5e5e5', width: 100, height: 35, paddingTop: 5, padding: 5, borderRadius: 5, marginRight: 10 }}>
                                            <Image
                                                source={require('../Assets/addPhoto.png')}
                                                style={{ width: 20, height: 20, marginTop: 3 }}
                                            />
                                            <Text style={{ marginTop: 4, marginLeft: 2, fontSize: 11, color: '#000', fontFamily: 'Poppins-Regular' }}>Photo/Video</Text>
                                        </View>

                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={() => selectImagesAndVideos('Video')}>
                                        <View style={{ flexDirection: 'row', backgroundColor: '#e5e5e5', width: 70, height: 35, paddingTop: 5, padding: 5, borderRadius: 5 }}>
                                            <Image
                                                source={require('../Assets/img/icons/addVideo.png')}
                                                style={{ width: 20, height: 20, marginTop: 3 }}
                                            />
                                            <Text style={{ marginTop: 4, marginLeft: 2, fontSize: 11, color: '#000', fontFamily: 'Poppins-Regular' }}>Video</Text>
                                        </View>

                                    </TouchableOpacity> */}
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
                isVisible={isModalVisible}
                onSwipeComplete={toggleModal}
                // swipeDirection="down"
                style={styles.modal}
            >
                <View style={styles.modalWrapper2}>
                    <View style={styles.modalWrapp2}>
                        <TouchableOpacity onPress={() => toggleModal()} style={{ position: 'absolute', padding: 10, right: 2 }}>
                            <Icon name='cross' size={20} color="gray" />
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 16, marginTop: 10 }}>All Comments</Text>

                        <View style={{ maxHeight: '80%' }}>
                            <ScrollView contentContainerStyle={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
                                {
                                    POSTS_COMMENTS ?
                                        <View style={styles.content}>
                                            <FlatList
                                                // contentContainerStyle={{ height:hp(70) }}
                                                data={reversePostComment}
                                                keyExtractor={item => item.id}
                                                renderItem={({ item, index }) => (
                                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                                        <Image
                                                            source={{
                                                                uri: item?.pet_image
                                                            }}
                                                            style={styles.commentImg}
                                                        />
                                                        <View>
                                                            <View style={{ marginLeft: 10, backgroundColor: '#f1f2f6', borderRadius: 10, padding: 5, width: '90%' }}>
                                                                <Text style={{ fontSize: 13, color: '#000', fontFamily: 'Poppins-SemiBold' }}>{item?.pet_name}</Text>
                                                                <Text style={{ fontSize: 12, color: 'gray', fontFamily: 'Poppins-Regular' }}> {item.comment}</Text>

                                                            </View>
                                                            <Text style={{ fontSize: 12, color: 'gray', marginLeft: 20, fontFamily: 'Poppins-Regular' }}>0 Like</Text>

                                                        </View>


                                                    </View>
                                                )}
                                            />
                                        </View>
                                        :
                                        <LottieView
                                            source={require("../Assets/lottie/notFound.json")}
                                            style={{
                                                width: 150,
                                                height: 150,
                                                alignSelf: 'center',
                                                marginTop: 150

                                            }}
                                            autoPlay loop
                                        />
                                }
                            </ScrollView>

                        </View>



                        <View style={styles.comment}>
                            <TextInput
                                autoCompleteType="email"
                                keyboardType="email-address"
                                underlineColorAndroid="transparent"
                                textContentType="emailAddress"
                                placeholder="Write a Comment..."
                                value={inputValues[postItem?.post_id] || ''}
                                onChangeText={(text) => handleTextChange(text, postItem?.post_id)}
                                style={styles.input}
                                placeholderTextColor={'gray'}
                            />
                            {
                                Object.keys(inputValues).find(key => key === postItem?.post_id) && inputValues[postItem?.post_id] !== "" ?
                                    <TouchableOpacity onPress={() => { submitComment(postItem) }}>
                                        <Image
                                            source={require('../Assets/img/icons/send.png')}
                                            style={{ width: 18, height: 18, marginLeft: 50, marginTop: 10 }}
                                        />
                                    </TouchableOpacity>

                                    : null
                            }

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
                            // autoPlay={true}
                            data={imagePost?.post_img}
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
    )
}

export default Posts

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
        marginLeft: 5,
        resizeMode: 'contain'

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
        width: '50%',
        height: 200,
        // marginTop: 30,
        alignSelf: 'center',
        // marginLeft: 10,
        marginTop: 10,
        resizeMode: 'cover',
        borderRadius: 1,
        // marginBottom: 10

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

    postText: { fontSize: 13, marginTop: 10, fontFamily: 'Poppins-Regular', marginLeft: 10 },
    modalWrapp: {
        height: hp(48), width: wp(100), position: 'absolute',
        bottom: -10, backgroundColor: '#fff'
    },

    modalWrapp1: {
        height: hp(40), width: wp(95), position: 'absolute',
        bottom: 200, backgroundColor: '#fff',
        elevation: 50, borderRadius: 10
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
    containerI: {
        flexDirection: 'row',
        width: '100%',
        height: 200, // Adjust height as needed
        padding: 5
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
})