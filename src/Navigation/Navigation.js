import {
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomHeader from '../Component/CustomHeader';

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

function MyDrawer3({navigation, route}) {
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

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        // position:'absolute',
        bottom: 0,
        alignSelf: 'center',
        borderTopColor: '#E5E5E5',
        borderTopWidth: 1,
        width: wp('110%'),
        backgroundColor: '#2F4050',
        height: 60,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
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
              ? (iconNm = require('../Assets/img/icons/home.png'))
              : (iconNm = require('../Assets/img/icons/home-grey.png'));
          }
        }

        if (label == 'ClientInfo') {
          showlabel = 'Clients';
          // iconNm = require('../Assets/img/icons/group.png');

          {
            isFocused
              ? (iconNm = require('../Assets/img/icons/group.png'))
              : (iconNm = require('../Assets/img/icons/group-grey.png'));
          }
        }

        if (label == 'MyInfo') {
          showlabel = 'Profile';
          // iconNm = require('../Assets/img/icons/profile-user.png');

          {
            isFocused
              ? (iconNm = require('../Assets/img/icons/profile-user.png'))
              : (iconNm = require('../Assets/img/icons/profile-user-grey.png'));
          }
        }
        if (label == 'Requests') {
          showlabel = 'Request';
          // iconNm = require('../Assets/img/icons/profile-user.png');

          {
            isFocused
              ? (iconNm = require('../Assets/img/icons/request.png'))
              : (iconNm = require('../Assets/img/icons/request-grey.png'));
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
            style={{flex: 1, justifyContent: 'center'}}
            key={route.key}>
            {/* <Icon size={24} name={iconNm} color={isFocused ? '#FFFFFF' : '#d3d3d3'} />  */}
            <View
              style={{
                // flexDirection: 'row',
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Image source={iconNm} style={{width: 25, height: 25}} />

              <Text
                style={{
                  alignSelf: 'center',
                  color: isFocused ? '#fff' : '#A7B1C2',
                  fontSize: 10,
                  fontWeight: 'bold',
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
        component={HomeScreen}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />
      <Tab.Screen
        name="ClientInfo"
        component={ClientInfo}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />
      <Tab.Screen
        name="MyInfo"
        component={MyInfo}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />
      <Tab.Screen
        name="Requests"
        component={Request}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />
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
