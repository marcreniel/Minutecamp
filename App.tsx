// App.js
import React from "react";
import AppStack from "./navigation";
import useCachedResources from "./hooks/useCachedResources";
import { tokenCache } from "./cache";
import { CONVEX_URL } from "@env";
import { ClerkProvider, useAuth} from "@clerk/clerk-expo";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import "react-native-get-random-values";
import Tasks from "./tasks";

// Your publishable Key goes here
const publishableKey = "pk_test_bWFnbmV0aWMtdG9ydG9pc2UtOTMuY2xlcmsuYWNjb3VudHMuZGV2JA";

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <AppStack/>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    );
  };
}

export default App;
