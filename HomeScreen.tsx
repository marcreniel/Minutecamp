// App.js
import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomSheetComponent from "./components/popupSheet";

import DiscoverFeed from "./components/discoverFeed";

// import { CONVEX_URL } from "@env";
// import "react-native-get-random-values";
// import Tasks from "./tasks";
// import { ConvexProvider, ConvexReactClient } from "convex/react";

// const convex = new ConvexReactClient(CONVEX_URL, {
//   unsavedChangesWarning: false,
// });

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
            {/* <Button
              title="Go to Feed"
              onPress={() => navigation.navigate("Feed")}
            /> */}
            {/* <Button
              onPress={handlePresentModalPress}
              title="Present Modal"
              color="black"
            />
            <BottomSheetComponent
              modalRef={bottomSheetModalRef}
              snapPoints={snapPoints}
              handleSheetChanges={handleSheetChanges}
            /> */}
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

