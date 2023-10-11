import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import ClientInfo from './src/screens/ClientInfo';
import Manager from './src/screens/Manager';
import Payments from './src/screens/Payments';
import FileCabinet from './src/screens/FileCabinet';
import Request from './src/screens/Request';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import { createDrawerNavigator } from '@react-navigation/drawer';
import "react-native-gesture-handler";
import MyDrawer from './src/Navigation/Navigation';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <MyDrawer/>
    </NavigationContainer>
  );
}

export default App;