import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import TiltEffect from "@/components/TiltView";
import * as NavigationBar from "expo-navigation-bar";

const TabLayout = () => {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#0E2954");
  }, []);

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#2E8A99",
        tabBarInactiveTintColor: "#F4EEE0",
        tabBarStyle: {
          backgroundColor: "#0E2954",
          borderColor: "#0E2954",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TiltEffect loop={focused && true}>
              <Entypo name="home" size={30} color={color} />
            </TiltEffect>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          title: "Profile",
          headerTintColor: "#F4EEE0",
          headerStyle: {
            backgroundColor: "#2E8A99",
          },
          tabBarIcon: ({ color, focused }) => (
            <TiltEffect loop={focused && true}>
              <FontAwesome size={30} name="user" color={color} />
            </TiltEffect>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "Settings",
          headerTintColor: "#F4EEE0",
          headerStyle: {
            backgroundColor: "#2E8A99",
          },
          tabBarIcon: ({ color, focused }) => (
            <TiltEffect loop={focused && true}>
              <FontAwesome size={30} name="gear" color={color} />
            </TiltEffect>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
