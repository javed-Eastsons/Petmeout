import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, PermissionsAndroid, FlatList, Image ,RefreshControl} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { bookVaccinationList, breedList, categoryList, chartFIlesList } from '../Redux/Actions/Petmeout';
import { Dropdown } from 'react-native-element-dropdown';
import RNFetchBlob from 'rn-fetch-blob';
import { useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pdf from 'react-native-pdf';
import Modal from "react-native-modal";
import { Loader } from '../Component/Loader';
import { Globals } from '../Config';

const VaccinationChart = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [categoryId, setCategoryId] = useState()
    const [loader, setLoader] = useState(false);
    const [category, setCategory] = useState('');
    const [breed, setBreed] = useState('');
    const [pdfUri, setPdfUri] = useState(null);
    const [allList, setAllList] = useState([])
    const [isModalVisibleSort, setModalVisibleSort] = useState(false)
    const [fileNamePdf, setFileNamePdf] = useState('')
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { VACCINATION_LIST } = useSelector(state => state.PetmeOutReducer);

    const { CATEGORY_LIST } = useSelector(state => state.PetmeOutReducer);
    const { BREED_LIST } = useSelector(state => state.PetmeOutReducer);
    const { LOGIN_PET } = useSelector(state => state.PetmeOutReducer);
    const { CHARTS_FILES_LIST } = useSelector(state => state.PetmeOutReducer);
    const [isDownloading, setIsDownloading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(chartFIlesList(category,breed));
        setTimeout(() => {
            setRefreshing(false);
        }, 2000); // Time for refresh
    };
    // console.log(CHARTS_FILES_LIST, 'CHARTS_FILES_LISTCHARTS_FILES_LIST')

    // console.log(fileNamePdf, 'fileNamePdffileNamePdf')
   
    const toggleModalSort = (fileName) => {
        console.log(fileName, 'toggleModalSortfileNamefileName')
        setFileNamePdf(Globals?.categoriesImagePath + fileName)
        if (fileNamePdf) {
            setModalVisibleSort(!isModalVisibleSort);
        }
    };
    const downloadPDF = async (fileName) => {
        console.log(fileName, 'fileNamefileName')
        if (isDownloading) {
            Alert.alert("Download in Progress", "A download is already in progress.");
            return;
        }

        setIsDownloading(true);

        const { config, fs } = RNFetchBlob;
        let DownloadDir = fs.dirs.DownloadDir; // For Android

        const filePath = `${DownloadDir}/${fileName}`;

        // Delete the existing file if it exists
        try {
            const fileExists = await fs.exists(filePath);
            if (fileExists) {
                await fs.unlink(filePath); // Delete the file
            }
        } catch (error) {
            console.warn('Failed to delete existing file:', error);
        }

        const options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: filePath, // Path where the file will be downloaded
                description: 'Downloading PDF file.',
            }
        };

        try {
            await config(options).fetch('GET', `${Globals?.categoriesImagePath + fileName}`);
            Alert.alert('Download Success', `File downloaded to: ${filePath}`);
        } catch (error) {
            Alert.alert('Download Error', `Failed to download file: ${error.message}`);
        } finally {
            setIsDownloading(false);
        }
    };
    useEffect(() => {
        const listData = [...VACCINATION_LIST];
        const reversedList = listData?.reverse()
        setAllList(reversedList);
    }, [VACCINATION_LIST]);
    useEffect(() => {
        setLoader(true);
        dispatch(bookVaccinationList(LOGIN_PET?.pet_id, navigation));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);
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

    useEffect(() => {
        setLoader(true);
        dispatch(chartFIlesList(category,breed));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [category,breed])

    const renderItem = ({ item }) => (
        <View style={styles.card} >
            <View style={{ padding: 10, alignItems: 'center', paddingTop: 15 }}>
                <Image source={require('../Assets/img/icons/pdf.png')} style={styles.petImage} />

            </View>
            <View style={styles.cardContent}>
                <Text style={styles.petName}>{item.upload_vaccination}</Text>
                <Text style={styles.petDetails}>{item.category}</Text>
                <Text style={styles.petDetails}>{item.breed}</Text>


            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', padding: 5 }}>
                <TouchableOpacity onPress={() => downloadPDF(item.upload_vaccination)}>
                    <Icon name="file-download" size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleModalSort(item.upload_vaccination)}>
                    <Icon name="remove-red-eye" size={24} />
                </TouchableOpacity>
            </View>

        </View>
    );
    return (
        <ScrollView style={styles.container}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
            <Loader flag={loader}/>
            <Text style={styles.title}>Vaccination Chart</Text>
            <View style={{padding:5}}>
            <View style={styles.section}>
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
                    search
                    searchPlaceholder='Search...'
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

                {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity> */}
            </View>
            </View>
            {
                CHARTS_FILES_LIST?.length == 0 ? null :
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, marginLeft: 5, marginTop: 10 }}>Charts:</Text>

            }
            <View style={{ height: hp(48) }}>
                <FlatList
                    data={CHARTS_FILES_LIST}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.vaccination_chart_id}
                    contentContainerStyle={{ padding: 5 }}
                   
                />
            </View>



            <Modal isVisible={isModalVisibleSort} style={styles.modal} animationOutTiming={700} backdropTransitionOutTiming={800}>
                <View style={styles.modalContentSort}>
                    <TouchableOpacity title="Hide modal" onPress={toggleModalSort} style={{ position: 'absolute', right: 10, top: 20, zIndex: 1 }} >
                        <Icon size={20} name='close' color='#000' />
                    </TouchableOpacity>
                    <Pdf
                        source={{ uri: fileNamePdf, cache: true }}
                        trustAllCerts={false}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        style={styles.pdf} />
                </View>
            </Modal>
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
        marginBottom: 4,
        textAlign: 'center',
    },
    section: {
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
        paddingVertical: 7,
        borderRadius: 5,
        alignItems: 'center',
        // marginVertical: 10,
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
        width: wp(90),
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
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        // padding: 5,
        height: 85
    },
    petImage: {
        width: 50,
        height: 55,
        borderRadius: 8,
        marginRight: 10,
        resizeMode: 'cover'
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    petName: {
        fontSize: 13,
        fontFamily: 'Poppins-Bold',

    },
    petDetails: {
        fontSize: 13,
        color: '#666',
        marginBottom: 5,
        fontFamily: 'Poppins-Regular'
    },
    petDetails1: {
        fontSize: 13,
        color: '#666',
        fontFamily: 'Poppins-Regular',
        marginLeft: 5
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContentSort: {
        height: 700, // Fixed height for the modal content
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
    },

});

export default VaccinationChart;
