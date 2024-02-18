import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/Quiz";
import FeedScreen from "../components/generalFeed";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import VerifyCodeScreen from "../screens/VerifyCodeScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { ClerkLoaded, useUser } from "@clerk/clerk-expo";

const Stack = createNativeStackNavigator(); 

function AppStack() {
  const { isSignedIn } = useUser();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <ClerkLoaded>
            <Stack.Navigator>
                {isSignedIn ? (
                <>
                    <Stack.Screen
                        name="MyProfile"
                        /*@ts-ignore*/
                        component={MyProfileScreen}
                        options={{ title: "MyProfile" }}
                    />
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
                </>
                ) : (
                <>
                    <Stack.Screen
                    name="SignUp"
                    /*@ts-ignore*/
                    component={SignUpScreen}
                    options={{ title: "Sign Up" }}
                    />
                    <Stack.Screen
                    name="SignIn"
                    /*@ts-ignore*/
                    component={SignInScreen}
                    options={{ title: "Sign In" }}
                    />
                    <Stack.Screen
                    name="VerifyCode"
                    /*@ts-ignore*/
                    component={VerifyCodeScreen}
                    options={{ title: "Sign Up" }}
                    />
                </>
                )}
            </Stack.Navigator>
        </ClerkLoaded>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default AppStack;