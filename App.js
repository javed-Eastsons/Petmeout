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



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Request" component={Request} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;