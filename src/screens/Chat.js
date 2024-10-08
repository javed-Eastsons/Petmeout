import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
    RefreshControl,
    Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { getChatMessages, sendChatMessage } from '../Redux/Actions/Petmeout';

const Chat = ({ route }) => {
    // const {petDetails} = route?.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { CHAT_DATA, LOGIN_PET, CHAT_LISTING } = useSelector(state => state.PetmeOutReducer);

    console.log(CHAT_DATA, 'CHAT_DATACHAT_DATA')
    console.log(CHAT_LISTING, 'CHAT_LISTINGCHAT_LISTING')

    const [messages, setMessages] = useState([]);
    //     [
    //     { id: '1', text: 'Hello!', sender: 'user' },
    //     { id: '2', text: 'Hi there!', sender: 'me' },
    //     { id: '3', text: 'How are you?', sender: 'user' },
    // ]

    const [message, setMessage] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    console.log(messages, 'meeeeeessssssss')
    // const sendMessage = () => {
    //     dispatch(sendChatMessage(CHAT_DATA?.pet_id, LOGIN_PET?.pet_id, message, navigation));
    //     if (message.trim()) {
    //         setMessages((prev) => [
    //             ...prev,
    //             { id: Date.now().toString(), msg: message, sender: 'me' },
    //         ]);
    //         setMessage('');
    //     }
    //     dispatch(getChatMessages(CHAT_DATA?.pet_id, LOGIN_PET?.pet_id, navigation));
    // };


    const sendMessage = () => {
        if (message.trim()) {
            // Send the message via the dispatch action
            dispatch(sendChatMessage(CHAT_DATA?.pet_id, LOGIN_PET?.pet_id, message, navigation));

            // Update the local state with the new message
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now().toString(), msg: message, sender: 'me' },
            ]);

            // Clear the input field
            setMessage('');
        }
    };

    const renderMessage = ({ item }) => {
        console.log(item, 'itemitemitem')
        const isUserMessage = item.sender === 'me';
        return (
            <View style={[styles.messageContainer, isUserMessage ? styles.myMessage : styles.userMessage]}>
                <Text style={isUserMessage ? styles.messageText : styles.messageTextUser}>{item.msg}</Text>
            </View>
        );
    };


    const onRefresh = () => {
        setRefreshing(true);
        dispatch(getChatMessages(CHAT_DATA?.pet_id, LOGIN_PET?.pet_id, navigation));
        setTimeout(() => {
            setRefreshing(false);
        }, 2000); // Time for refresh
    };
    const updatedChatData = CHAT_LISTING.map(item => {
        const sender = item.loggedIn_user_id === LOGIN_PET?.pet_id ? 'me' : 'user';
        return { ...item, sender };
    });

    console.log(updatedChatData, 'updatedChatDataupdatedChatData')
    useEffect(() => {
        dispatch(getChatMessages(CHAT_DATA?.pet_id, LOGIN_PET?.pet_id, navigation));

    }, [CHAT_DATA])

    // useEffect(() => {
    //     const updatedChatData = CHAT_LISTING.map(item => {
    //         const sender = item.loggedIn_user_id === item.chat_with_user_id ? 'them' : 'user';
    //         return { ...item, sender };
    //     });
    //     setMessages(updatedChatData)
    // }, [CHAT_LISTING])

    useEffect(() => {
        const updatedChatData = CHAT_LISTING.map(item => {
            const sender = item.loggedIn_user_id === LOGIN_PET?.pet_id ? 'me' : 'them';
            return { ...item, sender };
        });
        setMessages(updatedChatData);
    }, [CHAT_LISTING]);


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ marginRight: 10, marginTop: 15 }} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={25} color="#fff" />

                    </TouchableOpacity>
                    <Image
                        source={{ uri: CHAT_DATA?.image_path }}
                        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: 'contain', marginRight: 10 }}
                    />
                    <View>
                        <Text style={styles.headerTitle}>{CHAT_DATA?.pet_name}</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', color: '#fff' }}>Online</Text>

                    </View>

                </View>
                <TouchableOpacity >
                    <Ionicons name="call-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Messages Area */}
            <FlatList
                data={updatedChatData}
                showsVerticalScrollIndicator={false}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                style={styles.messageList}
                contentContainerStyle={{ paddingVertical: 10 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />

            {/* Message Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor="#888"
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Ionicons name="send" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    header: {
        height: 80,
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 10,


    },
    headerTitle: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Poppins-Bold'
    },
    messageList: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    messageContainer: {
        maxWidth: '75%',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 15,
        elevation: 2,
    },
    myMessage: {
        backgroundColor: '#4CAF50',
        alignSelf: 'flex-end',
        borderTopRightRadius: 0,
    },
    userMessage: {
        backgroundColor: '#e6e6e6',
        alignSelf: 'flex-start',
        borderTopLeftRadius: 0,
    },
    messageText: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Poppins-Regular'
    },
    messageTextUser: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'Poppins-Regular'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        elevation: 10,

    },
    input: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 25,
        fontSize: 16,
    },
    sendButton: {
        // backgroundColor: '#0084ff',
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 50,
        marginLeft: 10,
    },
});

export default Chat;
