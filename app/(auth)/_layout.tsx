import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          navigationBarHidden: false,
          statusBarStyle: "dark",
          statusBarTranslucent: true,
          navigationBarColor: "black",
          // statusBarHidden: true,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
