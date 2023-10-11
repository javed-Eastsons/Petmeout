import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import HomeScreen from '../screens/Home';
import Manager from '../screens/Manager';



function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer1() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Manager" component={Manager} />
    </Drawer.Navigator>
  );
}


const HomeStack = createBottomTabNavigator();
function MainNavigation1() {
  return (
    <HomeStack.Navigator
      initialRouteName="ClientLanding"
      tabBar={(props) => <MyTabBar {...props} />}
    >
      {/* <Stack.Screen
        name="ClientLandingBefore"
        component={ClientLandingBefore}
        options={{
          title: 'AuthCheck',
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
      /> */}

      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Bookmark",

          headerStyle: {
            backgroundColor: "#e85b3d",
          },

          headerShown: false,
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <HomeStack.Screen
        name="Manager"
        component={Manager}
        options={{
          title: "Bookmark",

          headerStyle: {
            backgroundColor: "#e85b3d",
          },

          headerShown: false,
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

    </HomeStack.Navigator>
  );
}
function MyDrawer({ navigation, route }) {
  return (
    <Drawer.Navigator
      defaultStatus="closed"
      screenOptions={{
        //  drawerPosition: 'left',
        headerShown: false,
        drawerActiveBackgroundColor: "#FAFAFC",
      }}
      //initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={MainNavigation1} />
      {/* <Drawer.Screen name="Home2" component={MainNavigation2} /> */}

      {/* <Drawer.Screen name="Home" component={MainNavigation1} /> */}
    </Drawer.Navigator>
  );
}

function MainNavigation() {
    return (
    //   <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="home" component={MyDrawer} />
            {/* <Stack.Screen name="home" component={MyDrawer2} /> */}
  
  
            {/* <Stack.Screen name="AuthCheck" component={AuthCheck} />  */}
          </Stack.Navigator>
        </NavigationContainer>
    //   </Provider>
    );
  }
  
  export default MainNavigation;
  