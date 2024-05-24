import { Text, View } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TiltEffect from "@/components/TiltView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BouncyView from "@/components/BouncyView";

const account = () => {
  return (
    <View>
      {/* Balance View */}
      <View className="flex items-center flex-row justify-between gap-x-4 p-2 m-2 mt-3 border-b-[1px] border-white">
        <TiltEffect>
          <FontAwesome name="rupee" size={50} color="white" />
        </TiltEffect>
        <Text className="font-[Jersey20Charted] text-green-300 text-6xl">
          12000
        </Text>
      </View>
      {/* Options & Account Details */}
      <View className="bg-blue-900 h-screen m-5 mt-10 rounded-md">
        <View className="flex flex-row justify-between  items-center flex-wrap p-2 border-b border-gray-600 m-1">
          <FontAwesome name="user" size={30} color="white" />
          <Text className="text-white text-base">Subhranshu Choudhury</Text>
        </View>
        <View className="flex flex-row justify-between  items-center flex-wrap p-2 border-b border-gray-600 m-1">
          <FontAwesome name="phone-square" size={30} color="white" />
          <Text className="text-white text-base">+91 8249587552</Text>
        </View>
        <View className="flex flex-row justify-between  items-center flex-wrap p-2 border-b border-gray-600 m-1">
          <FontAwesome name="bank" size={30} color="white" />
          <Text className="text-white text-base">subhranshuchoudhury@ybl</Text>
        </View>
        <BouncyView>
          <View className="flex flex-row justify-between items-center flex-wrap p-4 m-4 mt-40 bg-white rounded-full">
            <MaterialCommunityIcons
              name="contactless-payment-circle"
              size={30}
              color="black"
            />
            <Text className="text-gray-700 text-2xl font-[Jaro]">
              WITHDRAW BALANCE
            </Text>
          </View>
        </BouncyView>
      </View>
    </View>
  );
};

export default account;
