import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { log } from "../logger";
import { RootStackScreenProps } from "../types";
import useStoreUserEffect from "../hooks/useStoreUserEffect";

const ProfileScreen = ({ navigation }: { navigation: any }) => {
    // Add your logic for the sign-out button press here
  const { getToken, signOut } = useAuth();
  const { user } = useUser();

  const [inProgressCourses] = useState([
    'Course 4: React Native',
    'Course 5: Node.js',  
    'Course 6: MongoDB'
  ]);

  const completedCourses = [
    'Course 1: Introduction to React',
    'Course 2: Advanced JavaScript',
    'Course 3: Mobile App Development'
  ];
  
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

  return (
    <View style={styles.container}>

<View style={styles.titleContainer}>
        <Text style={[styles.titleText]}>Profile Screen</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.textContent]}>Name: John Doe</Text>

      {/* New Courses in Progress Section */}
      <Text style={[styles.inProgressCoursesText]}>Courses in Progress:</Text>  
      <FlatList
        data={inProgressCourses}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.courseItemContainer}>
            <Ionicons name="hourglass" size={24} color="black" />
            <Text style={[styles.courseItem]}>{item}</Text>
          </View>
        )}
      />

      {/* Completed Courses Section */}
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
            color="#3498db" 
          />
        </View>
        
        <Button 
          title="Sign Out"
          onPress={handleButtonPress}
          color="#e74c3c" 
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF' 
  },
  editProfileButtonContainer: {
    marginBottom: 10,
  },
  titleContainer: {
    paddingTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#C2D4C2',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  textContent: {
    fontSize: 25,
    marginBottom: 20, 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: '#555',
  },
  completedCoursesText: {
    fontSize: 30,
    marginBottom: 50,
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',
    color: '#27ae60',
  },
  inProgressCoursesText: {
    fontSize: 30,
    marginBottom: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
    color: '#f1c40f'
  },
  courseItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  courseItem: {
    fontSize: 20,
    marginLeft: 10, 
    color: '#555',
  }
});

export default ProfileScreen;