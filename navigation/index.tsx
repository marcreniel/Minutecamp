import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/Quiz";
import FeedScreen from "../components/generalFeed";

const Stack = createNativeStackNavigator(); 

function AppStack() {
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
            name="Quiz" 
            component={QuizScreen} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default AppStack;