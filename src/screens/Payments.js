import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CustomHeader from '../Component/CustomHeader';
import CustomBottomTab from '../Component/CustomBottomTab';
import { GetPaymentList, GetDetailsbyOrderId } from '../Redux/Actions/PaymentAction';
import { Loader } from '../Component/Loader';
import { Color } from '../Style';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Foundation';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import { dashboardlist } from '../Redux/Actions/Dashboard';
import HeadTabs from './HeadTabs';

const data = [
  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },

  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },

  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },
  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },
  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },
  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },
  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },
  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },
];
const Payments = () => {
  const [showwhat, setshowwhat] = useState('Experience');
  const [infoData, setInfoData] = useState([]);

  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { GET_PAYMENT_LIST } = useSelector(state => state.PaymentReducer);
  const { DASHBOARD_LIST } = useSelector(state => state.DashboardReducer);
  const { DASHBOARD_MESSAGE_LIST } = useSelector(state => state.DashboardReducer);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [activeSections, setActiveSection] = useState([]);
  const { GET_ORDER_DETAILS } = useSelector(state => state.PaymentReducer);
  const serviceListModel = GET_ORDER_DETAILS[0]?.serviceListModel[0]
  const bgImage = require('../Assets/img/guest_shape.png');
  const [orderIDAcc, setOrderID] = useState()
  const navigation = useNavigation();
  const showwhatfunc = data => {
    setshowwhat(data);
    //console.log(data);
  };
  //console.log(orderIDAcc, 'orderIDAcc')
  //console.log(GET_PAYMENT_LIST, 'GET_PAYMENT_LIST')
  const jsonData = MY_INFO.guestInfo;
  const officeInfo = MY_INFO.officeInfo;

  //console.log(GET_ORDER_DETAILS, 'orderInfoPAymentScreen')

  useEffect(() => {
    setLoader(true);
    dispatch(
      GetPaymentList(jsonData?.clientId, jsonData?.clientType, navigation),
    );

    setInfoData(GET_PAYMENT_LIST);
    dispatch(
      dashboardlist(
        jsonData?.clientId,
        jsonData?.clientType,
        officeInfo?.id,
        navigation,
      ),
    );

    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);
  // console.log(infoData, 'infoData');
  useEffect(() => {
    setInfoData(GET_PAYMENT_LIST);
  }, [GET_PAYMENT_LIST]);

  useEffect(() => {
    // setLoader(true);
    setInfoData(GET_PAYMENT_LIST);
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);
    getorderbyId()
  }, [GET_PAYMENT_LIST]);
  // useEffect(() => {
  //   infoData?.collectionInfo.map((item)=>{
  //     getorderbyId(item?.orderId)
  //   })
  // }, [infoData])


  const getorderbyId = (orderId) => {
    // Alert.alert('hii')
    console.log(orderId, 'orderIDDDD')
    // setLoader(true);

    dispatch(
      GetDetailsbyOrderId(jsonData?.clientId, jsonData?.clientType, orderId, navigation),
    );
    //   setTimeout(() => {
    //     setLoader(false);
    // }, 2000);
  }
  // console.log(
  //   infoData.length,
  //   'GET_PAYMENT_LISTGET_PAYMENT_LISTGET_PAYMENT_LIST',
  // );
  const SECTIONS = [
    {
      title: 'First',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Second',
      content: 'Lorem ipsum...',
    },
  ];

  const renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const renderHeader = item => {
    return (
      <>

        <View></View>

      </>

    );
  };

  const renderContent = (section, _, isActive) => {
    setOrderID(section?.collectionInfo?.orderId)

    return (
      <>
        <Animatable.View style={{ marginBottom: 20, backgroundColor: '#fff' }}>
          <Animatable.View
            duration={400}
            style={[
              styles.content,
              isActive ? styles.active : styles.inactive,
              {
                width: wp(90),
                backgroundColor: Color.green,
                alignItems: 'center',
                alignSelf: 'center',
                // marginBottom: 10,
                flexDirection: 'row',
                height: wp(15),


                opacity: 10,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}
            transition="backgroundColor">
            <Animatable.Text
              animation={isActive ? 'bounceIn' : undefined}
              style={{
                color: '#fff',
                textAlign: 'center',
                marginTop: 4,
                paddingTop: 3,
                width: wp(15),
                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: wp(10),
                fontSize: 12,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Category
            </Animatable.Text>
            <Animatable.Text
              animation={isActive ? 'bounceIn' : undefined}
              style={{
                color: '#fff',
                textAlign: 'center',
                marginTop: 4,
                paddingTop: 3,
                width: wp(20),

                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: wp(10),
                fontSize: 12,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Service Name
            </Animatable.Text>
            <Animatable.Text
              animation={isActive ? 'bounceIn' : undefined}
              style={{
                color: '#fff',
                textAlign: 'center',
                marginTop: 4,
                paddingTop: 3,
                width: wp(17),

                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: wp(10),
                fontSize: 12,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Retail Price
            </Animatable.Text>
            <Animatable.Text
              animation={isActive ? 'bounceIn' : undefined}
              style={{
                color: '#fff',
                textAlign: 'center',
                marginTop: 4,
                paddingTop: 3,
                width: wp(18),

                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: wp(10),
                fontSize: 12,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Quantity
            </Animatable.Text>
            <Animatable.Text
              animation={isActive ? 'bounceIn' : undefined}
              style={{
                color: '#fff',
                textAlign: 'center',
                // marginTop: 4,
                alignSelf: "center",
                width: wp(17),

                backgroundColor: Color.darkGreen,
                // borderTopLeftRadius: 10,
                // borderTopRightRadius: 10,
                height: wp(15),
                paddingTop: 15,
                fontSize: 12,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Total Price
            </Animatable.Text>
          </Animatable.View>
          <FlatList
            data={GET_ORDER_DETAILS[0]?.serviceListModel}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <Animatable.View
                duration={400}
                style={[
                  styles.content,
                  isActive ? styles.active : styles.inactive,
                  {
                    width: wp(90),
                    // backgroundColor: '#fff',
                    alignItems: 'center',
                    // marginBottom: 10,
                    flexDirection: 'row',
                    // height: wp(15),


                    alignSelf: 'center',

                    opacity: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                ]}
                transition="backgroundColor">
                <Animatable.Text
                  animation={isActive ? 'bounceIn' : undefined}
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    width: wp(15),

                    // backgroundColor: '#2F5597',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: wp(10),
                    fontSize: 12,
                    justifyContent: 'center',
                  }}>
                  {item?.serviceInfo?.category?.name}
                </Animatable.Text>
                <Animatable.Text
                  animation={isActive ? 'bounceIn' : undefined}
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    width: wp(20),

                    // backgroundColor: '#2F5597',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: wp(10),
                    fontSize: 12,
                    justifyContent: 'center',
                  }}>
                  {item?.serviceInfo?.description}
                </Animatable.Text>
                <Animatable.Text
                  animation={isActive ? 'bounceIn' : undefined}
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    width: wp(17),

                    // backgroundColor: '#2F5597',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: wp(10),
                    fontSize: 12,
                    justifyContent: 'center',
                  }}>
                  ${item?.reqInfo?.retailPrice}
                </Animatable.Text>
                <Animatable.Text
                  animation={isActive ? 'bounceIn' : undefined}
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    width: wp(18),

                    // backgroundColor: '#2F5597',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: wp(10),
                    fontSize: 12,
                    justifyContent: 'center',
                  }}>
                  {item?.reqInfo?.quantity}
                </Animatable.Text>
                <Animatable.Text
                  animation={isActive ? 'bounceIn' : undefined}
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    width: wp(17),

                    // backgroundColor: '#2F5597',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: wp(10),
                    fontSize: 12,
                    justifyContent: 'center',
                  }}>
                  ${item?.reqInfo?.priceCharged}
                </Animatable.Text>
              </Animatable.View>
            )}
          />
          <Animatable.View
            duration={400}
            style={[
              styles.content,
              isActive ? styles.active : styles.inactive,
              {
                width: wp(90),
                backgroundColor: 'lightgray',
                alignItems: 'center',
                alignSelf: 'center',
                // marginBottom: 10,
                flexDirection: 'row',
                height: wp(10),
                opacity: 10,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}
            transition="backgroundColor">
            <Animatable.Text
              animation={isActive ? 'bounceIn' : undefined}
              style={{
                color: '#000',
                // textAlign: 'center',
                marginTop: wp(6),
                //paddingTop: 10,
                //width: wp(18),
                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                //borderTopRightRadius: 10,
                height: wp(10),
                fontSize: 8,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Order ID #{section?.collectionInfo?.orderId}
            </Animatable.Text>
            <View
              style={{
                width: wp(12),

                alignItems: 'center',
              }}>
              {section?.serviceInfo?.isActive == 'y' ? (
                <Text
                  style={{
                    color: Color.white,
                    fontSize: 10,
                    backgroundColor: '#1c84c6',


                    padding: 5,
                    textAlign: 'center',
                    width: wp(12),
                  }}>
                  Active
                </Text>
              ) : (
                <Text
                  style={{
                    color: Color.white,
                    fontSize: 8,
                    backgroundColor: '#1c84c6',
                    padding: 5,
                    textAlign: 'center',
                    width: wp(15),
                  }}>
                  Active
                </Text>

              )}
            </View>

            <View style={{
              flexDirection: 'row',
              width: wp(48),
              // backgroundColor: '#fff',
              // marginBottom: 17

            }}>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('InvoiceView', {
                    orderId: section?.collectionInfo?.orderId
                  })
                }}
                style={{
                  // backgroundColor: '#8AB645',
                  padding: 5,
                  textAlign: 'center',
                  width: wp(22),
                  marginLeft: 10,
                  flexDirection: 'row',
                  // borderRadius: 3
                }}
              >
                <Icon
                  name="eye"
                  size={17}
                  color="#8AB645"
                />
                <Text style={{
                  color: "#000",
                  fontSize: 11,
                  // marginTop: 2,
                  marginLeft: 4

                }}>


                  View Invoice
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ViewOrder', {
                    orderId: section?.collectionInfo?.orderId
                  })
                }}
                style={{
                  // backgroundColor: '#8AB645',
                  padding: 5,
                  textAlign: 'center',
                  width: wp(20),
                  marginLeft: 10,
                  flexDirection: 'row',
                  // borderRadius: 3
                }}
              >
                <Icon
                  name="eye"
                  size={17}
                  color="#8AB645"
                />
                <Text style={{
                  color: "#000",
                  fontSize: 11,
                  // marginTop: 2,
                  marginLeft: 4

                }}>


                  View Order
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </Animatable.View>
      </>
    );
  };
  const setSections = sections => {
    //setting up a active section state
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
    console.log(sections, 'PPPPPPPPPPPPPPPPPPPP');
    setActiveSection(sections.includes(undefined) ? [] : sections);
    // getorderbyId(sections?.collectionInfo?.orderId)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader flag={loader} />
      <CustomHeader />
      <View style={{ height: hp(80), backgroundColor: '#d5e3e5' }}>

        {/* <ImageBackground

          source={bgImage}
          style={styles.bgImg}
          resizeMode="cover"> */}

        <ScrollView nestedScrollEnabled={true}

        >

          <HeadTabs />
          {/* <View style={styles.headerView}>
          <Text style={styles.header}>Plan Invoices</Text>
        </View> */}
          <Text style={{ fontSize: 19, marginLeft: 20, color: Color.headerIconBG, fontWeight: 700, marginTop: 5 }}>Payments</Text>
          <View style={{ width: wp(95), alignSelf: 'center', height: hp(46) }}>
            {(() => {
              if (showwhat == 'Experience') {
                return (
                  <View style={styles.moblieSec1}>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch1,
                        {
                          backgroundColor:
                            showwhat == 'Experience' ? Color.green : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12,

                        },
                      ]}
                      onPress={() => showwhatfunc('Experience')}>
                      <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="clockcircle"
                        size={20}
                        color="#fff"
                      />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonText1 : styles.ButtonTextW}>
                        Pending ({infoData.length})
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletochP,
                        {
                          backgroundColor:
                            showwhat == 'My Schools' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('My Schools')}>
                      <IconF
                        style={{ backgroundColor: showwhat == 'My Schools' ? 'lightgray' : Color.geen, width: wp(6), borderRadius: 15, paddingLeft: 7, height: hp(2.8), marginRight: 4, color: showwhat == 'My Schools' ? Color.geen : '#fff' }}
                        name="dollar"
                        size={20}
                        color={Color.geen}
                      />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Paid (0)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch2,
                        {
                          backgroundColor:
                            showwhat == 'Reviews' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('Reviews')}>
                      <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="checkcircle"
                        size={18}
                        color={Color.geen}
                      />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Plan</Text>
                    </TouchableOpacity>
                  </View>
                );
              } else if (showwhat == 'My Schools') {
                return (
                  <View style={styles.moblieSec1}>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch1,
                        {
                          backgroundColor:
                            showwhat == 'Experience' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12

                        },
                      ]}
                      onPress={() => showwhatfunc('Experience')}>
                      <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="clockcircle"
                        size={20}
                        color={showwhat == 'My Schools' ? Color.geen : 'lightgray'}
                      />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonText1 : styles.ButtonTextW}>
                        Pending ({infoData.length})
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletochP,
                        {
                          backgroundColor:
                            showwhat == 'My Schools' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('My Schools')}>
                      <IconF
                        style={{ backgroundColor: showwhat == 'My Schools' ? '#fff' : '#fff', width: wp(6), borderRadius: 15, paddingLeft: 7, height: hp(2.8), marginRight: 4, color: showwhat == 'My Schools' ? Color.geen : 'lightgray' }}
                        name="dollar"
                        size={20}
                        color="#fff"
                      />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Paid (0)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch2,
                        {
                          backgroundColor:
                            showwhat == 'Reviews' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('Reviews')}>
                      <Icon
                        style={[
                          { marginRight: 5 }
                        ]}
                        name="checkcircle"
                        size={18}
                        color={showwhat == 'My Schools' ? Color.geen : 'lightgray'}
                      />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonText1 : styles.ButtonTextW}>Plan</Text>
                    </TouchableOpacity>
                  </View>
                );
              } else {
                return (
                  <View style={styles.moblieSec1}>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch1,
                        {
                          backgroundColor:
                            showwhat == 'Experience' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12

                        },
                      ]}
                      onPress={() => showwhatfunc('Experience')}>
                      <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="clockcircle"
                        size={20}
                        color={showwhat == 'My Schools' ? 'lightgray' : Color.geen}
                      />
                      <Text style={showwhat == 'Experience' ? styles.ButtonTextW : styles.ButtonText1}>
                        Pending ({infoData.length})
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletochP,
                        {
                          backgroundColor:
                            showwhat == 'My Schools' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('My Schools')}>
                      <IconF
                        style={{ backgroundColor: showwhat == 'My Schools' ? 'lightgray' : Color.geen, width: wp(6), borderRadius: 15, paddingLeft: 7, height: hp(2.8), marginRight: 4, color: showwhat == 'My Schools' ? Color.geen : '#fff' }}
                        name="dollar"
                        size={20}
                        color="#fff"
                      />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Paid (0)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch2,
                        {
                          backgroundColor:
                            showwhat == 'Reviews' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('Reviews')}>
                      <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="checkcircle"
                        size={18}
                        color="#fff"
                      />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonText1 : styles.ButtonTextW}>Plan</Text>
                    </TouchableOpacity>
                  </View>
                );
              }
            })()}

            {(() => {
              if (showwhat == 'Experience') {
                return (
                  <View style={styles.subContainer}>
                    {/* <Text style={styles.subHead}>
                    Pending Invoices ({infoData.length})
                    </Text> */}

                    <ScrollView style={{ height: hp(40), paddingBottom: 30 }}>


                      <Accordion
                        activeSections={activeSections}
                        sections={infoData}
                        //title and content of accordion
                        touchableComponent={TouchableOpacity}
                        renderHeader={renderContent}
                        renderContent={renderHeader}
                        //Header Component(View) to render
                        //Content Component(View) to render
                        duration={400}
                        //Duration for Collapse and expand
                        onChange={setSections}
                      />
                    </ScrollView>
                  </View>
                );
              } else if (showwhat == 'My Schools') {
                return (
                  <View style={styles.subContainer}>
                    {/* <Text style={styles.subHead}>Paid Invoices (0)</Text> */}
                    <Text style={{ textAlign: 'center' }}>No Data Found</Text>
                    {/* <FlatList
                  data={data}
                  // numColumns={5}
                  keyExtractor={(item, index) => index}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        width: wp(90),
                        backgroundColor: '#fff',

                        alignItems: 'center',
                        alignSelf: 'center',
                        elevation: 10,

                        marginBottom: 10,
                        flexDirection: 'row',
                        height: wp(15),
                      }}>
                      <View
                        style={{
                          width: wp(15),

                          alignItems: 'center',
                        }}>
                        <Image
                          source={item.img}
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                            //alignSelf: 'center',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: wp(30),

                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#2F4050', fontSize: 12}}>
                          {item.clintID}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp(30),

                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#2F4050', fontSize: 12}}>
                          {item.clintName}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp(15),

                          alignItems: 'center',
                        }}>
                        <Image
                          source={item.viewicon}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 50,
                            //alignSelf: 'center',
                          }}
                        />
                      </View>
                    </View>
                  )}
                /> */}
                  </View>
                );
              } else {
                return (
                  <View style={styles.subContainer}>
                    {/* <Text style={styles.subHead}>Plan</Text> */}
                    <Text style={{ textAlign: 'center' }}>No Data Found</Text>
                    {/* <FlatList
                  data={data}
                  // numColumns={5}
                  keyExtractor={(item, index) => index}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        width: wp(90),
                        backgroundColor: '#fff',

                        alignItems: 'center',
                        alignSelf: 'center',
                        elevation: 10,

                        marginBottom: 10,
                        flexDirection: 'row',
                        height: wp(15),
                      }}>
                      <View
                        style={{
                          width: wp(15),

                          alignItems: 'center',
                        }}>
                        <Image
                          source={item.img}
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                            //alignSelf: 'center',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: wp(30),

                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#2F4050', fontSize: 12}}>
                          {item.clintID}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp(30),

                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#2F4050', fontSize: 12}}>
                          {item.clintName}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp(15),

                          alignItems: 'center',
                        }}>
                        <Image
                          source={item.viewicon}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 50,
                            //alignSelf: 'center',
                          }}
                        />
                      </View>
                    </View>
                  )}
                /> */}
                  </View>
                );
              }
            })()}
          </View>
        </ScrollView>

        {/* </ImageBackground> */}

      </View>
      <CustomBottomTab />
    </SafeAreaView>
  );
};

export default Payments;
const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    color: '#000',
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 20,
    width: '50%',
    backgroundColor: '#9DB436',
    padding: 5,
  },
  infoText: {
    fontSize: 15,
    color: 'black',
    alignSelf: 'center',
  },
  infoText1: {
    fontSize: 15,
    color: 'black',
    alignSelf: 'center',
    marginTop: 5,
    color: 'grey',
  },
  line: {
    height: 40,
    width: 2,
    backgroundColor: 'grey',
    marginTop: 5,
  },
  FavBooKChat: {
    height: 50,
    width: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    marginHorizontal: 5,
    marginTop: -20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FavBooKChatContainer: {
    height: 30,
    width: '33%',
  },
  moblieSec1: {
    backgroundColor: '#fff',
    // height: 20,
    borderRadius: 50,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 10,
    // marginBottom: 30,
    width: wp(90),
    marginLeft: 10,
    flexDirection: 'row',
    // alignSelf: "center",
  },
  emailtoch1: {
    //  backgroundColor: "lightgray",
    width: wp(32),
    height: 50,
    justifyContent: 'center',
    // borderRadius: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 20
  },
  emailtoch2: {
    //  backgroundColor: "lightgray",
    width: wp(28),
    height: 50,
    justifyContent: 'center',
    // borderRadius: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  ButtonText1: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '700',
  },
  ButtonTextW: {
    color: '#fff',
    fontWeight: '700',

    textAlign: 'center',
  },
  mobiletochP: {
    // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
    width: wp(30),
    height: 50,
    // borderRadius: 10,
    justifyContent: 'center',
  },
  subContainer: {
    // backgroundColor: '#fff',
    width: wp(90),
    alignSelf: 'center',
    marginTop: 10,
    // height: hp(75),

    // alignItems: 'center',
  },
  subHead: {
    fontSize: 14,
    color: '#000',
    padding: 10,
    marginBottom: 20,
    // backgroundColor: Color.darkGreen,
    textAlign: 'center'
  },
  icon: { alignSelf: 'center', marginTop: 5 },

  mobiletoch1: {
    // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
    // width: 70,
    // height: 45,
    width: wp(13),
    height: wp(13),
    //marginTop: 10,
    paddingTop: 5,
    borderRadius: 50,
    // justifyContent: 'center',
    marginRight: 5,
  },
  slideContainer: {
    // backgroundColor: '#fff',
    width: wp(95),
    justifyContent: 'center',
    alignSelf: 'center',
    /// height: 420,
    opacity: 2,
    paddingBottom: 20,
    borderRadius: 10,
    // marginTop: 20,
    // width:'62%'
  },
  moblieSec: {
    // backgroundColor: "lightgrey",
    // height: 20,
    width: wp(85),
    // backgroundColor: 'red',
    //backgroundColor: 'red',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 50,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20,
    // marginBottom: 30,

    flexDirection: 'row',
    // alignSelf: "center",
  },
  emailtoch: {
    //  backgroundColor: "lightgray",
    width: wp(13),
    height: wp(13),
    paddingTop: 5,
    //  justifyContent: 'center',
    borderRadius: 50,
    //marginRight: 6,
    //marginTop: 10,
  },
  ButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 9,
  },
  mobiletoch: {
    // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
    // width: 70,
    // height: 45,
    width: wp(13),
    height: wp(13),
    //marginTop: 10,
    paddingTop: 5,
    borderRadius: 50,
    // justifyContent: 'center',
    // marginRight: 5,
    marginLeft: 6
  },
  bgImg: {
    height: hp(80)
  },
  emailtochO: {
    //  backgroundColor: "lightgray",
    width: wp(13),
    height: wp(13),
    paddingTop: 5,
    //  justifyContent: 'center',
    borderRadius: 50,
    //marginRight: 6,
    //marginTop: 10,
  },
  part: {
    borderWidth: 0.5,
    borderColor: '#A7B1C2',
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
