import React, { useState } from 'react'
import { Alert, Modal, View, Button, Text, Dimensions, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import * as Progress from 'react-native-progress';

const Manager = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={{ fontSize: 28, color: '#000', marginTop: 10, marginLeft: 20 }}>Client Manager Profile</Text>

                <View style={modalVisible ? styles.mainContainer1 : styles.mainContainer}>
                    <View style={{ textAlign: 'center' }}>
                        <Image
                            source={require("../Assets/profileBlank.png")}
                            style={{ width: '100%', height: 160 }}
                        />
                        <Text style={{ textAlign: 'center', color: '#000', marginBottom: 10 }}>Prince Eastsons</Text>
                        <View style={{ width: '70%', alignSelf: 'center' ,marginBottom:20}}>
                            <Button
                                title="+ Submit Your Request"
                                color="#8AB645"
                                onPress={() => setModalVisible(true)} />
                        </View>

                    </View>
                    <View style={{ backgroundColor: '#e1f7f7', padding: 10, borderRadius: 10 }}>
                        <Text style={styles.Subheading}>My Info:</Text>
                        <View style={{ height: 40, backgroundColor: '#fff', marginTop: 10, padding: 10 }}>
                            <Text style={styles.LIstText2}>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>Phone:</Text>  9865478934
                            </Text>
                        </View>
                        <View style={{ height: 40, marginTop: 10, padding: 10 }}>
                            <Text style={styles.LIstText2}>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>Email:</Text>  prince@eastsons.com
                            </Text>
                        </View>
                        <View style={styles.progress}>
                            <Progress.Bar progress={0.3} height={8} borderRadius={10} width={260} unfilledColor='pink' color='purple' borderColor='#fff' />

                        </View>

                        <View style={styles.partition}></View>
                        <Text style={styles.Subheading}>Office Info:</Text>

                        <View style={{ height: 40, backgroundColor: '#fff', marginTop: 10, padding: 10 }}>
                            <Text style={styles.LIstText2}>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>Name:</Text> TaxLeaf Miami Dade
                            </Text>
                        </View>
                        <View style={{ height: 40, marginTop: 10, padding: 10 }}>
                            <Text style={styles.LIstText2}>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>Email:</Text> miamidade@taxleaf.com
                            </Text>
                        </View>
                        <View style={{ height: 40, backgroundColor: '#fff', marginTop: 10, padding: 10 }}>
                            <Text style={styles.LIstText2}>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>Phone:</Text> 987654
                            </Text>
                        </View>
                        <View style={{ height: 40, marginTop: 10, padding: 10 }}>
                            <Text style={styles.LIstText2}>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>Office:</Text> 123 street ,miami florida 3312
                            </Text>
                        </View>
                        <View style={styles.progress}>
                            <Progress.Bar progress={0.5} height={8} borderRadius={10} width={260} unfilledColor='pink' color='purple' borderColor='#fff' />

                        </View>
                        <View style={styles.infoSec}>
                            <Text style={styles.infoSecText}>
                                Hi! My name is John Smith . I'm your manager at TAXLEAF. This is my contact information. You can reach me through the portal or direct at any time.
                                Thanks and have a great day!
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row',marginBottom:20 }}>
                            <Text style={styles.Subheading}>Submit Your Request</Text>
                            <Text style={{marginLeft:120}} 
                            onPress={() => setModalVisible(!modalVisible)}
                            >close</Text>
                        </View>
                        
                        <View style={styles.formContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder='Name'
                            // onChangeText={onChangeText}
                            // value={text}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Phone'

                            // onChangeText={onChangeText}
                            // value={text}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Email'

                            // onChangeText={onChangeText}
                            // value={text}
                            />
                            <TextInput
                                style={[styles.input,{Height:50}]}
                                placeholder='Messsage'
                                editable
                                multiline
                                numberOfLines={4}
                                maxLength={40}
                            // onChangeText={onChangeText}
                            // value={text}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Country'

                            // onChangeText={onChangeText}
                            // value={text}
                            />
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                            // onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Manager
const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: '#fff',
         padding: 20,
          opacity: 2,
           borderRadius: 10,
            marginLeft: 20, 
            marginTop: 20
    },
    mainContainer1:{
        backgroundColor: '#fff',
         padding: 20,
          opacity: 0.2,
           borderRadius: 10,
            marginLeft: 20, 
            marginTop: 20
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        width: 240,
        backgroundColor: '#fff'
    },
    formContainer: {
        backgroundColor: '#000',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    head: {
        fontSize: 14.5,
        color: '#000'
    },
    headNum: {
        backgroundColor: 'skyblue',
        borderRadius: 30,
        width: 25,
        height: 25,
        marginTop: 5

    },
    headNum1: {
        backgroundColor: 'pink',
        borderRadius: 30,
        width: 25,
        height: 25,
        marginTop: 5

    }, headNum2: {
        backgroundColor: 'yellow',
        borderRadius: 30,
        width: 25,
        height: 25,
        marginTop: 5

    },
    textNum: {
        // justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        marginTop: 3
    },
    LIstText: {
        marginLeft: 5,
        fontSize: 13,
        fontFamily: "Poppins-SemiBold",
        color: "black",
    },
    LIstText2: {
        fontSize: 14,
        fontFamily: "Poppins-BoldItalic",
        color: "black",
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "300",
        marginBottom: 20,
        color: "#000",
    },
    header: {
        backgroundColor: "purple",
        padding: 10,
        color: "#000",
    },
    headerText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000",
    },
    Subheading: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600'
    },
    partition: {
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 30,
        marginBottom: 30
    },
    infoSec: {
        backgroundColor: '#8ab645',
        borderRadius: 10,
        padding: 10,
        height: 190,
        width: '80%',
        alignSelf: 'center',
        marginTop: 30
    },
    infoSecText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Italic'
    },
    progress: {
        marginLeft: 11,
        marginTop:20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: 120,
        alignSelf: 'center'
    },
    buttonOpen: {
        backgroundColor: '#8AB645',
    },
    buttonClose: {
        backgroundColor: '#8AB645',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

})