import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        navigationBarColor: "#0E2954",
        headerShown: true,
        headerTintColor: "#F4EEE0",
        headerStyle: { backgroundColor: "#2E8A99" },
        contentStyle: {
          backgroundColor: "#0E2954",
        },
      }}
    >
      <Stack.Screen options={{ title: "Account" }} name="account" />
      <Stack.Screen options={{ title: "History" }} name="history" />
      <Stack.Screen
        options={{
          title: "Scanner",
          presentation: "modal",
          animation: "fade",
          animationDuration: 5000,
        }}
        name="scanner"
      />
    </Stack>
  );
}
