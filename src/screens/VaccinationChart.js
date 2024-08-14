import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { breedList, categoryList } from '../Redux/Actions/Petmeout';
import { Dropdown } from 'react-native-element-dropdown';

const VaccinationChart = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [categoryId, setCategoryId] = useState()
    const [loader, setLoader] = useState(false);
    const [category, setCategory] = useState('');
    const [breed, setBreed] = useState('');
    const [pdfUri, setPdfUri] = useState(null);
    const dispatch = useDispatch();

    const { CATEGORY_LIST } = useSelector(state => state.PetmeOutReducer);
    const { BREED_LIST } = useSelector(state => state.PetmeOutReducer);
    const handleDownloadPdf = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            setPdfUri(res.uri);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert('Canceled', 'You canceled the file picker');
            } else {
                Alert.alert('Error', 'Failed to pick a file');
            }
        }
    };

    // Function to generate a Google Docs viewer URL
    const generatePdfViewerUrl = (uri) => {
        // Google Docs viewer URL
        return `https://docs.google.com/gview?url=${encodeURIComponent(uri)}`;
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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Vaccination Chart</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Details:</Text>
                <Dropdown
                    style={[styles.input]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    search
                    data={CATEGORY_LIST}
                    maxHeight={200}
                    labelField="cat_name"
                    valueField="cat_name"
                    placeholder={!isFocus ? 'Select Category' : '...'}
                    value={category}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    // onConfirmSelectItem={(item)=>{documentTypes(item)}}
                    onChange={item => {

                        setIsFocus(false);
                        setCategoryId(item?.cat_id)
                        setCategory(item?.cat_name)

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
                    labelField="breed_name"
                    valueField="breed_name"
                    placeholder={!isFocus ? 'Select Breed' : '...'}
                    value={breed}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setIsFocus(false);
                        setBreed(item?.breed_name)
                    }}

                />
              
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleDownloadPdf}
            >
                <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>

            {pdfUri && (
                <View style={styles.pdfContainer}>
                    <Text style={styles.pdfTitle}>PDF Preview:</Text>
                    <WebView
                        source={{ uri: generatePdfViewerUrl(pdfUri) }}
                        style={styles.pdf}
                    />
                </View>
            )}
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
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    pdfContainer: {
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    pdfTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    pdf: {
        width: '100%',
        height: 500,
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
});

export default VaccinationChart;
