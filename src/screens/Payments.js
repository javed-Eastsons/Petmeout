import React, {useState} from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CustomHeader from '../Component/CustomHeader';
import CustomBottomTab from '../Component/CustomBottomTab';

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
  const showwhatfunc = data => {
    setshowwhat(data);
    console.log(data);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader />
      <View style={{height: hp(80)}}>
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
                        showwhat == 'Experience' ? '#2F4050' : 'lightgray',
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
                        showwhat == 'My Schools' ? '#2F5597' : 'lightgray',
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
                        showwhat == 'Reviews' ? '#2F5597' : 'lightgray',
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
                        showwhat == 'Experience' ? '#2F5597' : 'lightgray',
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
                        showwhat == 'My Schools' ? '#2F4050' : 'lightgray',
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
                        showwhat == 'Reviews' ? '#2F5597' : 'lightgray',
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
                        showwhat == 'Experience' ? '#2F5597' : 'lightgray',
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
                        showwhat == 'My Schools' ? '#2F5597' : 'lightgray',
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
                        showwhat == 'Reviews' ? '#2F4050' : 'lightgray',
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
                <Text style={styles.subHead}>Pending Invoices (0)</Text>
                <FlatList
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
                />
              </View>
            );
          } else if (showwhat == 'My Schools') {
            return (
              <View style={styles.subContainer}>
                <Text style={styles.subHead}>Paid Invoices (0)</Text>
                <FlatList
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
                />
              </View>
            );
          } else {
            return (
              <View style={styles.subContainer}>
                <Text style={styles.subHead}>Plan</Text>
                <FlatList
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
                />
              </View>
            );
          }
        })()}
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
    backgroundColor: '#fff',
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
    backgroundColor: '#2F4050',
    //  textAlign:'center'
  },
});
