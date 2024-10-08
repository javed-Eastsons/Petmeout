import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfilePosts from '../screens/ProfilePosts';
import AllPetsCategories from '../screens/AllPetsCategories';
import viewAllCategories from '../screens/viewAllCategories';
import profileGallery from '../screens/profileGallery';
import About from '../screens/About';
import profileFriends from '../screens/profileFriends';

const BottomTabView = ({petDetails}) => {
  const Tab = createMaterialTopTabNavigator();
console.log(petDetails,'petDetailspetDetailspetDetails')
  let squares = [];
  let numberOfSquare = 7;

  for (let index = 0; index < numberOfSquare; index++) {
    squares.push(
      <View key={index}>
        <View
          style={{
            width: 130,
            height: 150,
            marginVertical: 0.5,
            backgroundColor: 'black',
            opacity: 0.1,
          }}></View>
      </View>,
    );
  }

  const Posts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
          {squares}
        </View>
      </ScrollView>
    );
  };
  const Video = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
          {squares}
        </View>
      </ScrollView>
    );
  };

  const Tags = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
          {squares}
        </View>
      </ScrollView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          height: 1.5,
        },
        tabBarIcon: ({ focused, colour }) => {
          let iconName;
          if (route.name === 'Posts') {
            iconName = focused ? 'apps-sharp' : 'apps-sharp';
            colour = focused ? 'black' : 'gray';
          } else if (route.name === 'Video') {
            iconName = focused ? 'image' : 'image-outline';
            colour = focused ? 'black' : 'gray';
          } else if (route.name === 'Tags') {
            iconName = focused ? 'person' : 'person-outline';
            colour = focused ? 'black' : 'gray';
          } else if (route.name === 'About') {
            iconName = focused ? 'reorder-four' :'reorder-four-outline';
            colour = focused ? 'black' : 'gray';
          }

          return <Ionic name={iconName} color={colour} size={22} /> ;
        },
      })}>
      <Tab.Screen name="Posts" component={ProfilePosts} initialParams={{ petDetails: petDetails }}/>
      <Tab.Screen name="Video" component={profileGallery} initialParams={{ petDetails: petDetails }}/>
      <Tab.Screen name="Tags" component={profileFriends} initialParams={{ petDetails: petDetails }}/>
      <Tab.Screen name="About" component={About } initialParams={{ petDetails: petDetails }}/>
    </Tab.Navigator>
  );
};

export default BottomTabView;