import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { bookVaccination, breedList, categoryList } from '../Redux/Actions/Petmeout';
import { Loader } from '../Component/Loader';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';

const genderData = [
    {
        id: 1,
        name: 'Male'
    },
    {
        id: 2,
        name: 'Female'
    }
]
const BookVaccination = () => {
    // State for form data
    const [personalDetails, setPersonalDetails] = useState({
        name: '',
        age: '',
        gender: '',
        category: '',
        breed: '',
        vaccination_type: ''
    });

    const [addressDetails, setAddressDetails] = useState({
        address: '',
        phone: '',
        message: '',
        vaccination_date: new Date()
    });
    const [isFocus, setIsFocus] = useState(false);
    const [categoryId, setCategoryId] = useState()
    const [categoryName, setCategoryName] = useState()
    const [breedName, setBreedName] = useState()
    const [loader, setLoader] = useState(false);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [base64Image, setBase64Image] = useState(null)

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { CATEGORY_LIST } = useSelector(state => state.PetmeOutReducer);
    const { BREED_LIST } = useSelector(state => state.PetmeOutReducer);
    const { LOGIN_PET } = useSelector(state => state.PetmeOutReducer);

    console.log(LOGIN_PET, 'LOGIN_PETLOGIN_PETLOGIN_PET')

    function toBase64(url) {
        return fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }));
    }


    toBase64(LOGIN_PET?.image_path).then(base64 => {
        // console.log(base64);
        // If you only need the Base64 string (without the data:image/jpeg;base64, prefix):
        const base64String = base64.split(',')[1];
        setBase64Image(base64String)
        // console.log(base64String,'6466466464646');
    });

    const handleSubmit = () => {
        // Combine both personal and address details
        const formData1 = {
            ...personalDetails,
            ...addressDetails,
            vaccination_date: addressDetails.vaccination_date.toISOString(),
            pet_image: base64Image,
            pet_id: LOGIN_PET?.pet_id
        };
        const formData = new FormData();
        Object.keys(formData1).forEach(key => {
            formData.append(key, formData1[key]);
        });
        // Implement form submission logic here
        // Alert.alert('Form Submitted', JSON.stringify(formData, null, 2));
        setLoader(true);
        dispatch(bookVaccination(formData, LOGIN_PET?.pet_id, navigation));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
        console.log(formData, 'formDataformData')
    };
    useEffect(() => {
        setLoader(true);
        dispatch(categoryList());
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);
    useEffect(() => {
        setLoader(true);
        dispatch(breedList(categoryId));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [categoryId]);
    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Loader flag={loader} />
            <Text style={styles.title}>Book Vaccination</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Details</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={personalDetails.name}
                    onChangeText={(text) => setPersonalDetails({ ...personalDetails, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    keyboardType="numeric"
                    value={personalDetails.age}
                    onChangeText={(text) => setPersonalDetails({ ...personalDetails, age: text })}
                />
                <Dropdown
                    style={[styles.input]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={genderData}
                    maxHeight={200}
                    labelField="name"
                    valueField="name"
                    placeholder={!isFocus ? 'Select Gender' : '...'}
                    value={personalDetails.gender}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setIsFocus(false);
                        setPersonalDetails({ ...personalDetails, gender: item?.name })
                    }}

                />
                <Dropdown
                    style={[styles.input]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    search
                    searchPlaceholder='Search...'
                    data={CATEGORY_LIST}
                    maxHeight={200}
                    labelField="cat_name"
                    valueField="cat_name"
                    placeholder={!isFocus ? 'Select Category' : '...'}
                    value={categoryName}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    // onConfirmSelectItem={(item)=>{documentTypes(item)}}
                    onChange={item => {

                        setIsFocus(false);
                        setCategoryId(item?.cat_id)
                        setPersonalDetails({ ...personalDetails, category: item?.cat_name })

                    }}

                />
                <Dropdown
                    style={[styles.input]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={BREED_LIST}
                    maxHeight={200}
                    search
                    searchPlaceholder='Search...'
                    labelField="breed_name"
                    valueField="breed_name"
                    placeholder={!isFocus ? 'Select Breed' : '...'}
                    value={breedName}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setIsFocus(false);
                        setPersonalDetails({ ...personalDetails, breed: item?.breed_name })
                    }}

                />

                <TextInput
                    style={styles.input}
                    placeholder="Vaccination Type"
                    value={personalDetails.vaccination_type}
                    onChangeText={(text) => setPersonalDetails({ ...personalDetails, vaccination_type: text })}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Address to Visit"
                    value={addressDetails.address}
                    onChangeText={(text) => setAddressDetails({ ...addressDetails, address: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    keyboardType="phone-pad"
                    value={addressDetails.phone}
                    onChangeText={(text) => setAddressDetails({ ...addressDetails, phone: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Time with Day"
                    value={addressDetails.vaccination_date.toLocaleString()}
                // onChangeText={(text) => setAddressDetails({ ...addressDetails, time: text })}
                />
                <View style={styles.calender}>
                    <TouchableOpacity onPress={() => setOpen(true)}>
                        <Image
                            source={require("../Assets/img/icons/calendar.png")}
                            style={{
                                width: 25,
                                height: 25,



                            }} />
                    </TouchableOpacity>
                </View>
                {/* <TextInput
                    style={styles.input}
                    placeholder="Enter year or choose on calender"
                    keyboardType="numeric"
                    maxLength={10}
                    value={year}
                    onChangeText={onChangeYear}
                /> */}
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    placeholder="Message"
                    value={addressDetails.message}
                    onChangeText={(text) => setAddressDetails({ ...addressDetails, message: text })}
                />
                <DatePicker
                    modal
                    open={open}
                    date={addressDetails.vaccination_date}
                    onConfirm={(selectedDate) => {
                        // setOpen(false);
                        // setDate(selectedDate);
                        // setYear(moment(selectedDate).format('DD/MM/YYYY'));
                        setAddressDetails({ ...addressDetails, vaccination_date: selectedDate });
                        setOpen(false);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Book Now</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: '#333',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        fontSize: 13,
        fontFamily: 'Poppins-Regular'
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    placeholderStyle: {
        fontSize: 13,
        color: 'gray',
        fontFamily: 'Poppins-Regular'

    },
    selectedTextStyle: {
        fontSize: 13,
        color: 'gray'
    },
    calender: {
        width: '10%', height: 40, position: 'absolute', bottom: 135, right: 20

    },
});

export default BookVaccination;
