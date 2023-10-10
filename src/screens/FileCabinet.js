import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet, Text, Button, ScrollView, Modal, TextInput, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper';
import { Dropdown } from "react-native-element-dropdown";

const FileCabinet = () => {
    const [idRow, setIdRow] = useState()
    const [selectedData, setSelectedData] = useState()
    const [press, setPress] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };
    console.log(selectedData, 'selll')
    const data = [
        {
            id: 1,
            name: 'Tax Documents',
            leafCloud: 2,
            myFiles: 6
        },
        {
            id: 2,
            name: 'Fax Documents',
            leafCloud: 2,
            myFiles: 5
        },
        {
            id: 3,

            name: 'GST',
            leafCloud: 2,
            myFiles: 3
        },
        {
            id: 4,

            name: 'Finance',
            leafCloud: 2,
            myFiles: 1
        },
        {
            id: 5,

            name: 'Personal Docs',
            leafCloud: 2,
            myFiles: 0
        },
        {
            id: 6,

            name: 'Family Docs',
            leafCloud: 2,
            myFiles: 2
        },
    ]
    const data1 = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
    const handleRow = (item) => {
        setIdRow(item.id)
        setPress(true)
        setSelectedData(item)
    }
    return (
        <SafeAreaView>
            <ScrollView style={{opacity: modalVisible == true ? 0.2 : null}}>
                <Text style={styles.header}>File <Text style={{ backgroundColor: '#9DB436', padding: 2 }}>Cabinet</Text></Text>
                <View style={{ width: '40%', marginLeft: 20, marginBottom: 20 }}>
                    <Button
                        title="+ Add File"
                        color="#8AB645"
                        onPress={() => setModalVisible(true)}
                    />
                </View>
                <View style={{ width: '40%', marginLeft: 20, marginBottom: 20 }}>
                    <Button
                        title="Back To Home"
                        color="#3B71CA"
                    // onPress={() => setModalVisible(true)}
                    />
                </View>
                <Text style={styles.client}>Client Id : EASTSONSPRI</Text>

                <View>
                    <DataTable style={styles.container}>
                        <DataTable.Header style={styles.tableHeader}>
                            <DataTable.Title><Text style={styles.headerText}>Folder Name</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.headerText}>Leafcloud</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.headerText}>My Files</Text></DataTable.Title>
                        </DataTable.Header>
                        {
                            data.map((item) => {
                                return (
                                    <DataTable.Row onPress={() => handleRow(item)} style={{ backgroundColor: idRow == item.id && press == true ? 'purple' : null }}>
                                        <DataTable.Cell ><Text style={{ color: idRow == item.id && press == true ? '#fff' : '#676A6C' }}>{item.name}</Text></DataTable.Cell>
                                        <DataTable.Cell><Text style={{ color: idRow == item.id && press == true ? '#fff' : '#676A6C' }}>{item.leafCloud}</Text></DataTable.Cell>
                                        <DataTable.Cell><Text style={{ color: idRow == item.id && press == true ? '#fff' : '#676A6C' }}>{item.myFiles}</Text></DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })
                        }




                    </DataTable>
                </View>
                {
                    press == true ?
                        <View style={styles.popup}>
                            <Text style={styles.popupHead}>{selectedData.name}</Text>
                            <View style={{ borderWidth: 1, borderColor: '#3B71CA', marginVertical: 10 }}></View>
                            <View style={styles.row}>
                                <Text style={styles.popupYear}>2023</Text>
                                <Text style={{ marginTop: 10 }}>(Total Files :{selectedData.myFiles})</Text>
                            </View>
                        </View>
                        : null
                }

            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <Text style={styles.Subheading}>Upload File</Text>
                            <Text style={{position:'absolute',left:180}}
                                onPress={() => setModalVisible(!modalVisible)}
                            >close</Text>
                        </View>
                            <Text style={{ alignSelf: "flex-start" }}>Folder*</Text>

                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={data1}
                                maxHeight={300}

                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select item' : '...'}
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}
                            //   renderLeftIcon={() => (
                            //     <AntDesign
                            //       style={styles.icon}
                            //       color={isFocus ? 'blue' : 'black'}
                            //       name="Safety"
                            //       size={20}
                            //     />
                            //   )}
                            />
                        
                            <Text style={{ alignSelf: "flex-start" ,marginTop:20}}>Document Type*</Text>

                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={data1}
                                maxHeight={300}

                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select item' : '...'}
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}
                            //   renderLeftIcon={() => (
                            //     <AntDesign
                            //       style={styles.icon}
                            //       color={isFocus ? 'blue' : 'black'}
                            //       name="Safety"
                            //       size={20}
                            //     />
                            //   )}
                            />
                            <Text style={{ alignSelf: "flex-start" ,marginTop:20}}>Attachments*</Text>

                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                        // onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default FileCabinet
const styles = StyleSheet.create({
    popupHead: {
        fontSize: 20,
        color: '#3B71CA',
        backgroundColor: '#E0EDD4',
        padding: 3
    },
    Subheading: {
        fontSize: 20,
        color: '#3B71CA',
        fontWeight: '600',
        textAlign:'center'
    },
    popupYear: {
        fontSize: 20,
        color: '#3B71CA',
    },
    popup: {
        width: '70%',
        alignSelf: 'center',
        height: 90,
        backgroundColor: '#fff',
        padding: 10,
        opacity: 10,
        marginTop: 10
    },
    row: { flexDirection: 'row' },
    tableHeader: {
        backgroundColor: '#3B71CA'
    },
    headerText: {
        color: '#fff'
    },
    header: {
        fontSize: 28,
        color: '#000',
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 20,
        width: '50%',
        padding: 5,

    },
    client: {
        marginLeft: 20,
        fontSize: 16,
        marginVertical: 10
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
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%'
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: 120,
        alignSelf: 'flex-end'
    },
    buttonOpen: {
        backgroundColor: '#8AB645',
    },
    buttonClose: {
        backgroundColor: '#8AB645',
    },
    dropdown: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        width: '100%',
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    textStyle:{
        color:'#fff',
        textAlign:'center'
    }
})