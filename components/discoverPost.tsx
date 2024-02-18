import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Button,
} from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

type VideoPost = {
  post: {
    id: string;
    video: string;
    caption: string;
  };
  activePostId: string;
};

const VideoPost = ({ post, activePostId }: VideoPost) => {
  const navigation = useNavigation();
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>();

  const isPlaying = status?.isLoaded && status.isPlaying;

  const { height } = useWindowDimensions();

  useEffect(() => {
    if (!video.current) {
      return;
    }
    if (activePostId !== post.id) {
      video.current.pauseAsync();
    }
    if (activePostId === post.id) {
      video.current.playAsync();
    }
  }, [activePostId, video.current]);

  useFocusEffect(
    React.useCallback(() => {
      const blurUnsubscribe = navigation.addListener("blur", () => {
        if (video.current) {
          video.current.pauseAsync();
        }
      });
  
      return blurUnsubscribe;
    }, [navigation])
  );

  const onPress = () => {
    if (!video.current) {
      return;
    }
    if (isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
  };

  return (
    <View style={[styles.container, { height }]}>
      <Video
        ref={video}
        style={[StyleSheet.absoluteFill, styles.video]}
        source={{ uri: post.video }}
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={setStatus}
        isLooping
      />

      <Pressable onPress={onPress} style={styles.content}>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />
        {!isPlaying && (
          <Ionicons
            style={{ position: "absolute", alignSelf: "center", top: "50%" }}
            name="play"
            size={70}
            color="rgba(255, 255, 255, 0.6)"
          />
        )}
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.footer}>
            {/* bottom: caption */}
            <View style={styles.leftColumn}>
              <Text style={styles.caption}>{post.caption}</Text>
            </View>
            <Button
              title="Go to Feed"
              onPress={() => navigation.navigate("Feed")}
            />

            {/* Vertical column of icon-buttons */}
            <View style={styles.rightColumn}></View>
          </View>
        </SafeAreaView>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  video: {},
  content: {
    flex: 1,
    padding: 10,
  },
  overlay: {
    top: "50%",
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  leftColumn: {
    flex: 1,
  },
  caption: {
    color: "white",
    fontSize: 18,
  },
  rightColumn: {
    gap: 10,
  },
});

export default VideoPost;
