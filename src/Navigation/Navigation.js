// import React from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Button,
// } from 'react-native';
// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>
//         Thank you for being our client since 2023
//       </Text>
//       <View style={styles.slideContainer}>
//         <ScrollView contentContainerStyle={{padding: 5}} horizontal={true}>
//           <TouchableOpacity
//             style={styles.cardSlider}
//             // onPress={toggleModal}
//           >
//             <View style={styles.cardShadow}>
//               <Image
//                 source={require('../Assets/img/gdb-img1.png')}
//                 style={styles.Slidericons}
//               />
//             </View>
//             <View>
//               <Text style={styles.postText}>Need Payroll?</Text>
//             </View>
//             <View style={{padding: 5}}>
//               <Text numberOfLines={3} style={styles.sliderText}>
//                 We Can Help You With Your Company’s Payroll!
//               </Text>
//               <Text style={styles.info}>Contact Us For More Info!</Text>
//               <TouchableOpacity style={styles.btn}>
//                 <Text style={{color: '#fff'}}>987654</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.cardSlider, styles.shadowPropSlider]}
//             // onPress={toggleModal}
//           >
//             <View style={styles.cardShadow}>
//               <Image
//                 source={require('../Assets/img/gdb-img2.png')}
//                 style={styles.Slidericons}
//               />
//             </View>
//             {/* <Image source={require('../Assets/OurTutors.png')}
//                                 style={styles.Slidericons}
//                             /> */}
//             <Text style={styles.postText}>Bring a friend!</Text>
//             <View style={{padding: 5}}>
//               <Text numberOfLines={3} style={styles.sliderText}>
//                 Earn $50 In Your Next Order By Referring a{'\n'} Friend To Us By
//                 Using The Code FRIEND50OFF
//               </Text>
//               <Text style={styles.info}>Call Us To Learn More!</Text>
//               <TouchableOpacity style={styles.btn}>
//                 <Text style={{color: '#fff'}}>987654</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.cardSlider, styles.shadowPropSlider]}
//             // onPress={toggleModal}
//           >
//             <View style={styles.cardShadow}>
//               <Image
//                 source={require('../Assets/img/gdb-img3.png')}
//                 style={styles.Slidericons}
//               />
//             </View>
//             {/* <Image source={require('../Assets/OurService.png')}
//                                 style={styles.Slidericons}
//                             /> */}
//             <Text style={styles.postText}>
//               You Still Haven’t{'\n'} File Your Taxes?
//             </Text>
//             <View style={{padding: 5}}>
//               <Text numberOfLines={3} style={styles.sliderText}>
//                 Schedule Your Virtual Tax Return Now!
//               </Text>
//               <Text style={styles.info}>Call Us For More Information!</Text>
//               <TouchableOpacity style={styles.btn}>
//                 <Text style={{color: '#fff'}}>987654</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.cardSlider, styles.shadowPropSlider]}
//             // onPress={toggleModal}
//           >
//             <View style={styles.cardShadow}>
//               <Image
//                 source={require('../Assets/img/gdb-img4.png')}
//                 style={styles.Slidericons}
//               />
//             </View>
//             {/* <Image source={require('../Assets/MyActivities.png')}
//                                 style={styles.Slidericons}
//                             /> */}
//             <Text style={styles.postText}>Incorporations</Text>
//             <View style={{padding: 5}}>
//               <Text numberOfLines={3} style={styles.sliderText}>
//                 Create A New Company Today!
//               </Text>
//               <Text style={styles.info}>
//                 Learn The Benefits of Having A US Company
//               </Text>
//               <TouchableOpacity style={styles.btn}>
//                 <Text style={{color: '#fff'}}>987654</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.cardSlider, styles.shadowPropSlider]}
//             // onPress={toggleModal}
//           >
//             <View style={styles.cardShadow}>
//               <Image
//                 source={require('../Assets/img/gdb-img5.png')}
//                 style={styles.Slidericons}
//               />
//             </View>
//             {/* <Image source={require('../Assets/Promotion.png')}
//                                 style={styles.Slidericons}
//                             /> */}
//             <Text style={styles.postText}>Wanna Move To The{'\n'} USA? </Text>
//             <View style={{padding: 5}}>
//               <Text numberOfLines={3} style={styles.sliderText}>
//                 Franchise With Us!
//               </Text>
//               <Text style={styles.info}>Contact Us For More Info!</Text>
//               <TouchableOpacity style={styles.btn}>
//                 <Text style={{color: '#fff'}}>987654</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.cardSlider, styles.shadowPropSlider]}
//             // onPress={toggleModal}
//           >
//             <View style={styles.cardShadow}>
//               <Image
//                 source={require('../Assets/img/gdb-img6.png')}
//                 style={styles.Slidericons}
//               />
//             </View>
//             {/* <Image source={require('../Assets/Promotion.png')}
//                                 style={styles.Slidericons}
//                             /> */}
//             <Text style={styles.postText}>Need Bookkeeping? </Text>
//             <View style={{padding: 5}}>
//               <Text numberOfLines={3} style={styles.sliderText}>
//                 Add A Bookkeeping Plan To Your Business!
//               </Text>
//               <Text style={styles.info}>Contact Us TO Book It!</Text>
//               <TouchableOpacity style={styles.btn}>
//                 <Text style={{color: '#fff'}}>987654</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     width: '95%',
//   },
//   heading: {
//     fontSize: 22,
//     color: '#676A6C',
//     marginTop: 20,
//     fontWeight: '600',
//   },
//   slideContainer: {
//     backgroundColor: '#fff',
//     marginLeft: 20,
//     height: 420,
//     opacity: 2,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   Slidericons: {
//     width: '70%',
//     height: 150,
//     // marginTop: 10,
//     // marginLeft: 20,
//     alignSelf: 'center',
//   },
//   postText: {
//     alignSelf: 'center',
//     color: '#1F3E50',
//     fontSize: 20,
//     marginTop: 10,
//   },
//   sliderText: {
//     color: '#9BB33D',
//     fontSize: 14,
//     alignSelf: 'center',
//     marginTop: 10,
//   },
//   cardSlider: {
//     width: 300,
//     marginTop: 50,
//   },
//   info: {
//     color: '#1F3E50',
//     alignSelf: 'center',
//     fontSize: 15,
//     marginTop: 10,
//   },
//   btn: {
//     width: '30%',
//     alignSelf: 'center',
//     marginBottom: 30,
//     marginTop: 10,
//     backgroundColor: '#94B520',
//     borderRadius: 30,
//     padding: 10,
//     alignItems: 'center',
//   },
// });

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/Home';
import ClientInfo from '../screens/ClientInfo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {enableScreens} from 'react-native-screens';
import Splash from '../screens/Splash';
import Drawer from './Drawer';
import Request from '../screens/Request';
import MyInfo from '../screens/MyInfo';
import Payments from '../screens/Payments';
import FileCabinet from '../screens/FileCabinet';
import Manager from '../screens/Manager';
enableScreens();

const SignStack = createStackNavigator();

function SignInScreen() {
  return (
    <SignStack.Navigator
    //  initialRouteName='AuthCheck'
    >
      <Stack.Screen
        name="SplashScreen"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Chats',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#e85b3d',
          },

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ClientInfo"
        component={ClientInfo}
        options={{
          title: 'YourProfle',

          headerStyle: {
            backgroundColor: '#e85b3d',
          },

          headerShown: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </SignStack.Navigator>
  );
}

const Drawer3 = createDrawerNavigator();

function MyDrawer3({navigation, route}) {
  return (
    <Drawer3.Navigator
      defaultStatus="closed"
      screenOptions={{
        //  drawerPosition: 'left',
        headerShown: false,
        drawerActiveBackgroundColor: '#FAFAFC',
      }}
      //initialRouteName="Home"
      drawerContent={props => <Drawer {...props} />}>
      <Drawer3.Screen
        navigation={navigation}
        name="Home"
        component={MainNavigation1}
      />
         <Drawer3.Screen
        navigation={navigation}
        name="Payments"
        component={Payments}
      />
       <Drawer3.Screen
        navigation={navigation}
        name="FileCabinet"
        component={FileCabinet}
      />
       <Drawer3.Screen
        navigation={navigation}
        name="Manager"
        component={Manager}
      />
      {/* <Drawer.Screen name="Home2" component={MainNavigation2} /> */}

      {/* <Drawer.Screen name="Home" component={MainNavigation1} /> */}
    </Drawer3.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

function MainNavigation1() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={HomeScreen} />
      <Tab.Screen name="ClientInfo" component={ClientInfo} />
      <Tab.Screen name="MyInfo" component={MyInfo} />
      <Tab.Screen name="Requests" component={Request} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="home" component={MyDrawer3} />
        {/* <Stack.Screen name="home" component={MyDrawer2} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainNavigation;
