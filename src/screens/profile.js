import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet,RefreshControl } from 'react-native';
import { ProfileBody, ProfileButtons } from '../Component/ProfileBody';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomTabView from '../Component/BottomTabView';
import { Loader } from '../Component/Loader';

const Profile = ({ route, navigation }) => {
  const [petDetails, setPetDetails] = useState(route?.params?.petDetails || null);
  const [loader, setLoader] = useState(false);
 
  // Update petDetails when route.params changes
  useEffect(() => {
    setLoader(true)
    if (route?.params?.petDetails) {
      setPetDetails(route.params.petDetails);
      console.log('Updated petDetails:', route.params.petDetails);
      setLoader(false)
    } else {
      // Handle the case where petDetails is not available
      console.log('Pet details not available in route params');
    }
  }, [route.params?.petDetails]);

  // Debugging to check the state

  console.log('petDetailspetDetailspetDetails1111', petDetails)
  // Generate circles for the story highlights section
  const circles = [];
  const numberOfCircles = 10;
  for (let index = 0; index < numberOfCircles; index++) {
    circles.push(
      <View key={index} style={styles.circleContainer}>
        {index === 0 ? (
          <View style={styles.addCircle}>
            <Entypo name="plus" style={styles.addIcon} />
          </View>
        ) : (
          <View style={styles.defaultCircle} />
        )}
      </View>
    );
  }

  if (!petDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Loader flag={loader} />
      <View style={styles.profileContainer}>
        <ProfileBody
          name={petDetails.pet_name}
          accountName={petDetails.pet_name}
          profileImage={petDetails.image_path}
          followers="3.6M"
          following={petDetails.friend_count}
          post={petDetails.No_of_Pets_post}
          petDetails={petDetails}
        />
        {/* <ProfileButtons
          id={0}
          name="Mr Peobody"
          accountName="mr_peobody"
          profileImage={require('../Assets/userProfile.png')}
        /> */}
      </View>
      {/* Uncomment the following section if needed
      <View>
        <Text style={styles.storyHighlightsText}>Story Highlights</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}>
          {circles}
        </ScrollView>
      </View> */}
      <BottomTabView petDetails={petDetails} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  profileContainer: {
    width: '100%',
    padding: 10,
  },
  circleContainer: {
    marginHorizontal: 5,
  },
  addCircle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 1,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    fontSize: 40,
    color: 'black',
  },
  defaultCircle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'black',
    opacity: 0.1,
  },
  storyHighlightsText: {
    padding: 10,
    letterSpacing: 1,
    fontSize: 14,
  },
  scrollView: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default Profile;
