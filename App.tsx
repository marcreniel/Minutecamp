// App.js
import React from "react";
import AppStack from "./navigation";
import useCachedResources from "./hooks/useCachedResources";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./cache";

// Your publishable Key goes here
const publishableKey = "pk_test_bWFnbmV0aWMtdG9ydG9pc2UtOTMuY2xlcmsuYWNjb3VudHMuZGV2JA";

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <AppStack/>
      </ClerkProvider>
    );
  };
}

export default App;

