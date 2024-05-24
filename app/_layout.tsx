import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { LogLevel, OneSignal } from "react-native-onesignal";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [Auth, setAuth] = useState(true);
  const [loaded] = useFonts({
    Jersey20Charted: require("../assets/fonts/Jersey20Charted-Regular.ttf"),
    Jaro: require("../assets/fonts/Jaro-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      try {
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize("8118c1ff-f9c2-4559-8141-080dbe17a4cf");
        OneSignal.Notifications.requestPermission(true);
        OneSignal.User.addEmail("subhransuchoudhury00@gmail.com");
      } catch (error) {
        console.error("OneSignal Error");
      } finally {
        SplashScreen.hideAsync();
      }
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(menus)"
        options={{
          headerShown: false,
          headerTintColor: "#0E2954",
        }}
      />
    </Stack>
  );
}
