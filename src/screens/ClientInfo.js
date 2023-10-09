import React, { useState } from 'react'
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';

const ClientInfo = () => {
    const [showwhat, setshowwhat] = useState("Experience");
    const showwhatfunc = (data) => {
        setshowwhat(data);
        console.log(data);
        // if (showwhat == 'email')
        //     setshowwhat('mobile')
        // else if (showwhat == 'mobile') {
        //     setshowwhat('email')
        // }
        // else {
        //     setshowwhat('scan')
        // }
    };
    return (
        <ScrollView style={[styles.main]}>
            <Text style={{ fontSize: 28, color: '#000', marginTop: 10 ,marginLeft:20}}>Clients</Text>
            <View style={{ alignSelf:'center', flexDirection: 'row', marginTop: 20,marginLeft:20 }}>
                <Text style={[styles.head]}>Total Clients <View style={[styles.headNum]}><Text style={[styles.textNum]}>3</Text></View> || </Text>
                <Text style={[styles.head]}>Business <View style={[styles.headNum1]}><Text style={[styles.textNum]}>2</Text></View> || </Text>
                <Text style={[styles.head]}>Individual <View style={[styles.headNum2]}><Text style={[styles.textNum]}>0</Text></View></Text>

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
                                <Text style={styles.ButtonText}>My Info</Text>
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
                                <Text style={styles.ButtonText}>Client Info</Text>
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
                                <Text style={styles.ButtonText}>My Info</Text>
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
                                <Text style={styles.ButtonText}>Client Info</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }
            })()}

            {(() => {
                if (showwhat == "Experience") {
                    return (
                        <View style={{ backgroundColor: '#fff', padding: 20, opacity: 2, borderRadius: 10, marginLeft: 20, marginTop: 20 }}>
                            <View style={{ textAlign: 'center' }}>
                                <Image
                                    source={require("../Assets/profileBlank.png")}
                                    style={{ width: '100%', height: 160 }}
                                />
                                <Text style={{ textAlign: 'center', color: '#000', marginBottom: 10 }}>Prince Eastsons</Text>

                            </View>
                            <View style={{ backgroundColor: '#e1f7f7', padding: 10, borderRadius: 10 }}>
                                <View style={{ height: 40, backgroundColor: '#fff', marginTop: 10, padding: 10 }}>
                                    <Text style={styles.LIstText2}>
                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Date Of Birth:</Text>  12-09-1990
                                    </Text>
                                </View>
                                <View style={{ height: 40, marginTop: 10, padding: 10 }}>
                                    <Text style={styles.LIstText2}>
                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Office:</Text> Noida
                                    </Text>
                                </View>
                                <View style={{ height: 40, backgroundColor: '#fff', marginTop: 10, padding: 10 }}>
                                    <Text style={styles.LIstText2}>
                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Department:</Text> IT
                                    </Text>
                                </View>
                                <View style={{ height: 40, marginTop: 10, padding: 10 }}>
                                    <Text style={styles.LIstText2}>
                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Contact Info:</Text> 9865478934
                                    </Text>
                                </View>
                                <View style={{ height: 40, backgroundColor: '#fff', marginTop: 10, padding: 10 }}>
                                    <Text style={styles.LIstText2}>
                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>CellPhone:</Text> +1 378498
                                    </Text>
                                </View>
                                <View style={{ height: 40, marginTop: 10, padding: 10 }}>
                                    <Text style={styles.LIstText2}>
                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Extensions:</Text> +91
                                    </Text>
                                </View>
                                <View style={{ height: 40, marginTop: 10, backgroundColor: '#fff', padding: 10 }}>
                                    <Text style={styles.LIstText2}>
                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Social Security Number:</Text> 7532684
                                    </Text>
                                </View>
                                <View style={{ height: 40, marginTop: 10, padding: 10 }}>
                                    <Text style={styles.LIstText2}>
                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Username:</Text> prince@eastsons.com
                                    </Text>
                                </View>
                                <View style={{ height: 40, marginTop: 10, backgroundColor: '#fff', padding: 10 }}>
                                    <Text style={styles.LIstText2}>
                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Time Of Expiration:</Text> 2023-10-06
                                    </Text>
                                </View>
                                <View style={{ height: 40, marginTop: 10, padding: 10 }}>
                                    <Text style={styles.LIstText2}>
                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Status:</Text> Active
                                    </Text>
                                </View>
                                <View style={{ height: 40, marginTop: 10, backgroundColor: '#fff', padding: 10 }}>
                                    <Text style={styles.LIstText2}>
                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Type:</Text> Prince
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                } else {
                    return (
                        <ScrollView>
                            <DataTable style={styles.container}>
                                <DataTable.Header style={styles.tableHeader}>
                                    <DataTable.Title>Name</DataTable.Title>
                                    <DataTable.Title>Favourite Food</DataTable.Title>
                                    <DataTable.Title>Age</DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row>
                                    <DataTable.Cell>Radhika</DataTable.Cell>
                                    <DataTable.Cell>Dosa</DataTable.Cell>
                                    <DataTable.Cell>23</DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell>Krishna</DataTable.Cell>
                                    <DataTable.Cell>Uttapam</DataTable.Cell>
                                    <DataTable.Cell>26</DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>Vanshika</DataTable.Cell>
                                    <DataTable.Cell>Brownie</DataTable.Cell>
                                    <DataTable.Cell>20</DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>Teena</DataTable.Cell>
                                    <DataTable.Cell>Pizza</DataTable.Cell>
                                    <DataTable.Cell>24</DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        </ScrollView>
                    );
                }
            })()}


        </ScrollView>
    )
}

export default ClientInfo
const styles = StyleSheet.create({
    main: {
        width: '95%',
        flex:1
    },
    container: {
        padding: 15,
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
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
    content: {
        padding: 20,
        backgroundColor: "#fff",
        color: "#000",
    },
    active: {
        backgroundColor: "rgba(255,255,255,1)",
        color: "#000",
    },
    inactive: {
        backgroundColor: "rgba(245,252,255,1)",
        color: "#000",
    },
    selectors: {
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
        color: "#000",
        backgroundColor: "red",
    },
    selector: {
        backgroundColor: "#F5FCFF",
        padding: 10,
        color: "#000",
    },
    activeSelector: {
        fontWeight: "bold",
        color: "#000",
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: "500",
        padding: 10,
        textAlign: "center",
        color: "#000",
    },
    multipleToggle: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 30,
        alignItems: "center",
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
    header: {
        backgroundColor: "#F5FCFF",
        padding: 10,
    },
    headerText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500",
    },
    content: {
        padding: 20,
        backgroundColor: "#fff",
    },

    Headers: {
        height: 10,
        justifyContent: "center",
        flexDirection: "row",
        width: 100,
    },


    icons: {
        height: 30,
        width: 30,
        marginRight: 10,
        alignSelf: "center",
    },
    Bookicons: {
        height: 30,
        width: 30,
        // marginRight: 10,
        alignSelf: "center",
    },
    Locationicons: {
        height: 20,
        width: 20,
        // marginRight: 10,
        alignSelf: "center",
    },

    cardCenter: {
        // borderWidth: 0.2,
        height: 210,
        width: "60%",
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 50,
        // elevation:2
    },
    shadowPropCenter: {
        shadowOffset: { width: 8, height: 10 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    threeDotContainer: {
        height: 40,
        width: 40,
        backgroundColor: "#2F5597",
        alignSelf: "flex-end",
        marginHorizontal: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    threeDoticons: {
        height: 30,
        width: 30,
        alignSelf: "center",
    },

    leftImageWrapper: {
        width: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    infoContainer: {
        height: 50,
        width: "33%",
        justifyContent: "center",
        alignItems: "center",
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
        width: 150,
        marginLeft:20,
        flexDirection: "row",
        // alignSelf: "center",
    },
    emailtoch: {
        //  backgroundColor: "lightgray",
        width: 80,
        height: 40,
        justifyContent: "center",
        borderRadius: 30,
    },
    ButtonText: {
        color: "#fff",
        textAlign: "center",
    },
    mobiletoch: {
        // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
        width: 80,
        height: 40,
        borderRadius: 30,
        justifyContent: "center",
    },
    searchSection: {
        justifyContent: "space-between",
        paddingBottom: 12,
        alignSelf: "center",
        marginTop: 5,
    },
    TextInputText: {
        color: "#fff",
        // fontFamily: 'SharpSansDispNo1-Book',
        fontSize: 14,
        lineHeight: 16,
        paddingBottom: 8,
        backgroundColor: "#067FD0",
        width: 300,
        marginBottom: 5,
        padding: 10,
        borderRadius: 10,
    },
});