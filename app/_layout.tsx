import { useFonts } from "expo-font";
import { useEffect } from "react";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { LogLevel, OneSignal } from "react-native-onesignal";
import useAuthStore from "@/store/auth-store";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/utils/ReactQuery";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { token, removeToken, setToken } = useAuthStore();
  // const segments = useSegments();

  const [loaded] = useFonts({
    Jersey20Charted: require("../assets/fonts/Jersey20Charted-Regular.ttf"),
    Jaro: require("../assets/fonts/Jaro-Regular.ttf"),
    PlayBold: require("../assets/fonts/Play-Bold.ttf"),
    PlayRegular: require("../assets/fonts/Play-Regular.ttf"),
  });

  useEffect(() => {
    // Dev Tools
    if (__DEV__) {
      require("../ReactotronConfig");
    }

    // const inAuthGroup = segments[0] === "(auth)";
    // const inProtectedGroup = segments[0] === "(protected)";

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
        if (!token) {
          router.replace("(auth)/login");
        } else if (token) {
          router.replace("(protected)");
        }
      }
    }
  }, [token, loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            statusBarHidden: true,
          }}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
            headerTintColor: "#0E2954",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
