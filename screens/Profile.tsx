// ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { log } from "../logger";
import { RootStackScreenProps } from "../types";
import useStoreUserEffect from "../hooks/useStoreUserEffect";

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const { getToken, signOut } = useAuth();
  const { user } = useUser();

  const handleButtonPress = async () => {
    console.log("Sign Out Button Pressed");
    try {
      await signOut();
    } catch (err: any) {
      log("Error:> " + err?.status || "");
      log("Error:> " + err?.errors ? JSON.stringify(err.errors) : err);
    }  
  };

  const handleEditProfilePress = () => {
    // Add your logic for the edit-profile button press here
    console.log("Edit Profile Button Pressed");
    // You may want to add navigation logic here to navigate to the edit-profile screen
  };

  const completedCourses = [
    'Course 1: Introduction to React',
    'Course 2: Advanced JavaScript',
    'Course 3: Mobile App Development',
    // Add more completed courses as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText]}>Profile Screen</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.textContent]}>Name: John Doe</Text>
        <Text style={[styles.completedCoursesText]}>Completed Courses:</Text>
        <FlatList
          data={completedCourses}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.courseItemContainer}>
              <Feather name="check-circle" size={24} color="black" />
              <Text style={[styles.courseItem]}>{item}</Text>
            </View>
          )}
        />

        <View style={styles.editProfileButtonContainer}>
        <Button
          title="Edit Profile"
          onPress={handleEditProfilePress}
          color="#3498db" // Blue color for the edit-profile button (you can customize)
        />
      </View>

        <Button
          title="Sign Out"
          onPress={handleButtonPress}
          color="#e74c3c" // Red color for the sign-out button (you can customize)
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF', // Light background color
  },

  editProfileButtonContainer: {
    marginBottom: 10,
  },
  
  titleContainer: {
    paddingTop: 40, // Add padding to the top
    justifyContent: 'flex-start', // Align along the primary axis (vertically)
    alignItems: 'flex-start', // Align along the cross-axis (horizontally)
    marginBottom: 20,
  },

  titleText: {
    // fontFamily: 'Itim_400Regular',
    fontSize: 45, // Larger title font size
    fontWeight: 'bold',
    color: '#C2D4C2', // Blue title color
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  textContent: {
    fontSize: 25, // Larger general text font size
    marginBottom: 20, // Increased margin for better spacing
    justifyContent: 'flex-start', // Align along the primary axis (vertically)
    alignItems: 'flex-start', // Align along the cross-axis (horizontally)
    color: '#555', // Darker text color
  },
  completedCoursesText: {
    fontSize: 30, // Larger font size for completed courses
    marginBottom: 50, // Increased margin for better spacing
    justifyContent: 'flex-start', // Align along the primary axis (vertically)
    alignItems: 'flex-start', // Align along the cross-axis (horizontally)
    color: '#27ae60', // Green color for completed courses
  },
  courseItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  courseItem: {
    fontSize: 20, // Font size for each course item
    marginLeft: 10, // Margin between the check mark and course text
    color: '#555', // Darker text color for course items
  },
});

export default ProfileScreen;
