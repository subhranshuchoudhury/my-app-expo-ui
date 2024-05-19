import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BounceIn } from "react-native-reanimated";
import BouncyView from "@/components/BouncyView";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View className="flex-1 bg-[#FAF8ED]">
      <StatusBar style="dark" />
      <Image
        contentFit="fill"
        className="w-screen h-[50%]"
        source={require("@/assets/images/Designer (2).jpeg")}
      />
      <Link
        href={"(tabs)/profile"}
        className="absolute justify-center item-center top-12 right-7"
      >
        <BouncyView bounceCount={2}>
          <View className="bg-white rounded-full w-10 p-1 justify-center items-center h-10">
            <FontAwesome name="user" size={30} color={"#3575ff"} />
          </View>
        </BouncyView>
      </Link>
    </View>
  );
};

export default Home;
