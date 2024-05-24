import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Index = () => {
  return (
    <View className="flex-1 bg-black justify-center items-center">
      <ActivityIndicator size={"large"} color={"white"} />
    </View>
  );
};

export default Index;
