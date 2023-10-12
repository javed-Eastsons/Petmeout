/**
 * @format
 */

// Rest of your code

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import MainNavigation from './src/Navigation/Navigation';
import HomeScreen from './src/screens/Home';

AppRegistry.registerComponent(appName, () => MainNavigation);
