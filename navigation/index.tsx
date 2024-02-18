import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/Quiz";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import VerifyCodeScreen from "../screens/VerifyCodeScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import { ClerkLoaded } from "@clerk/clerk-expo";
import { useConvexAuth } from "convex/react";

import FeedScreen from '../components/hackathonFeed';
import TaxesFeed from '../components/taxesFeed';
import ExcelFeed from '../components/excelFeed';
import Excel2Feed from '../components/excel2Feed';
import PythonFeed from '../components/pythonFeed';

const Stack = createNativeStackNavigator();

function AppStack() {
  const { isAuthenticated } = useConvexAuth();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <ClerkLoaded>
          <Stack.Navigator>
            {isAuthenticated ? (
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
