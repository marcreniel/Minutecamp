// App.js
import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import DiscoverFeed from "../components/discoverFeed";

function HomeScreen({ navigation }: { navigation: any }) {
  // @ts-ignore
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <ConvexProvider client={convex}>
        <Tasks />
        </ConvexProvider> */}
        <BottomSheetModalProvider>
          <View style={styles.container}>
            <DiscoverFeed />
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "grey",
  },
});

export default HomeScreen;
