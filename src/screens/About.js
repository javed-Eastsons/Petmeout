import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

const About = ({ route }) => {
    const { petDetails } = route?.params;
    console.log(route?.params, 'ABOUTABOUTABOUTABOUT')
    return (
        <View>
            <ScrollView>
                <View >
                    <View
                        style={{
                            height: 40,

                            width: '100%',
                            paddingLeft: 10,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            marginTop: 20
                            //   backgroundColor: 'green',
                        }}>
                        <Text style={styles.head}>
                            Personal Information
                        </Text>
                    </View>
                    <View style={styles.partition}></View>
                    <View
                        style={{
                            height: 40,
                            //   backgroundColor: '#fff',

                            padding: 10,
                        }}>
                        <Text style={styles.LIstText}>
                            <Text style={styles.keyText}>Gender: </Text>{' '}
                            {petDetails?.gender}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 40,
                            //   backgroundColor: '#fff',

                            padding: 10,
                        }}>
                        <Text style={styles.LIstText}>
                            <Text style={styles.keyText}>Category: </Text>{' '}
                            {petDetails?.cat_name}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 40,
                            //   backgroundColor: '#fff',

                            padding: 10,
                        }}>
                        <Text style={styles.LIstText}>
                            <Text style={styles.keyText}>Breed: </Text>{' '}
                            {petDetails?.breed}
                        </Text>
                    </View>

                    <View
                        style={{
                            height: 40,
                            //   backgroundColor: '#fff',

                            padding: 10,
                        }}>
                        <Text style={styles.LIstText}>
                            <Text style={styles.keyText}>Age: </Text>{' '}
                            {petDetails?.age} Years
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 40,
                            //   backgroundColor: '#fff',

                            padding: 10,
                        }}>
                        <Text style={styles.LIstText}>
                            <Text style={styles.keyText}>Weight: </Text>{' '}
                            {petDetails?.weight} {petDetails?.unit}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 40,
                            //   backgroundColor: '#fff',

                            padding: 10,
                        }}>
                        <Text style={styles.LIstText}>
                            <Text style={styles.keyText}>Color: </Text>{' '}
                            {petDetails?.color}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 40,
                            //   backgroundColor: '#fff',

                            padding: 10,
                        }}>
                        <Text style={styles.LIstText}>
                            <Text style={styles.keyText}>State: </Text>{' '}
                            {petDetails?.state}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 40,
                            //   backgroundColor: '#fff',

                            padding: 10,
                        }}>
                        <Text style={styles.LIstText}>
                            <Text style={styles.keyText}>City: </Text>{' '}
                            {petDetails?.location}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 40,
                            //   backgroundColor: '#fff',

                            padding: 10,
                        }}>
                        <Text style={styles.LIstText}>
                            <Text style={styles.keyText}>Pincode: </Text>{' '}
                            {petDetails?.pincode}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 40,
                            //   backgroundColor: '#fff',

                            padding: 10,
                        }}>
                        <Text style={styles.LIstText}>
                            <Text style={styles.keyText}>Country: </Text>{' '}
                            {petDetails?.country}
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    LIstText2: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: 'black',
    },
    LIstText: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: 'gray',
    },
    partition: {
        borderWidth: 0.5,
        borderColor: '#A7B1C2',

    },
    keyText: { fontSize: 14, fontFamily: 'Poppins-Regular', color: '#000' },
    head: { fontSize: 17, fontFamily: 'Poppins-SemiBold', color: '#000', textAlign: 'left' }
})