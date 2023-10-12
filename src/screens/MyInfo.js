import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react'
import { DataTable } from 'react-native-paper';

const MyInfo = () => {
    return (
        <ScrollView>
                        <Text style={{ fontSize: 28, color: '#000', marginTop: 20 ,marginLeft:20}}>My Info</Text>

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
    )
}

export default MyInfo

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
    }
})