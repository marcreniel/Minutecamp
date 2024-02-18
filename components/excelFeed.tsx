// App.js
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
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
import VideoPost from "./VideoPost";
import BottomSheetComponent from "./popupSheet";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const dummyPosts = [
  {
    id: "1",
    video:
      "https://video.gumlet.io/65d1755e04d0f4f8273e0e91/65d184ae7759c9daec249a86/download.mp4",
    caption: "What is excel",
    creator: "Creator: Professor Cubs",
  },
  {
    id: "2",
    video:
      "https://video.gumlet.io/65d1755e04d0f4f8273e0e91/65d1c8207759c9daec26ac24/download.mp4",
    caption: "Quiz",
    creator: "",
  },
];

const GeneralFeed = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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

  const onEndReached = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <VideoPost post={item} activePostId={activePostId} />
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          pagingEnabled
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1} // Typically a value between 0 and 1, like 0.5 for halfway
        />
        <BottomSheetComponent
          modalRef={bottomSheetModalRef}
          snapPoints={snapPoints}
          handleSheetChanges={handleSheetChanges}
        />
      </View>
    </BottomSheetModalProvider>
  );
};

export default GeneralFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
