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
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [activeSections, setActiveSection] = useState([]);
  const { GET_ORDER_DETAILS } = useSelector(state => state.PaymentReducer);
  const serviceListModel = GET_ORDER_DETAILS[0]?.serviceListModel[0]
  const bgImage = require('../Assets/img/guest_shape.png');
const [orderIDAcc, setOrderID]= useState()
  const navigation = useNavigation();
  const showwhatfunc = data => {
    setshowwhat(data);
    console.log(data);
  };
  console.log(orderIDAcc,'orderIDAcc')
  const jsonData = MY_INFO.guestInfo;
  console.log(GET_ORDER_DETAILS, 'orderInfoPAymentScreen')

  useEffect(() => {
    setLoader(true);
    dispatch(
      GetPaymentList(jsonData?.clientId, jsonData?.clientType, navigation),
    );

    setInfoData(GET_PAYMENT_LIST);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);
  console.log(infoData, 'infoData');
  useEffect(() => {
    setInfoData(GET_PAYMENT_LIST);
  }, [GET_PAYMENT_LIST]);

  useEffect(() => {
    // setLoader(true);
    setInfoData(GET_PAYMENT_LIST);
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);
  }, [GET_PAYMENT_LIST]);

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
  console.log(
    infoData.length,
    'GET_PAYMENT_LISTGET_PAYMENT_LISTGET_PAYMENT_LIST',
  );
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


        <View
          style={{
            width: wp(90),
            backgroundColor: '#fff',

            alignItems: 'center',
            alignSelf: 'center',
            elevation: 10,
            marginBottom: 10,

            height: wp(20),
          }}
        >
          <View style={{
            flexDirection: 'row', justifyContent: "flex-end",
            width: wp(90),
            backgroundColor: '#fff',
            marginBottom: 17

          }}>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('InvoiceView', {
                  orderId: item?.collectionInfo?.orderId
                })
              }}
              style={{
                backgroundColor: '#8AB645',
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
                size={15}
                color="#fff"
              />
              <Text style={{
                color: Color.white,
                fontSize: 9,
                marginTop: 2,
                marginLeft: 4

              }}>


                View Invoice
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ViewOrder', {
                  orderId: item?.collectionInfo?.orderId
                })
              }}
              style={{
                backgroundColor: '#8AB645',
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
                size={15}
                color="#fff"
              />
              <Text style={{
                color: Color.white,
                fontSize: 9,
                marginTop: 2,
                marginLeft: 4

              }}>


                View Order
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ flexDirection: 'row' }}
            onPress={() => getorderbyId(item?.collectionInfo?.orderId)}
          >
            {/* <View
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
                      </View> */}
            <View
              style={{
                width: wp(20),
                alignItems: 'center',
              }}>
              <Text style={{ color: '#2F4050', fontSize: 12 }}>
                #{item?.collectionInfo?.orderId}
              </Text>
            </View>


            <View
              style={{
                width: wp(20),

                alignItems: 'center',
              }}>
              <Text style={{ color: '#2F4050', fontSize: 10 }}>
                {item?.collectionInfo?.clientId}
              </Text>
            </View>
            <View
              style={{
                width: wp(20),

                alignItems: 'center',
              }}>
              <Text style={{ color: '#2F4050', fontSize: 10 }}>
                {item?.collectionInfo?.officeId}
              </Text>
            </View>
            <View
              style={{
                width: wp(20),

                alignItems: 'center',
              }}>
              {item?.collectionInfo?.status == 1 ? (
                <Text
                  style={{
                    color: Color.white,
                    fontSize: 8,
                    backgroundColor: '#1c84c6',
                    padding: 5,
                    textAlign: 'center',
                    width: wp(15),
                  }}>
                  Not Started
                </Text>
              ) : item?.collectionInfo?.status == 2 ? (
                <Text
                  style={{
                    color: Color.white,
                    fontSize: 8,
                    backgroundColor: '#1c84c6',
                    padding: 5,
                    textAlign: 'center',
                    width: wp(15),
                  }}>
                  Started
                </Text>
              ) : item?.collectionInfo?.status == 3 ? (
                <Text
                  style={{
                    color: Color.white,
                    fontSize: 8,
                    backgroundColor: '#1c84c6',
                    padding: 5,
                    textAlign: 'center',
                    width: wp(15),
                  }}>
                  Complete
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
                  Cancelled
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </>

    );
  };

  const renderContent = (section, _, isActive) => {
    setOrderID(section?.collectionInfo?.orderId)

    return (
      <>
        <Animatable.View style={{ marginBottom: 10, backgroundColor: '#fff' }}>
          <Animatable.View
            duration={400}
            style={[
              styles.content,
              isActive ? styles.active : styles.inactive,
              {
                width: wp(90),
                // backgroundColor: '#fff',
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
                textAlign: 'center',
                marginTop: 4,
                paddingTop: 3,
                width: wp(15),
                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: wp(7),
                fontSize: 12,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Category
            </Animatable.Text>
            <Animatable.Text
              animation={isActive ? 'bounceIn' : undefined}
              style={{
                color: '#000',
                textAlign: 'center',
                marginTop: 4,
                paddingTop: 3,
                width: wp(25),

                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: wp(7),
                fontSize: 12,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Service Name
            </Animatable.Text>
            <Animatable.Text
              animation={isActive ? 'bounceIn' : undefined}
              style={{
                color: '#000',
                textAlign: 'center',
                marginTop: 4,
                paddingTop: 3,
                width: wp(20),

                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: wp(7),
                fontSize: 12,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Retail Price
            </Animatable.Text>
            <Animatable.Text
              animation={isActive ? 'bounceIn' : undefined}
              style={{
                color: '#000',
                textAlign: 'center',
                marginTop: 4,
                paddingTop: 3,
                width: wp(15),

                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: wp(7),
                fontSize: 12,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Quantity
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
                    height: wp(15),



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
                    width: wp(25),

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
                    width: wp(20),

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
                    width: wp(15),

                    // backgroundColor: '#2F5597',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: wp(10),
                    fontSize: 12,
                    justifyContent: 'center',
                  }}>
                  {item?.reqInfo?.quantity}
                </Animatable.Text>
              </Animatable.View>
            )}
          />
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
      <View style={{ height: hp(80) }}>
        <ImageBackground
          source={bgImage}
          style={styles.bgImg}
          resizeMode="cover">
          {/* <View style={styles.headerView}>
          <Text style={styles.header}>Plan Invoices</Text>
        </View> */}
          {(() => {
            if (showwhat == 'Experience') {
              return (
                <View style={styles.moblieSec}>
                  <TouchableOpacity
                    style={[
                      styles.emailtoch,
                      {
                        backgroundColor:
                          showwhat == 'Experience' ? Color.geen : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc('Experience')}>
                    <Text style={styles.ButtonText}>
                      Pending ({infoData.length})
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mobiletoch,
                      {
                        backgroundColor:
                          showwhat == 'My Schools' ? Color.geen : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc('My Schools')}>
                    <Text style={styles.ButtonText}>Paid (0)</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.emailtoch,
                      {
                        backgroundColor:
                          showwhat == 'Reviews' ? Color.geen : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc('Reviews')}>
                    <Text style={styles.ButtonText}>Plan</Text>
                  </TouchableOpacity>
                </View>
              );
            } else if (showwhat == 'My Schools') {
              return (
                <View style={styles.moblieSec}>
                  <TouchableOpacity
                    style={[
                      styles.emailtoch,
                      {
                        backgroundColor:
                          showwhat == 'Experience' ? Color.geen : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc('Experience')}>
                    <Text style={styles.ButtonText}>Pending (0)</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mobiletoch,
                      {
                        backgroundColor:
                          showwhat == 'My Schools' ? Color.geen : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc('My Schools')}>
                    <Text style={styles.ButtonText}>Paid (0)</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.emailtoch,
                      {
                        backgroundColor:
                          showwhat == 'Reviews' ? Color.geen : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc('Reviews')}>
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
                          showwhat == 'Experience' ? Color.geen : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc('Experience')}>
                    <Text style={styles.ButtonText}>Pending (0)</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mobiletoch,
                      {
                        backgroundColor:
                          showwhat == 'My Schools' ? Color.geen : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc('My Schools')}>
                    <Text style={styles.ButtonText}>Paid (0)</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.emailtoch,
                      {
                        backgroundColor:
                          showwhat == 'Reviews' ? Color.geen : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc('Reviews')}>
                    <Text style={styles.ButtonText}>Plan</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })()}

          {(() => {
            if (showwhat == 'Experience') {
              return (
                <View style={styles.subContainer}>
                  <Text style={styles.subHead}>
                    Pending Invoices ({infoData.length})
                  </Text>

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
                    {/* <View
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
                      </View> */}
                    <View
                      style={{
                        width: wp(20),

                        alignItems: 'center',
                      }}>
                      <Text style={{ color: Color.darkGreen, fontSize: 12 }}>
                        Order Id
                      </Text>
                    </View>

                    {/* <View
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
                      </View> */}
                    <View
                      style={{
                        width: wp(20),

                        alignItems: 'center',
                      }}>
                      <Text style={{ color: Color.darkGreen, fontSize: 12 }}>
                        Client ID
                      </Text>
                    </View>
                    <View
                      style={{
                        width: wp(20),

                        alignItems: 'center',
                      }}>
                      <Text style={{ color: Color.darkGreen, fontSize: 12 }}>
                        Office ID
                      </Text>
                    </View>
                    <View
                      style={{
                        width: wp(20),

                        alignItems: 'center',
                      }}>
                      <Text style={{ color: Color.darkGreen, fontSize: 12 }}>
                        Tracking
                      </Text>
                    </View>
                  </View>

                  <Accordion
                    activeSections={activeSections}
                    sections={infoData}
                    //title and content of accordion
                    touchableComponent={TouchableOpacity}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    //Header Component(View) to render
                    //Content Component(View) to render
                    duration={400}
                    //Duration for Collapse and expand
                    onChange={setSections}
                  />

                </View>
              );
            } else if (showwhat == 'My Schools') {
              return (
                <View style={styles.subContainer}>
                  <Text style={styles.subHead}>Paid Invoices (0)</Text>
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
                  <Text style={styles.subHead}>Plan</Text>
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
        </ImageBackground>
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
  moblieSec: {
    backgroundColor: 'lightgrey',
    // height: 20,
    borderRadius: 50,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20,
    // marginBottom: 30,
    width: wp(90),
    marginLeft: 20,
    flexDirection: 'row',
    // alignSelf: "center",
  },
  emailtoch: {
    //  backgroundColor: "lightgray",
    width: wp(30),
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
  ButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  mobiletoch: {
    // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
    width: wp(30),
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
  },
  subContainer: {
    // backgroundColor: '#fff',
    width: wp(90),
    alignSelf: 'center',
    marginTop: 20,
    height: hp(75),

    // alignItems: 'center',
  },
  subHead: {
    fontSize: 14,
    color: '#fff',
    padding: 10,
    marginBottom: 20,
    backgroundColor: Color.darkGreen,
    //  textAlign:'center'
  },
  icon: {
    marginRight: 3
  }
});
