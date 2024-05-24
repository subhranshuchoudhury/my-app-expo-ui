import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TiltEffect from "@/components/TiltView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BouncyView from "@/components/BouncyView";
import useAuthStore from "@/store/auth-store";

const settings = () => {
  const { removeToken } = useAuthStore();
  return (
    <View className="bg-[#0E2954]">
      {/* Options */}
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
        <TouchableOpacity onPress={removeToken}>
          <BouncyView>
            <View className="flex flex-row justify-evenly items-center flex-wrap p-4 m-4 mt-40 bg-white rounded-full">
              <MaterialCommunityIcons name="logout" size={30} color="black" />
              <Text className="text-gray-700 text-2xl font-[Jaro]">LOGOUT</Text>
            </View>
          </BouncyView>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default settings;
