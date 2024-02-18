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
import DiscoverPost from "./discoverPost";

const dummyPosts = [
  {
    id: "1",
    video:
      "https://video.gumlet.io/65d1755e04d0f4f8273e0e91/65d17aa504d0f4f8273f634c/download.mp4",
    caption: "Hackathons 101",
  },
  {
    id: "2",
    video:
      "https://video.gumlet.io/65d1755e04d0f4f8273e0e91/65d184ae04d0f4f82740e0ad/download.mp4",
    caption: "How to: taxes",
  },
  {
    id: "3",
    video:
      "https://video.gumlet.io/65d1755e04d0f4f8273e0e91/65d184ae7759c9daec249a86/download.mp4",
    caption: "What is Excel?",
  },
  {
    id: "4",
    video:
      "https://video.gumlet.io/65d1755e04d0f4f8273e0e91/65d184ae7759c9daec249a89/download.mp4",
    caption: "Basic arithmetic on Excel",
  },
  {
    id: "5",
    video:"https://video.gumlet.io/65d1755e04d0f4f8273e0e91/65d186b67759c9daec24afb9/download.mp4",
    caption: "Basic arithmetic on Excel",
  },
];

const GeneralFeed = () => {
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
      onViewableItemsChanged: ({
        viewableItems,
      }: {
        viewableItems: ViewToken[];
      }) => {
        if (viewableItems.length > 0 && viewableItems[0].isViewable) {
          setActivePostId(viewableItems[0].item.id);
        }
      },
    },
  ]);

  const onEndReached = () => {
    // fetch more posts from database
    // setPosts((currentPosts) => [...currentPosts, ...dummyPosts]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <DiscoverPost post={item} activePostId={activePostId} />
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

export default GeneralFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
