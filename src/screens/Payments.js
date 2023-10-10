import React, { useState } from 'react'
import { SafeAreaView, View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const Payments = () => {
    const [showwhat, setshowwhat] = useState("Experience");
    const showwhatfunc = (data) => {
        setshowwhat(data);
        console.log(data);

    };
    return (
        <SafeAreaView>
            <View>
                <View style={styles.headerView}>
                <Text style={styles.header}>Plan Invoices</Text>

                </View>
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
                                    <Text style={styles.ButtonText}>Pending (0)</Text>
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
                                    <Text style={styles.ButtonText}>Paid (0)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.emailtoch,
                                        {
                                            backgroundColor:
                                                showwhat == "Reviews" ? "#2F5597" : "lightgray",
                                        },
                                    ]}
                                    onPress={() => showwhatfunc("Reviews")}
                                >
                                    <Text style={styles.ButtonText}>Plan</Text>
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
                                    <Text style={styles.ButtonText}>Pending (0)</Text>
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
                                    <Text style={styles.ButtonText}>Paid (0)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.emailtoch,
                                        {
                                            backgroundColor:
                                                showwhat == "Reviews" ? "#2F5597" : "lightgray",
                                        },
                                    ]}
                                    onPress={() => showwhatfunc("Reviews")}
                                >
                                    <Text style={styles.ButtonText}>Plan</Text>
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
                                    <Text style={styles.ButtonText}>Pending (0)</Text>
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
                                    <Text style={styles.ButtonText}>Paid (0)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.emailtoch,
                                        {
                                            backgroundColor:
                                                showwhat == "Reviews" ? "#2F5597" : "lightgray",
                                        },
                                    ]}
                                    onPress={() => showwhatfunc("Reviews")}
                                >
                                    <Text style={styles.ButtonText}>Plan</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }
                })()}

                {(() => {
                    if (showwhat == "Experience") {
                        return (
                            <ScrollView>
                                <View style={styles.subContainer}>
                                    <Text style={styles.subHead}>Pending Invoices (0)</Text>

                                </View>
                            </ScrollView>
                        );
                    } else if (showwhat == "My Schools") {
                        return (
                            <ScrollView>
                                <View style={styles.subContainer}>
                                    <Text style={styles.subHead}>Paid Invoices (0)</Text>

                                </View>
                            </ScrollView>
                        );
                    } else {
                        return (
                            <ScrollView>
                                <View style={styles.subContainer}>
                                    <Text style={styles.subHead}>Plan</Text>

                                </View>
                            </ScrollView>
                        );
                    }
                })()}
            </View>
        </SafeAreaView>
    )
}

export default Payments
const styles = StyleSheet.create({
   
header:{
    fontSize: 28,
     color: '#000',
      marginTop: 30,
      marginBottom:30,
       marginLeft: 20 ,
       width:'50%',
       backgroundColor:'#9DB436',
       padding:5,

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
        backgroundColor: "lightgrey",
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
        width: 90,
        height: 50,
        justifyContent: "center",
        borderRadius: 30,
    },
    ButtonText: {
        color: "#fff",
        textAlign: "center",
    },
    mobiletoch: {
        // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
        width: 90,
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
    },
    subContainer: {
        backgroundColor: '#fff',
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
        alignItems: 'center',
        height: 250
    },
    subHead: {
        fontSize: 20,
        color: '#000',
        marginTop: 10,
        marginLeft: 20,
        //  textAlign:'center'
    }
})