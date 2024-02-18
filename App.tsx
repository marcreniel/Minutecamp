import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ClerkProvider } from '@clerk/clerk-expo';
import { ConvexProviderWithClerk, ConvexReactClient } from 'convex/react-clerk';
import 'react-native-get-random-values';

import useCachedResources from './hooks/useCachedResources';
import { tokenCache } from './cache';
import { CONVEX_URL } from '@env';

import HomeScreen from './HomeScreen';
import QuizScreen from './Quiz';
import FeedScreen from './components/hackathonFeed';
import TaxesFeed from './components/taxesFeed';
import ExcelFeed from './components/excelFeed';
import Excel2Feed from './components/excel2Feed';
import PythonFeed from './components/pythonFeed';

const Stack = createNativeStackNavigator();
const publishableKey = 'pk_test_bWFnbmV0aWMtdG9ydG9pc2UtOTMuY2xlcmsuYWNjb3VudHMuZGV2JA';
const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null; // Or some loading component
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ConvexProviderWithClerk client={convex}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }} />
              <Stack.Screen name="TaxesFeed" component={TaxesFeed} options={{ headerShown: false }} />
              <Stack.Screen name="ExcelFeed" component={ExcelFeed} options={{ headerShown: false }} />
              <Stack.Screen name="Excel2Feed" component={Excel2Feed} options={{ headerShown: false }} />
              <Stack.Screen name="PythonFeed" component={PythonFeed} options={{ headerShown: false }} />
              <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default App;
