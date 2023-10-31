import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color} from '../Style';
import {useDispatch, useSelector} from 'react-redux';
import {clientInfo, ManagerInfo} from '../Redux/Actions/TaxLeaf';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Loader} from '../Component/Loader';

import Carousel from 'react-native-reanimated-carousel';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {dashboardlist} from '../Redux/Actions/Dashboard';

const HomeScreen = () => {
  const width = Dimensions.get('window').width;
  const [showwhat1, setshowwhat1] = useState('');
  const [infoData, setInfoData] = useState({});
  const [dashboardList, setDashboardList] = useState([]);
  const [dashboardMessageList, setDashboardMessageList] = useState([]);
  const {MY_INFO} = useSelector(state => state.TaxLeafReducer);
  const {DASHBOARD_LIST} = useSelector(state => state.DashboardReducer);
  const {DASHBOARD_MESSAGE_LIST} = useSelector(state => state.DashboardReducer);
  const {MANAGER_INFO} = useSelector(state => state.TaxLeafReducer);
  const {LOGIN_DATA} = useSelector(state => state.TaxLeafReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const jsonData = MY_INFO.guestInfo;
  const officeInfo = MY_INFO.officeInfo;

  const showwhatfunc1 = data => {
    setshowwhat1(data);
    console.log(data);
  };
  console.log(showwhat1, 'showWhat');

  const data = [
    {
      id: 1,
      Title: 'Need Payroll?',
      subHead: 'We Can Help You With Your Company’s Payroll!',
      footHead: 'Contact Us For More Info!',
      img: require('../Assets/img/gdb-img1.png'),
    },
    {
      id: 2,
      Title: 'Bring a friend!',
      subHead:
        'Earn $50 In Your Next Order By Referring Friend To Us ByUsing The Code FRIEND50OFF',
      footHead: 'Call Us To Learn More!',
      img: require('../Assets/img/gdb-img2.png'),
    },
    {
      id: 3,
      Title: 'You Still Haven’t File Your Taxes?',
      subHead: 'Schedule Your Virtual Tax Return Now!',
      footHead: 'Call Us For More Information!',
      img: require('../Assets/img/gdb-img3.png'),
    },
    {
      id: 4,
      Title: 'Incorporations',
      subHead: 'Create A New Company Today!',
      footHead: 'Learn The Benefits of Having A US Company',
      img: require('../Assets/img/gdb-img4.png'),
    },
    {
      id: 5,
      Title: 'Wanna Move To The USA?',
      subHead: 'Franchise With Us!',
      footHead: 'Contact Us For More Info!',
      img: require('../Assets/img/gdb-img5.png'),
    },
    {
      id: 6,
      Title: 'Need Bookkeeping?',
      subHead: 'Add A Bookkeeping Plan To Your Business!',
      footHead: 'Contact Us TO Book It!',
      img: require('../Assets/img/gdb-img6.png'),
    },
  ];

  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    dispatch(clientInfo(LOGIN_DATA.staffview.user, navigation));
    dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));
    dispatch(
      dashboardlist(
        jsonData?.clientId,
        jsonData?.clientType,
        officeInfo?.id,
        navigation,
      ),
    );

    setInfoData(MANAGER_INFO);
    setDashboardList(DASHBOARD_LIST);
    setDashboardMessageList(DASHBOARD_MESSAGE_LIST);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setInfoData(MANAGER_INFO);
    setDashboardList(DASHBOARD_LIST);
    setDashboardMessageList(DASHBOARD_MESSAGE_LIST);
  }, []);

  useEffect(() => {
    // setLoader(true);
    setInfoData(MANAGER_INFO);
    setDashboardList(DASHBOARD_LIST);
    setDashboardMessageList(DASHBOARD_MESSAGE_LIST);
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);
  }, [MY_INFO, MANAGER_INFO, DASHBOARD_LIST, DASHBOARD_MESSAGE_LIST]);

  console.log(
    dashboardList,
    'newsandupdatelistnewsandupdatelistnewsandupdatelistnewsandupdatelistnewsandupdatelist',
  );

  const desiredNewsType = 'Holidays ';
  const TaxNewsType = 'Tax Deadlines';
  const filteredList =
    dashboardList &&
    dashboardList.filter(item => item.newsType === desiredNewsType);

  const TaxfilteredList =
    dashboardList &&
    dashboardList.filter(item => item.newsType === TaxNewsType);

  // console.log(filteredList, 'filteredListfilteredListfilteredListfilteredList');

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.cardSlider}
      // onPress={toggleModal}
    >
      <View style={styles.cardShadow}>
        <Image
          source={item.img}
          style={
            item.id == 1 || item.id == 2
              ? styles.Slidericons1
              : styles.Slidericons
          }
        />
      </View>
      <View>
        <Text style={styles.postText}>{item.Title}</Text>
      </View>
      <View style={{padding: 5}}>
        <Text numberOfLines={3} style={styles.sliderText}>
          {item.subHead}
        </Text>
        <Text style={styles.info}>{item.footHead}</Text>
        <TouchableOpacity style={styles.btn}>
          <Icon1
            style={[
              styles.icon,
              {
                color: '#fff',
              },
            ]}
            name="call"
            size={20}
            color="#fff"
          />
          <Text style={{color: '#fff', marginLeft: 10}}>987654</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Loader flag={loader} />
      <ScrollView>
        <Text style={styles.heading}>
          Thank you for being our client since 2023
        </Text>

        <View style={styles.slideContainer}>
          <View style={styles.mainTab}>
            {(() => {
              if (showwhat1 == 'Message') {
                return (
                  <View style={styles.moblieSec}>
                    {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                    <TouchableOpacity
                      style={[
                        styles.emailtoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Message' ? Color.geen : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Message'
                          ? setshowwhat1('')
                          : showwhatfunc1('Message')
                      }>
                      <Icon3
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#000',
                          },
                        ]}
                        name="money-check-alt"
                        size={15}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Message'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        Tax
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Message'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        (1)
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Proposal' ? '#2F4050' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Proposal'
                          ? setshowwhat1('')
                          : showwhatfunc1('Proposal')
                      }>
                      <Icon
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat1 == 'Proposal'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}
                        name="message1"
                        size={20}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Proposal'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        Messages
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Proposal'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        (4)
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Signature' ? '#2F4050' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Signature'
                          ? setshowwhat1('')
                          : showwhatfunc1('Signature')
                      }>
                      <Icon1
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat1 == 'Signature'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}
                        name="event"
                        size={20}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Signature'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        Events
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Signature'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        (0)
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Reminders' ? '#2F4050' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Reminders'
                          ? setshowwhat1('')
                          : showwhatfunc1('Reminders')
                      }>
                      <Icon2
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat1 == 'Reminders'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}
                        name="holiday-village"
                        size={20}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Reminders'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        Holidays
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Reminders'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        (1)
                      </Text>
                    </TouchableOpacity>
                    {/* </View> */}
                  </View>
                );
              } else if (showwhat1 == 'Proposal') {
                return (
                  <View style={styles.moblieSec}>
                    {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                    <TouchableOpacity
                      style={[
                        styles.emailtoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Message' ? '#2F4050' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Message'
                          ? setshowwhat1('')
                          : showwhatfunc1('Message')
                      }>
                      <Icon3
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#000',
                          },
                        ]}
                        name="money-check-alt"
                        size={20}
                        color="#fff"
                      />
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#000',
                          },
                        ]}>
                        Tax
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#000',
                          },
                        ]}>
                        (1)
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Proposal' ? Color.geen : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Proposal'
                          ? setshowwhat1('')
                          : showwhatfunc1('Proposal')
                      }>
                      <Icon
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Proposal' ? '#fff' : '#000',
                          },
                        ]}
                        name="message1"
                        size={15}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Proposal' ? '#fff' : '#000',
                          },
                        ]}>
                        Messages
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Proposal'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        (4)
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Signature' ? '#2F4050' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Signature'
                          ? setshowwhat1('')
                          : showwhatfunc1('Signature')
                      }>
                      <Icon1
                        style={[
                          styles.icon,
                          {color: showwhat1 == 'Signature' ? '#fff' : '#000'},
                        ]}
                        name="event"
                        size={20}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Signature' ? '#fff' : '#000',
                          },
                        ]}>
                        Events
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Signature' ? '#fff' : '#000',
                          },
                        ]}>
                        (0)
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Reminders' ? '#2F4050' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Reminders'
                          ? setshowwhat1('')
                          : showwhatfunc1('Reminders')
                      }>
                      <Icon2
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Reminders' ? '#fff' : '#000',
                          },
                        ]}
                        name="holiday-village"
                        size={20}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Reminders' ? '#fff' : '#000',
                          },
                        ]}>
                        Holidays
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Reminders' ? '#fff' : '#000',
                          },
                        ]}>
                        (1)
                      </Text>
                    </TouchableOpacity>
                    {/* </View> */}
                  </View>
                );
              } else if (showwhat1 == 'Signature') {
                return (
                  <View style={styles.moblieSec}>
                    {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                    <TouchableOpacity
                      style={[
                        styles.emailtoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Message' ? '#2F4050' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Message'
                          ? setshowwhat1('')
                          : showwhatfunc1('Message')
                      }>
                      <Icon3
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#000',
                          },
                        ]}
                        name="money-check-alt"
                        size={20}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#000',
                          },
                        ]}>
                        Tax
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#000',
                          },
                        ]}>
                        (1)
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Proposal' ? '#2F4050' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Proposal'
                          ? setshowwhat1('')
                          : showwhatfunc1('Proposal')
                      }>
                      <Icon
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Proposal' ? '#fff' : '#000',
                          },
                        ]}
                        name="message1"
                        size={20}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Proposal' ? '#fff' : '#000',
                          },
                        ]}>
                        Messages
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Proposal' ? '#fff' : '#000',
                          },
                        ]}>
                        (4)
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Signature' ? Color.geen : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Signature'
                          ? setshowwhat1('')
                          : showwhatfunc1('Signature')
                      }>
                      <Icon1
                        style={[
                          styles.icon,
                          {color: showwhat1 == 'Signature' ? '#fff' : '#000'},
                        ]}
                        name="event"
                        size={15}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Signature' ? '#fff' : '#000',
                          },
                        ]}>
                        Events
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Signature'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        (0)
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Reminders' ? '#2F4050' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Reminders'
                          ? setshowwhat1('')
                          : showwhatfunc1('Reminders')
                      }>
                      <Icon2
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Reminders' ? '#fff' : '#000',
                          },
                        ]}
                        name="holiday-village"
                        size={20}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Reminders' ? '#fff' : '#000',
                          },
                        ]}>
                        Holidays
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Reminders' ? '#fff' : '#000',
                          },
                        ]}>
                        (1)
                      </Text>
                    </TouchableOpacity>
                    {/* </View> */}
                  </View>
                );
              } else {
                return (
                  <View style={styles.moblieSec}>
                    {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                    <TouchableOpacity
                      style={[
                        styles.emailtoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Message' ? '#2F4050' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Message'
                          ? setshowwhat1('')
                          : showwhatfunc1('Message')
                      }>
                      <Icon3
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#000',
                          },
                        ]}
                        name="money-check-alt"
                        size={20}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#000',
                          },
                        ]}>
                        Tax
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#000',
                          },
                        ]}>
                        (1)
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Proposal' ? '#2F4050' : '#fff',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Proposal')}>
                      <Icon
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Proposal' ? '#fff' : '#000',
                          },
                        ]}
                        name="message1"
                        size={20}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Proposal' ? '#fff' : '#000',
                          },
                        ]}>
                        Messages
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Proposal' ? '#fff' : '#000',
                          },
                        ]}>
                        (4)
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Signature' ? '#2F4050' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Signature'
                          ? setshowwhat1('')
                          : showwhatfunc1('Signature')
                      }>
                      <Icon1
                        style={[
                          styles.icon,
                          {color: showwhat1 == 'Signature' ? '#fff' : '#000'},
                        ]}
                        name="event"
                        size={20}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Signature' ? '#fff' : '#000',
                          },
                        ]}>
                        Events
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Signature' ? '#fff' : '#000',
                          },
                        ]}>
                        (0)
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Reminders' ? Color.geen : '#fff',
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Reminders'
                          ? setshowwhat1('')
                          : showwhatfunc1('Reminders')
                      }>
                      <Icon2
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Reminders' ? '#fff' : '#000',
                          },
                        ]}
                        name="holiday-village"
                        size={15}
                        color="#fff"
                      />

                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Reminders' ? '#fff' : '#000',
                          },
                        ]}>
                        Holidays
                      </Text>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Reminders'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        (1)
                      </Text>
                    </TouchableOpacity>
                    {/* </View> */}
                  </View>
                );
              }
            })()}
          </View>
          {(() => {
            if (showwhat1 == 'Message') {
              return (
                <ScrollView>
                  {/* <View style={styles.subContainer}> */}
                  <TouchableOpacity onPress={() => setshowwhat1('')}>
                    <View style={styles.part}></View>
                    {TaxfilteredList &&
                      TaxfilteredList.map(item => (
                        <View key={item.id} style={{padding: 20}}>
                          <Text
                            style={{
                              backgroundColor: '#23c6c8',
                              fontSize: 12,
                              padding: 3,
                            }}>
                            {item.subject}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '700',
                              padding: 3,
                            }}>
                            Message:
                            <Text
                              style={{
                                fontSize: 10,
                                fontWeight: 'normal',
                                padding: 3,
                              }}>
                              {item.message}
                            </Text>
                          </Text>
                        </View>
                      ))}

                    {/* <Text style={styles.subHead}> Message Not Found</Text> */}

                    {/* </View> */}
                  </TouchableOpacity>
                </ScrollView>
              );
            } else if (showwhat1 == 'Proposal') {
              return (
                <ScrollView>
                  <TouchableOpacity onPress={() => setshowwhat1('')}>
                    <View style={styles.part}></View>

                    {dashboardMessageList &&
                      dashboardMessageList.map(item => (
                        <View
                          key={item.id}
                          style={{
                            paddingLeft: 20,
                            //paddingBottom: 10,
                            paddingTop: 10,
                          }}>
                          <Text
                            style={{
                              backgroundColor: '#23c6c8',
                              fontSize: 12,
                              width: wp(15),
                              padding: 3,
                              textAlign: 'center',
                            }}>
                            Action
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '700',
                              padding: 3,
                            }}>
                            Notification:
                            <Text
                              style={{
                                fontSize: 10,
                                fontWeight: 'normal',
                                padding: 3,
                              }}>
                              You have created new action #{item.id}
                            </Text>
                          </Text>
                        </View>
                      ))}

                    {/* <View style={styles.subContainer}> */}
                    {/* <Text style={styles.subHead}>Proposal Results Found</Text> */}

                    {/* </View> */}
                  </TouchableOpacity>
                </ScrollView>
              );
            } else if (showwhat1 == 'Signature') {
              return (
                <ScrollView>
                  <TouchableOpacity onPress={() => setshowwhat1('')}>
                    <View style={styles.part}></View>

                    {/* <View style={styles.subContainer}> */}
                    <Text style={styles.subHead}>Events not found</Text>

                    {/* </View> */}
                  </TouchableOpacity>
                </ScrollView>
              );
            } else if (showwhat1 == 'Reminders') {
              return (
                <TouchableOpacity onPress={() => setshowwhat1('')}>
                  <View style={{height: 200}}>
                    <View style={styles.part}></View>
                    {filteredList &&
                      filteredList.map(item => (
                        <View key={item.id} style={{height: 200, padding: 20}}>
                          <Text
                            style={{
                              backgroundColor: '#23c6c8',
                              fontSize: 12,
                              padding: 3,
                            }}>
                            {item.subject}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '700',
                              padding: 3,
                            }}>
                            Message:
                            <Text
                              style={{
                                fontSize: 10,
                                fontWeight: 'normal',
                                padding: 3,
                              }}>
                              {item.message}
                            </Text>
                          </Text>
                        </View>
                      ))}
                    {/* <View style={styles.subContainer}> */}
                    {/* <Text style={styles.subHead}>Reminders Not Found1</Text> */}
                    {/* </View> */}
                  </View>
                </TouchableOpacity>
              );
            }
          })()}
        </View>

        <View style={{flex: 1, marginTop: 20, marginLeft: 20}}>
          <Carousel
            loop
            width={width}
            height={width}
            autoPlay={true}
            data={data}
            scrollAnimationDuration={3000}
            onSnapToItem={index => console.log('current index:', index)}
            renderItem={renderItem}
          />
        </View>

        <View style={styles.slideContainer}>
          <Image
            source={require('../Assets/profileBlank.png')}
            style={styles.profileImg}
          />
          <Text style={styles.headText}>
            {MANAGER_INFO?.managerInfo?.firstName}{' '}
            {MANAGER_INFO?.managerInfo?.lastName}
          </Text>
          <Text style={styles.headText1}>Get in Touch !</Text>
          <ScrollView nestedScrollEnabled={true}>
            <View style={styles.infoHead}>
              <Text style={styles.infoHeadText}> Office Information</Text>
            </View>
            <Text style={styles.ofcInfotxt1}>
              {' '}
              <Icon
                style={styles.icon}
                name="phone"
                size={20}
                color="#000"
              />{' '}
              {MANAGER_INFO?.officeInfo?.phone}
            </Text>
            <Text style={styles.ofcInfotxt}>
              <Icon style={styles.icon} name="mail" size={20} color="#000" />{' '}
              {MANAGER_INFO?.officeInfo?.email}
            </Text>
            <View style={styles.infoHead}>
              <Text style={styles.infoHeadText}> Staff Information</Text>
            </View>
            <Text style={styles.ofcInfotxt1}>
              {' '}
              <Icon
                style={styles.icon}
                name="phone"
                size={20}
                color="#000"
              />{' '}
              {MANAGER_INFO?.managerInfo?.phone}
            </Text>
            <Text style={styles.ofcInfotxt}>
              <Icon style={styles.icon} name="mail" size={20} color="#000" />{' '}
              {MANAGER_INFO?.managerInfo?.user}
            </Text>
          </ScrollView>
        </View>
        <View style={{height: wp(5)}}></View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 16,
    // maxWidth:'80%',
    color: Color.darkGreen,
    // height:40,
    marginTop: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  part: {
    borderWidth: 0.5,
    borderColor: '#A7B1C2',
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  slideContainer: {
    backgroundColor: '#fff',
    width: wp(90),
    justifyContent: 'center',
    alignSelf: 'center',
    /// height: 420,
    opacity: 2,
    paddingBottom: 20,
    borderRadius: 10,
    marginTop: 20,
    // width:'62%'
  },
  Slidericons: {
    width: '80%',
    height: 160,
    resizeMode: 'contain',

    // marginTop: 10,
    // marginLeft: 20,
    alignSelf: 'center',
  },
  Slidericons1: {
    width: '60%',
    height: 140,
    resizeMode: 'contain',
    // marginLeft: 20,
    alignSelf: 'center',
  },
  postText: {
    alignSelf: 'center',
    color: '#1F3E50',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  sliderText: {
    color: Color.geen,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  cardSlider: {
    flex: 1,
    //borderWidth: 1,
    backgroundColor: '#fff',
    width: wp(90),
    justifyContent: 'center',
  },
  info: {
    color: '#1F3E50',
    alignSelf: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  btn: {
    width: wp(40),
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    backgroundColor: Color.geen,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profileImg: {
    width: 70,
    borderRadius: 80,
    height: 70,
    marginTop: 30,
    alignSelf: 'center',
    // marginLeft:100
  },
  headText: {
    textAlign: 'center',
    // marginLeft:110,
    color: Color.darkGreen,
    marginTop: 10,
    fontWeight: '600',
  },
  headText1: {
    color: Color.darkGreen,
    marginTop: 30,
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 30,
  },
  infoHead: {
    backgroundColor: Color.geen,
    padding: 7,
    marginTop: 20,
    width: '82%',
    marginLeft: 30,
    // alignSelf: 'center',
    marginBottom: 12,
  },
  infoHeadText: {
    color: '#fff',
    fontSize: 14,
    padding: 5,
    fontWeight: '600',
  },
  ofcInfotxt: {
    color: Color.darkGreen,
    marginLeft: 30,
    fontSize: 14,
  },
  ofcInfotxt1: {
    color: '#1F3E50',
    marginLeft: 30,
    justifyContent: 'center',
    margin: 10,
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
    marginRight: 5,
  },
  subHead: {
    marginLeft: 30,
    marginTop: 20,
  },
  icon: {alignSelf: 'center'},
  cardShadow: {
    // backgroundColor: 'red',
    // height: 300,
    paddingTop: 20,
  },
});
