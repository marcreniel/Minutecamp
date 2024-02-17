// SimpleScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const QuizScreen = ({ navigation }: { navigation: any }) => {
  const handleButtonPress = () => {
    // Add your logic for the button press here
    console.log("Button Pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Simple Screen</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textContent}>
          Welcome to this simple screen! This is some text content.
        </Text>
        <Button
          title="Press me"
          onPress={handleButtonPress}
          color="#3498db" // Button color (you can customize)
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1', // Background color
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default QuizScreen;
