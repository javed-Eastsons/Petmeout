import {
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeScreen from '../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';
import Splash from '../screens/Splash';
import Drawer from './Drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomHeader from '../Component/CustomHeader';
import { Color } from '../Style';
import { Provider } from 'react-redux';
import store from '../Redux/Store/index';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RegisterPet from '../screens/RegisterPet';
import Posts from '../screens/Posts';
import viewAllCategories from '../screens/viewAllCategories';
import AllPetsCategories from '../screens/AllPetsCategories';
import Profile from '../screens/profile';
import ProfilePosts from '../screens/ProfilePosts';
import profileGallery from '../screens/profileGallery';
import About from '../screens/About';
import PetStore from '../screens/PetStore';
import Notification from '../screens/Notification';
import ForgotPassword from '../screens/ForgotPassword';
import VerifyOTPForget from '../screens/VerifyOTPForget';
import CreateProfile from '../screens/CreateProfile';
import OwnerProfile from '../screens/OwnerProfile';
import productCategories from '../screens/productCategories';
import ProductList from '../screens/ProductList';
import ProductDetails from '../screens/ProductDetails';
import Cart from '../screens/Cart';
import Mating from '../screens/Mating';
import Vaccination from '../screens/Vaccination';
import BookVaccination from '../screens/BookVaccination';
import VaccinationChart from '../screens/VaccinationChart';
import { MenuProvider } from 'react-native-popup-menu';
import FriendsList from '../screens/FriendsList';
import Adaptation from '../screens/Adaptation';
import AdaptationDetails from '../screens/AdaptationDetails';
import MatingDetails from '../screens/MatingDetails';
import Chat from '../screens/Chat';
enableScreens();

// const SignStack = createStackNavigator();

// function SignInScreen() {
//   return (
//     <SignStack.Navigator
//     //  initialRouteName='AuthCheck'
//     >
//       <Stack.Screen
//         name="SplashScreen"
//         component={Splash}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{
//           title: 'Chats',
//           headerShown: false,
//           headerStyle: {
//             backgroundColor: '#e85b3d',
//           },

//           headerTintColor: '#fff',
//           headerTitleAlign: 'center',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       />
//       <Stack.Screen
//         name="ClientInfo"
//         component={ClientInfo}
//         options={{
//           title: 'YourProfle',

//           headerStyle: {
//             backgroundColor: '#e85b3d',
//           },

//           headerShown: false,
//           headerTintColor: '#fff',
//           headerTitleAlign: 'center',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       />
//     </SignStack.Navigator>
//   );
// }

const Drawer3 = createDrawerNavigator();

function MyDrawer3({ navigation, route }) {
  return (
    <Drawer3.Navigator
      defaultStatus="closed"
      screenOptions={{
        //  drawerPosition: 'left',
        headerShown: false,
        // drawerActiveBackgroundColor: '#FAFAFC',
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
        name="Chat"
        component={ChatScreenStack}
        
      />
      {/* <Drawer3.Screen
        navigation={navigation}
        name="MyInfo"
        component={MyInfo}
      /> */}
      {/* <Drawer3.Screen
        navigation={navigation}
        name="FileCabinet"
        component={FileCabinet}
      /> */}
      {/* <Drawer3.Screen
        navigation={navigation}
        name="Manager"
        component={Manager}
      /> */}
      {/* <Drawer.Screen name="Home2" component={MainNavigation2} /> */}

      {/* <Drawer.Screen name="Home" component={MainNavigation1} /> */}
    </Drawer3.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        // position:'absolute',
        bottom: 0,
        alignSelf: 'center',
        borderTopColor: '#E5E5E5',
        borderTopWidth: 1,
        width: wp(112),
        //   justifyContent: 'space-between',
        backgroundColor: '#fff',
        height: 60,
        color: '#fff',
        paddingHorizontal: 22
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        let showlabel = '';
        let iconNm = '';

        if (label == 'Dashboard') {
          showlabel = 'Home';
          // iconNm = require('../Assets/img/icons/home.png');

          {
            isFocused
              ? (iconNm = require('../Assets/img/icons/pawprint-yellow.png'))
              : (iconNm = require('../Assets/img/icons/pawprint-black.png'));
          }
        }

        if (label == 'ClientInfo') {
          showlabel = 'Friends';
          // iconNm = require('../Assets/img/icons/group.png');

          {
            isFocused
              ? (iconNm = require('../Assets/img/icons/friends-yellow.png'))
              : (iconNm = require('../Assets/img/icons/friends.png'));
          }
        }

        if (label == 'FileCabinet') {
          showlabel = 'Store';
          // iconNm = require('../Assets/img/icons/profile-user.png');
          {
            isFocused
              ? (iconNm = require('../Assets/img/icons/store-yellow.png'))
              : (iconNm = require('../Assets/img/icons/store-black.png'));
          }
        }
        if (label == 'Requests') {
          showlabel = 'Me';
          // iconNm = require('../Assets/img/icons/profile-user.png');

          {
            isFocused
              ? (iconNm = require('../Assets/img/icons/user-yellow.png'))
              : (iconNm = require('../Assets/img/icons/user-black.png'));
          }
        }
        // if (label == "Tab3") {
        //   //showlabel = "Home";
        //   iconNm = require("../Assets/Bookings.png");

        //   // {
        //   //   isFocused ?
        //   //     iconNm = require('../Assets/bell.png')
        //   //     :
        //   //     iconNm = require('../Assets/bell.png')
        //   // }
        // }

        // if (label == "FirstStacknavigation") {
        //   //showlabel = "Home";
        //   iconNm = require("../Assets/Settings.png");

        //   // {
        //   //   isFocused ?
        //   //     iconNm = require('../Assets/bell.png')
        //   //     :
        //   //     iconNm = require('../Assets/bell.png')
        //   // }
        // }

        // if (label == "FirstStacknavigation") {
        //   //showlabel = "Home";
        //   iconNm = require("../Assets/Settings.png");

        //   // {
        //   //   isFocused ?
        //   //     iconNm = require('../Assets/bell.png')
        //   //     :
        //   //     iconNm = require('../Assets/bell.png')
        //   // }
        // }

        // if (label == "bell") {
        //     showlabel = "Notification";
        //     iconNm= label;
        // }

        // if (label == "envelope") {
        //     showlabel = "Contact us";
        //     iconNm = label
        // }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: 'center' }}
            key={route.key}>
            {/* <Icon size={24} name={iconNm} color={isFocused ? '#FFFFFF' : '#d3d3d3'} />  */}
            <View
              style={{
                // flexDirection: 'row',
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                // borderTopWidth: isFocused ? 2 : 0,
                borderColor: '#4CAF50',
                borderBottomWidth: isFocused ? 2 : 0,
              }}>
              <Image source={iconNm} style={{ width: showlabel == "Posts" ? 21 : showlabel == "Notify" ? 25 : 22, height: showlabel == "Notify" ? 25 : 21 }} />

              <Text
                style={{
                  alignSelf: 'center',
                  color: isFocused ? '#4CAF50' : '#000',
                  // borderBottomWidth: 2,
                  // borderBottomColor: isFocused ? Color.geen : Color.white,
                  // paddingBottom: 5,
                  fontSize: 9,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                {showlabel}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainNavigation1() {
  return (
    <Tab.Navigator
      // activeColor="#2F4050"
      // inactiveColor="#3e2465"
      options={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Dashboard"
        component={HomeScreenStack}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />
      <Tab.Screen
        name="FileCabinet"
        component={productCategories}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />
      <Tab.Screen
        name="ClientInfo"
        component={FriendsList}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />

      <Tab.Screen
        name="Requests"
        component={OwnerProfile}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />
    </Tab.Navigator>
  );
}

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
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Posts"
        component={Posts}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerifyOTPForget"
        component={VerifyOTPForget}
        options={{
          headerShown: false,
        }}
      />

    </SignStack.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeScreenStack() {
  return (
    <HomeStack.Navigator
    //  initialRouteName='AuthCheck'
    >
      <Stack.Screen
        name="Posts"
        component={Posts}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterPet"
        component={RegisterPet}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="viewAllCategories"
        component={viewAllCategories}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="productCategories"
        component={productCategories}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Mating"
        component={Mating}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MatingDetails"
        component={MatingDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Vaccination"
        component={Vaccination}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Adaptation"
        component={Adaptation}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="AdaptationDetails"
        component={AdaptationDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookVaccination"
        component={BookVaccination}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VaccinationChart"
        component={VaccinationChart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllPetsCategories"
        component={AllPetsCategories}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfilePosts"
        component={ProfilePosts}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profileGallery"
        component={profileGallery}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PetStore"
        component={PetStore}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OwnerProfile"
        component={OwnerProfile}
        options={{
          headerShown: false,
        }}
      />

    </HomeStack.Navigator>
  );
}

const ChatStack = createStackNavigator();

function ChatScreenStack() {
  return (
    <ChatStack.Navigator
    //  initialRouteName='AuthCheck'
    >
      {/* <Stack.Screen
        name="OwnerProfile"
        component={OwnerProfile}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />


    </ChatStack.Navigator>
  );
}

// const RequestStack = createStackNavigator();

// function RequestScreenStack() {
//   return (
//     <RequestStack.Navigator
//     //  initialRouteName='AuthCheck'
//     >
//       <Stack.Screen
//         name="Request"
//         component={Request}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="CreateNewAction"
//         component={CreateNewAction}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="ContactUs"
//         component={ContactUs}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="ViewRequest"
//         component={ViewRequest}
//         options={{
//           headerShown: false,
//         }}
//       />

//     </RequestStack.Navigator>
//   );
// }
// const PaymentStack = createStackNavigator();

// function PaymentScreenStack() {
//   return (
//     <PaymentStack.Navigator
//     //  initialRouteName='AuthCheck'
//     >
//        <Stack.Screen
//         name="Payments"
//         component={Payments}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="InvoiceView"
//         component={InvoiceView}
//         options={{
//           header: () => <CustomHeader />, // Include the custom header
//         }}
//       />
//       <Stack.Screen
//         name="InvoiceDetails"
//         component={InvoiceDetails}
//         options={{
//           header: () => <CustomHeader />, // Include the custom header
//         }}
//       />
//       <Stack.Screen
//         name="ViewOrder"
//         component={ViewOrder}
//         options={{
//           header: () => <CustomHeader />, // Include the custom header
//         }}
//       />


//     </PaymentStack.Navigator>
//   );
// }


const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MenuProvider>

          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="home" component={SignInScreen} />
            <Stack.Screen name="Auth" component={MyDrawer3} />
            {/* <Stack.Screen name="chat" component={ChatScreenStack} /> */}

            {/* <Stack.Screen name="home" component={MyDrawer2} /> */}
          </Stack.Navigator>
        </MenuProvider>
      </NavigationContainer>
    </Provider>
  );
}
export default MainNavigation;
