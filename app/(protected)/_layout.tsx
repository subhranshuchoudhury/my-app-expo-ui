import React from "react";
import { Stack } from "expo-router";

const ProtectedLayout = () => {
  return (
    <Stack
      screenOptions={{
        statusBarColor: "#0E2954",
        statusBarStyle: "light",
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#0E2954",
          },
        }}
      />
      <Stack.Screen
        name="(menus)"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#0E2954",
          },
        }}
      />
    </Stack>
  );
};

export default ProtectedLayout;
