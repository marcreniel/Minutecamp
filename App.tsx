// App.js
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import VideoPost from "./components/VideoPost";
import HomeScreen from "./HomeScreen";
import QuizScreen from "./Quiz";
import FeedScreen from "./components/hackathonFeed";
import TaxesFeed from "./components/taxesFeed";
import ExcelFeed from "./components/excelFeed";
import Excel2Feed from "./components/excel2Feed";
import PythonFeed from "./components/pythonFeed";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Feed"
            component={FeedScreen}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="TaxesFeed"
            component={TaxesFeed}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExcelFeed"
            component={ExcelFeed}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Excel2Feed"
            component={Excel2Feed}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="PythonFeed"
            component={PythonFeed}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
