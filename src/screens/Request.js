import React, { useState } from 'react'
import { SafeAreaView, View, Text, Button, Dimensions, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

const Request = () => {
    const [showwhat, setshowwhat] = useState("Experience");
    const [showwhat1, setshowwhat1] = useState("Message");
const bgImage = require("../Assets/img/py-bg.png")
    const showwhatfunc = (data) => {
        setshowwhat(data);
        console.log(data);
      
    };
    const showwhatfunc1 = (data) => {
        setshowwhat1(data);
        console.log(data);

    };
    return (
        <SafeAreaView>
            <View>
                <View style={styles.headerView}>
                    <Text style={styles.header}>Requests</Text>

                </View>
                <View style={{ width: '40%', alignSelf: 'flex-start', marginBottom: 20, marginLeft: 20 }}>
                    <Button
                        title="+ New Request"
                        color="#3B71CA"
                    // onPress={() => setModalVisible(true)}
                    />
                </View>
                <ImageBackground source={bgImage} style={styles.bgImg}>
                    <View style={styles.mainTab}>
                        {(() => {
                            if (showwhat1 == "Message") {
                                return (
                                    <View style={styles.moblieSec}>
                                        <TouchableOpacity
                                            style={[
                                                styles.emailtoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Message" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Message")}
                                        >
                                            <Text style={styles.ButtonText}>Message</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            disabled={true}
                                            style={[
                                                styles.mobiletoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Proposal" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Proposal")}
                                        >
                                            <Text style={styles.ButtonText}>Proposal</Text>
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: "column", justifyContent: 'space-between' }}>
                                            <TouchableOpacity
                                                disabled={true}

                                                style={[
                                                    styles.mobiletoch,
                                                    {
                                                        backgroundColor:
                                                            showwhat1 == "Signature" ? "#2F5597" : "lightgray", marginBottom: 10, marginLeft: 10
                                                    },
                                                ]}
                                                onPress={() => showwhatfunc1("Signature")}
                                            >
                                                <Text style={styles.ButtonText}>Signature Requests</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                disabled={true}

                                                style={[
                                                    styles.mobiletoch,
                                                    {
                                                        backgroundColor:
                                                            showwhat1 == "Reminders" ? "#2F5597" : "lightgray",
                                                    },
                                                ]}
                                                onPress={() => showwhatfunc1("Reminders")}
                                            >
                                                <Text style={styles.ButtonText}>Reminders</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                );
                            } else if (showwhat1 == "Proposal") {
                                return (
                                    <View style={styles.moblieSec}>

                                        <TouchableOpacity
                                            style={[
                                                styles.emailtoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Message" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Message")}
                                        >
                                            <Text style={styles.ButtonText}>Message</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.mobiletoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Proposal" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Proposal")}
                                        >
                                            <Text style={styles.ButtonText}>Proposal</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.mobiletoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Signature" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Signature")}
                                        >
                                            <Text style={styles.ButtonText}>Signature Requests</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.mobiletoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Reminders" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Reminders")}
                                        >
                                            <Text style={styles.ButtonText}>Reminders</Text>
                                        </TouchableOpacity>

                                    </View>
                                );
                            } else if (showwhat1 == "Signature") {
                                return (
                                    <View style={styles.moblieSec}>
                                        <TouchableOpacity
                                            style={[
                                                styles.emailtoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Message" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Message")}
                                        >
                                            <Text style={styles.ButtonText}>Message</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.mobiletoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Proposal" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Proposal")}
                                        >
                                            <Text style={styles.ButtonText}>Proposal</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.mobiletoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Signature" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Signature")}
                                        >
                                            <Text style={styles.ButtonText}>Signature Requests</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.mobiletoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Reminders" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Reminders")}
                                        >
                                            <Text style={styles.ButtonText}>Reminders</Text>
                                        </TouchableOpacity>

                                    </View>
                                );
                            } else {
                                return (
                                    <View style={styles.moblieSec}>
                                        <TouchableOpacity
                                            style={[
                                                styles.emailtoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Message" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Message")}
                                        >
                                            <Text style={styles.ButtonText}>Message</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.mobiletoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Proposal" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Proposal")}
                                        >
                                            <Text style={styles.ButtonText}>Proposal</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.mobiletoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Signature" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Signature")}
                                        >
                                            <Text style={styles.ButtonText}>Signature Requests</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.mobiletoch,
                                                {
                                                    backgroundColor:
                                                        showwhat1 == "Reminders" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc1("Reminders")}
                                        >
                                            <Text style={styles.ButtonText}>Reminders</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            }
                        })()}
                    </View>

                    <View style={styles.subContainer}>

                        {(() => {
                            if (showwhat == "Experience") {
                                return (
                                    <View style={styles.moblieSec}>
                                        <TouchableOpacity
                                            style={[
                                                styles.emailtoch,
                                                {
                                                    backgroundColor:
                                                        showwhat == "Experience" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc("Experience")}
                                        >
                                            <Text style={styles.ButtonText}>Incomplete (0)</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.mobiletoch,
                                                {
                                                    backgroundColor:
                                                        showwhat == "My Schools" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc("My Schools")}
                                        >
                                            <Text style={styles.ButtonText}>Complete (0)</Text>
                                        </TouchableOpacity>

                                    </View>
                                );
                            } else if (showwhat == "My Schools") {
                                return (
                                    <View style={styles.moblieSec}>
                                        <TouchableOpacity
                                            style={[
                                                styles.emailtoch,
                                                {
                                                    backgroundColor:
                                                        showwhat == "Experience" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc("Experience")}
                                        >
                                            <Text style={styles.ButtonText}>Incomplete (0)</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.mobiletoch,
                                                {
                                                    backgroundColor:
                                                        showwhat == "My Schools" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc("My Schools")}
                                        >
                                            <Text style={styles.ButtonText}>Complete (0)</Text>
                                        </TouchableOpacity>

                                    </View>
                                );
                            } else {
                                return (
                                    <View style={styles.moblieSec}>
                                        <TouchableOpacity
                                            style={[
                                                styles.emailtoch,
                                                {
                                                    backgroundColor:
                                                        showwhat == "Experience" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc("Experience")}
                                        >
                                            <Text style={styles.ButtonText}>Incomplete (0)</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.mobiletoch,
                                                {
                                                    backgroundColor:
                                                        showwhat == "My Schools" ? "#2F5597" : "lightgray",
                                                },
                                            ]}
                                            onPress={() => showwhatfunc("My Schools")}
                                        >
                                            <Text style={styles.ButtonText}>Complete (0)</Text>
                                        </TouchableOpacity>

                                    </View>
                                );
                            }
                        })()}

                        {(() => {
                            if (showwhat == "Experience") {
                                return (
                                    <ScrollView>
                                        {/* <View style={styles.subContainer}> */}
                                        <Text style={styles.subHead}> Results Not Found</Text>

                                        {/* </View> */}
                                    </ScrollView>
                                );
                            } else {
                                return (
                                    <ScrollView>
                                        {/* <View style={styles.subContainer}> */}
                                        <Text style={styles.subHead}>0 Results Found</Text>

                                        {/* </View> */}
                                    </ScrollView>
                                );
                            }
                        })()}
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

export default Request
const styles = StyleSheet.create({
    bgImg:{
        height:480
    },
    mainTab: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 50,
        height: 120,
        marginTop:20
    },
    header: {
        fontSize: 28,
        color: '#000',
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 20,
        width: '40%',
        backgroundColor: '#9DB436',
        padding: 5,

    },
    infoText: {
        fontSize: 15,
        color: "black",
        alignSelf: "center",
    },
    infoText1: {
        fontSize: 15,
        color: "black",
        alignSelf: "center",
        marginTop: 5,
        color: "grey",
    },
    line: {
        height: 40,
        width: 2,
        backgroundColor: "grey",
        marginTop: 5,
    },
    FavBooKChat: {
        height: 50,
        width: 50,
        backgroundColor: "black",
        borderRadius: 25,
        marginHorizontal: 5,
        marginTop: -20,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    FavBooKChatContainer: {
        height: 30,
        width: "33%",
    },
    moblieSec: {
        // backgroundColor: "lightgrey",
        // height: 20,
        borderRadius: 50,
        // justifyContent: "center",
        // alignItems: "center",
        marginTop: 20,
        // marginBottom: 30,
        width: 250,
        marginLeft: 20,
        flexDirection: "row",
        // alignSelf: "center",
    },
    emailtoch: {
        //  backgroundColor: "lightgray",
        width: 100,
        height: 40,
        justifyContent: "center",
        borderRadius: 30,
        marginRight: 10
    },
    ButtonText: {
        color: "#fff",
        textAlign: "center",
    },
    mobiletoch: {
        // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
        width: 90,
        height: 40,
        borderRadius: 30,
        justifyContent: "center",
    },
    subContainer: {
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        alignItems: 'center',
        height: 250,
        borderRadius: 20
    },
    subHead: {
        fontSize: 20,
        color: '#000',
        marginTop: 10,
        // marginLeft: 20,
        //  textAlign:'center'
    }
})