// App.js
import React, { useEffect, useRef, useState } from "react";
import { Button, FlatList, Pressable, StyleSheet, Text, View, ViewToken } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import VideoPost from "./components/VideoPost";
import HomeScreen from "./HomeScreen";
import QuizScreen from "./Quiz";
import ProfileScreen from "./Profile";

const dummyPosts = [
  {
    id: '2',
    video:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4',
    caption: 'Caption of the post',
  },
  {
    id: '1',
    video:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4',
    caption: 'Hey there',
  },
  {
    id: '3',
    video:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4',
    caption: 'Hola',
  },
  {
    id: '4',
    video:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4',
    caption: 'Piano practice',
  },
  {
    id: '5',
    video:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4',
    caption: 'Hello World!',
  },
];

const FeedScreen = () => {
  const [activePostId, setActivePostId] = useState(dummyPosts[0].id);
  const [posts, setPosts] = useState<typeof dummyPosts>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // fetch posts from the server
      setPosts(dummyPosts);
    };

    fetchPosts();
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 50 },
      onViewableItemsChanged: ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].isViewable) {
          setActivePostId(viewableItems[0].item.id);
        }
      },
    },
  ]);

  const onEndReached = () => {
    // fetch more posts from database
    setPosts((currentPosts) => [...currentPosts, ...dummyPosts]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <VideoPost post={item} activePostId={activePostId} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1} // Typically a value between 0 and 1, like 0.5 for halfway
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
