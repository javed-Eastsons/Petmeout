import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Image,
    Dimensions,
    Text
} from 'react-native';
import { likePost } from '../Redux/Actions/Petmeout';
import { Loader } from '../Component/Loader';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const LikeAnimation = ({ data }) => {
    const [isLike, setIsLike] = useState(true);


    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch()
    const navigation = useNavigation();
    console.log(isLike, 'issssLIkeeee')
    console.log(data?.petid, 'daataaaa')
    const [animations, setAnimations] = useState([]);

    const triggerAnimation = () => {
        const newAnimation = {
            id: Math.random().toString(),
            translateX: new Animated.Value(1),
            translateY: new Animated.Value(0),
            opacity: new Animated.Value(1),
            scale: new Animated.Value(1),
        };

        setAnimations([...animations, newAnimation]);

        const randomX = Math.random() * width - width / 2;
        const randomY = -height / 2 - Math.random() * height / 2;

        Animated.parallel([
            Animated.timing(newAnimation.translateX, {
                toValue: randomX,
                duration: 1400,
                useNativeDriver: true,
            }),
            Animated.timing(newAnimation.translateY, {
                toValue: randomY,
                duration: 1400,
                useNativeDriver: true,
            }),
            Animated.timing(newAnimation.opacity, {
                toValue: 0,
                duration: 1400,
                useNativeDriver: true,
            }),
            Animated.timing(newAnimation.scale, {
                toValue: 2,
                duration: 1400,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setAnimations((prev) => prev.filter(anim => anim.id !== newAnimation.id));
        });


        setLoader(true);
       

        dispatch(likePost(data?.petid, data?.post_id, isLike == true ? 1 : 0, data?.owner,data?.pet_name, navigation));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    };

    

    return (
        <View style={styles.container}>
            <Loader flag={loader} />
            <TouchableOpacity onPress={triggerAnimation} style={{ flexDirection: 'row', width: 100, marginLeft: 70 }}>
                <Image
                    source={require('../Assets/img/icons/like.png')}
                    style={{ width: 25, height: 25 }}
                />
                <Text style={{ fontSize: 14, color: 'gray', fontFamily: 'Poppins-Regular', marginLeft: 2, marginTop: 5 }}>Like</Text>
            </TouchableOpacity>

            {animations.map((anim) => (
                <Animated.View
                    key={anim.id}
                    style={[
                        styles.thumb,
                        {
                            transform: [
                                // { translateX: anim.translateX },
                                { translateY: anim.translateY },
                                { scale: anim.scale },
                            ],
                            opacity: anim.opacity,
                        },
                    ]}
                >
                    <Image source={require('../Assets/img/icons/like.png')} style={styles.thumbImage} />
                </Animated.View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    likeButton: {
        padding: 10,
        backgroundColor: '#3b5998',
        borderRadius: 5,
    },
    likeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    thumb: {
        position: 'absolute',
        bottom: 50,
    },
    thumbImage: {
        width: 40,
        height: 40,
    },
});

export default LikeAnimation;
