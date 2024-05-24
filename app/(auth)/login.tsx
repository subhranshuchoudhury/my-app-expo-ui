import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useAuthStore from "@/store/auth-store";

const login = () => {
  const { token, removeToken, setToken } = useAuthStore();
  return (
    <View className="flex-1 bg-black justify-center items-center">
      <TouchableOpacity
        onPress={() => {
          setToken("TEST_TOKEN_FROM_LOGIN");
        }}
      >
        <Text className="text-white">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default login;
