/**
 * @format
 */

// Rest of your code

import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import MainNavigation from './src/Navigation/Navigation';
import HomeScreen from './src/screens/Home';
import { Settings } from 'react-native-fbsdk-next';
import firebase from '@react-native-firebase/app';
import messaging from "@react-native-firebase/messaging";

// Optional: Firebase initialization check
// if (!firebase.apps.length) {

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  

firebase.initializeApp();
// }
Settings.initializeSDK();
AppRegistry.registerComponent(appName, () => MainNavigation);
