import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { View } from "react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#3575ff",
        tabBarInactiveTintColor: "#AEDEFC",
        tabBarBackground: () => <View className="bg-[#F7FDFD] h-20"></View>,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={40} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          href: null, // hide the scan route
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome size={40} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
