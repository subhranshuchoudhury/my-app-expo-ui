import { View, ActivityIndicator } from "react-native";
import React from "react";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
const Index = () => {
  useEffect(() => {
    console.log("App is starting...");
    NavigationBar.setBackgroundColorAsync("black");
  }, []);

  return (
    <View className="flex-1 bg-black justify-center items-center">
      <ActivityIndicator size={"large"} color={"white"} />
    </View>
  );
};

export default Index;
