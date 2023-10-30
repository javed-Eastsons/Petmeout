import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
let iconm = require('../Assets/img/icons/msg.png');
let iconmw = require('../Assets/img/icons/msg-white.png');
let iconP = require('../Assets/img/icons/agreement.png');
let iconS = require('../Assets/img/icons/proposal.png');
let iconR = require('../Assets/img/icons/reminder.png');
let iconC = require('../Assets/img/icons/checklist.png');
let iconE = require('../Assets/img/icons/error.png');
const Request = () => {
  const [showwhat, setshowwhat] = useState('Experience');
  const [showwhat1, setshowwhat1] = useState('Message');
  const bgImage = require('../Assets/img/py-bg.png');

  const navigation = useNavigation();
  const showwhatfunc = data => {
    setshowwhat(data);
    console.log(data);
  };
  const showwhatfunc1 = data => {
    setshowwhat1(data);
    console.log(data);
  };
  return (
    <SafeAreaView>
      <View>
        {/* <View style={styles.headerView}>
          <Text style={styles.header}>Requests</Text>
        </View> */}
        <View
          style={{
            width: '40%',
            alignSelf: 'flex-start',
            marginTop: 10,
            marginBottom: 20,
            marginLeft: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateNewAction')}
            // onPress={() => setModalVisible(true)}
            style={{
              flexDirection: 'row',
              width: wp(35),
              // justifyContent: 'center',
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 20,
              padding: 5,
            }}>
            <View
              style={{
                width: 35,
                height: 35,
                justifyContent: 'center',
                // borderWidth: 1,
                borderRadius: 50,
                borderColor: '#2F4050',
                // alignSelf: 'center',
              }}>
              <Image
                source={iconm}
                style={{
                  width: 20,
                  height: 20,

                  borderColor: '#fff',
                  alignSelf: 'center',
                }}
              />
            </View>
            <Text style={styles.newRText}>New Request</Text>
          </TouchableOpacity>
          {/* <Button
            title="+ New Request"
            color="#2F4050"

            // onPress={() => setModalVisible(true)}
          /> */}
        </View>
        {/* <ImageBackground source={bgImage} 
        //style={styles.bgImg}
        > */}
        <View style={styles.mainTab}>
          {(() => {
            if (showwhat1 == 'Message') {
              return (
                // <View style={styles.moblieSec}>
                <View style={styles.MessageContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: wp(40),
                      justifyContent: 'flex-start',
                      marginBottom: 20,
                    }}>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Message' ? '#2F4050' : 'lightgray',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Message')}>
                      <View
                        style={{
                          width: 35,
                          height: 35,
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderRadius: 50,
                          borderColor: '#fff',
                          alignSelf: 'center',
                        }}>
                        <Image
                          source={iconmw}
                          style={{
                            width: 20,
                            height: 20,

                            borderColor: '#fff',
                            alignSelf: 'center',
                          }}
                        />
                      </View>

                      <Text style={styles.DarkButtonText}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled={true}
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Proposal' ? '#2F5597' : '',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Proposal')}>
                      <View
                        style={{
                          width: 35,
                          height: 35,
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderRadius: 50,
                          borderColor: '#2F4050',
                          alignSelf: 'center',
                        }}>
                        <Image
                          source={iconP}
                          style={{
                            width: 20,
                            height: 20,

                            borderColor: '#fff',
                            alignSelf: 'center',
                          }}
                        />
                      </View>
                      <Text style={styles.ButtonText}>Proposal</Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: wp(40),
                      justifyContent: 'flex-end',
                      // backgroundColor: 'yellow',
                      marginBottom: 20,
                    }}>
                    <TouchableOpacity
                      disabled={true}
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Signature' ? '#2F5597' : '',
                          marginBottom: 10,
                          marginRight: wp(3),
                          //marginLeft: 10,
                        },
                      ]}
                      onPress={() => showwhatfunc1('Signature')}>
                      <View
                        style={{
                          width: 35,
                          height: 35,
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderRadius: 50,
                          borderColor: '#2F4050',
                          alignSelf: 'center',
                        }}>
                        <Image
                          source={iconS}
                          style={{
                            width: 20,
                            height: 20,

                            borderColor: '#fff',
                            alignSelf: 'center',
                          }}
                        />
                      </View>
                      <Text style={styles.ButtonText}>Signature</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled={true}
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Reminders' ? '#2F5597' : '',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Reminders')}>
                      <View
                        style={{
                          width: 35,
                          height: 35,
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderRadius: 50,
                          borderColor: '#2F4050',
                          alignSelf: 'center',
                        }}>
                        <Image
                          source={iconR}
                          style={{
                            width: 20,
                            height: 20,

                            borderColor: '#fff',
                            alignSelf: 'center',
                          }}
                        />
                      </View>
                      <Text style={styles.ButtonText}>Reminders</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            } else if (showwhat1 == 'Proposal') {
              return (
                <View style={styles.moblieSec}>
                  <TouchableOpacity
                    style={[
                      styles.emailtoch,
                      {
                        backgroundColor:
                          showwhat1 == 'Message' ? '#2F5597' : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc1('Message')}>
                    <Text style={styles.ButtonText}>Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mobiletoch,
                      {
                        backgroundColor:
                          showwhat1 == 'Proposal' ? '#2F5597' : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc1('Proposal')}>
                    <Text style={styles.ButtonText}>Proposal</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mobiletoch,
                      {
                        backgroundColor:
                          showwhat1 == 'Signature' ? '#2F5597' : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc1('Signature')}>
                    <Text style={styles.ButtonText}>Signature Requests</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mobiletoch,
                      {
                        backgroundColor:
                          showwhat1 == 'Reminders' ? '#2F5597' : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc1('Reminders')}>
                    <Text style={styles.ButtonText}>Reminders</Text>
                  </TouchableOpacity>
                </View>
              );
            } else if (showwhat1 == 'Signature') {
              return (
                <View style={styles.moblieSec}>
                  <TouchableOpacity
                    style={[
                      styles.emailtoch,
                      {
                        backgroundColor:
                          showwhat1 == 'Message' ? '#2F5597' : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc1('Message')}>
                    <Text style={styles.ButtonText}>Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mobiletoch,
                      {
                        backgroundColor:
                          showwhat1 == 'Proposal' ? '#2F5597' : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc1('Proposal')}>
                    <Text style={styles.ButtonText}>Proposal</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mobiletoch,
                      {
                        backgroundColor:
                          showwhat1 == 'Signature' ? '#2F5597' : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc1('Signature')}>
                    <Text style={styles.ButtonText}>Signature Requests</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mobiletoch,
                      {
                        backgroundColor:
                          showwhat1 == 'Reminders' ? '#2F5597' : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc1('Reminders')}>
                    <Text style={styles.ButtonText}>Reminders</Text>
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
                          showwhat1 == 'Message' ? '#2F5597' : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc1('Message')}>
                    <Text style={styles.ButtonText}>Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mobiletoch,
                      {
                        backgroundColor:
                          showwhat1 == 'Proposal' ? '#2F5597' : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc1('Proposal')}>
                    <Text style={styles.ButtonText}>Proposal</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mobiletoch,
                      {
                        backgroundColor:
                          showwhat1 == 'Signature' ? '#2F5597' : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc1('Signature')}>
                    <Text style={styles.ButtonText}>Signature Requests</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mobiletoch,
                      {
                        backgroundColor:
                          showwhat1 == 'Reminders' ? '#2F5597' : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc1('Reminders')}>
                    <Text style={styles.ButtonText}>Reminders</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })()}
        </View>

        <View style={styles.subContainer}>
          {(() => {
            if (showwhat == 'Experience') {
              return (
                <View style={styles.moblieSec}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: wp(90),
                      // justifyContent: 'space-between',
                      marginBottom: 20,
                    }}>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch,
                        // {
                        //   backgroundColor:
                        //     showwhat == 'Experience' ? '#2F4050' : 'lightgray',
                        // },
                      ]}
                      onPress={() => showwhatfunc('Experience')}>
                      <View
                        style={{
                          width: 35,
                          height: 35,
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderRadius: 50,
                          borderColor: '#2F4050',
                          alignSelf: 'center',
                        }}>
                        <Image
                          source={iconC}
                          style={{
                            width: 20,
                            height: 20,

                            borderColor: '#fff',
                            alignSelf: 'center',
                          }}
                        />
                      </View>
                      <Text style={styles.ButtonText}>Incomplete (0)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        // {
                        //   backgroundColor:
                        //     showwhat == 'My Schools' ? '#2F5597' : '',
                        // },
                      ]}
                      onPress={() => showwhatfunc('My Schools')}>
                      <View
                        style={{
                          width: 35,
                          height: 35,
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderRadius: 50,
                          borderColor: '#2F4050',
                          alignSelf: 'center',
                        }}>
                        <Image
                          source={iconE}
                          style={{
                            width: 20,
                            height: 20,
                            borderColor: '#fff',
                            alignSelf: 'center',
                          }}
                        />
                      </View>
                      <Text style={styles.ButtonText}>Complete (0)</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            } else if (showwhat == 'My Schools') {
              return (
                <View style={styles.moblieSec}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: wp(90),
                      // justifyContent: 'space-between',
                      marginBottom: 20,
                    }}>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch,
                        // {
                        //   backgroundColor: showwhat == 'My Schools' ? '' : '',
                        // },
                      ]}
                      onPress={() => showwhatfunc('Experience')}>
                      <View
                        style={{
                          width: 35,
                          height: 35,
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderRadius: 50,
                          borderColor: '#2F4050',
                          alignSelf: 'center',
                        }}>
                        <Image
                          source={iconS}
                          style={{
                            width: 20,
                            height: 20,

                            borderColor: '#fff',
                            alignSelf: 'center',
                          }}
                        />
                      </View>
                      <Text style={styles.ButtonText}>Incomplete(0)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        // {
                        //   backgroundColor:
                        //     showwhat == 'My Schools' ? '#2F4050' : 'lightgray',
                        //   borderRadius: 10,
                        // },
                      ]}
                      onPress={() => showwhatfunc('My Schools')}>
                      <View
                        style={{
                          width: 35,
                          height: 35,
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderRadius: 50,
                          borderColor: '#2F4050',
                          alignSelf: 'center',
                        }}>
                        <Image
                          source={iconS}
                          style={{
                            width: 20,
                            height: 20,

                            borderColor: '#fff',
                            alignSelf: 'center',
                          }}
                        />
                      </View>

                      <Text style={styles.ButtonText}>Complete (0)</Text>
                    </TouchableOpacity>
                  </View>
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
                          showwhat == 'Experience' ? '#2F5597' : '',
                      },
                    ]}
                    onPress={() => showwhatfunc('Experience')}>
                    <Text style={styles.ButtonText}>Incomplete (0)</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mobiletoch,
                      {
                        backgroundColor:
                          showwhat == 'My Schools' ? '#2F5597' : 'lightgray',
                      },
                    ]}
                    onPress={() => showwhatfunc('My Schools')}>
                    <Text style={styles.ButtonText}>Complete (0)</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })()}

          {(() => {
            if (showwhat == 'Experience') {
              return (
                <ScrollView>
                  {/* <View style={styles.subContainer}> */}
                  <Text style={styles.subHead}> Results Not Found</Text>

                  {/* </View> */}
                </ScrollView>
              );
            } else {
              return (
                <ScrollView>
                  {/* <View style={styles.subContainer}> */}
                  <Text style={styles.subHead}>0 Results Found</Text>

                  {/* </View> */}
                </ScrollView>
              );
            }
          })()}
        </View>
        {/* </ImageBackground> */}
      </View>
    </SafeAreaView>
  );
};

export default Request;
const styles = StyleSheet.create({
  bgImg: {
    height: 480,
  },
  mainTab: {
    // backgroundColor: '#fff',
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'center',
    //  borderRadius: 50,
    // height: 120,
    marginTop: 20,
  },
  header: {
    fontSize: 28,
    color: '#000',
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 20,
    width: '40%',
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

  MessageContainer: {
    // backgroundColor: 'green',

    // height: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20,
    // marginBottom: 30,
    width: wp(90),
    // backgroundColor: 'red',
    flexDirection: 'row',
    // alignSelf: "center",
  },

  moblieSec: {
    // backgroundColor: 'green',

    // height: 20,
    borderRadius: 10,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20,
    // marginBottom: 30,
    width: wp(90),

    //  flexDirection: 'row',
    // alignSelf: "center",
  },

  emailtoch: {
    //  backgroundColor: "lightgray",
    width: wp(20),
    height: 60,
    borderRadius: 10,
    marginRight: wp(3),
    justifyContent: 'center',
    // borderRadius: 10,
  },
  ButtonText: {
    color: '#2F4050',
    textAlign: 'center',
    height: 20,
    fontSize: 10,
  },
  newRText: {
    color: '#2F4050',
    marginLeft: 0,
    alignSelf: 'center',
    fontSize: 12,
  },
  DarkButtonText: {
    color: '#fff',
    textAlign: 'center',
    height: 20,
    fontSize: 10,
  },
  mobiletoch: {
    // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
    width: wp(20),
    // marginLeft: wp(5),
    height: 60,
    //borderRadius: 10,
    justifyContent: 'center',
  },
  subContainer: {
    backgroundColor: '#fff',
    width: wp(95),
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    height: 250,
    //borderRadius: 20,
  },
  subHead: {
    fontSize: 20,
    color: '#000',
    marginTop: 50,
    // marginLeft: 20,
    //  textAlign:'center'
  },
});
